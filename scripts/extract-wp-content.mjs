import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const xmlPath = 'C:/Users/Harmony OS/OneDrive/NFU/课程网站项目备份/saved2021-5-26/WordPress.2021-05-26.xml';
const outPath = resolve(root, 'src/data/legacy-content.ts');

const xml = readFileSync(xmlPath, 'utf8');

function decodeXml(value = '') {
  return value
    .replace(/^<!\[CDATA\[/, '')
    .replace(/\]\]>$/, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)));
}

function pick(block, tagName) {
  const escaped = tagName.replace(':', '\\:');
  const re = new RegExp(`<${escaped}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${escaped}>`);
  const match = block.match(re);
  return match ? decodeXml(match[1].trim()) : '';
}

function cleanHtml(html = '') {
  return html
    .replace(/<!--\s*\/?wp:[\s\S]*?-->/g, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, '')
    .replace(/<video[\s\S]*?<\/video>/gi, '')
    .replace(/<img[^>]*>/gi, '')
    .replace(/\s(?:src|srcset)=["']http:\/\/120\.25\.248\.139[^"']*["']/gi, '')
    .replace(/\s(?:href)=["']http:\/\/120\.25\.248\.139[^"']*["']/gi, '')
    .replace(/<p>\s*(?:&nbsp;|\s)*<\/p>/gi, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function textFromHtml(html = '') {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function slugify(title, fallback) {
  const known = new Map([
    ['课程概述', 'overview'],
    ['授课教师简介', 'teachers'],
    ['授课目标', 'goals'],
    ['课程大纲', 'syllabus'],
    ['参考资料', 'references'],
    ['课后习题', 'exercises'],
    ['学生课程实践', 'practice'],
    ['中国古代文学史在线学习课程', 'course']
  ]);

  if (known.has(title)) {
    return known.get(title);
  }

  const ascii = fallback
    .toLowerCase()
    .replace(/%[0-9a-f]{2}/gi, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  return ascii || `item-${Math.abs([...title].reduce((sum, char) => sum + char.charCodeAt(0), 0))}`;
}

const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((match) => {
  const block = match[1];
  const title = pick(block, 'title');
  const postName = pick(block, 'wp:post_name');
  const type = pick(block, 'wp:post_type');
  const status = pick(block, 'wp:status');
  const content = cleanHtml(pick(block, 'content:encoded'));
  return {
    title,
    slug: slugify(title, postName || title),
    originalSlug: postName,
    type,
    status,
    link: pick(block, 'link'),
    date: pick(block, 'wp:post_date'),
    excerpt: textFromHtml(content).slice(0, 140),
    content
  };
});

const published = items.filter((item) => item.status === 'publish');
const pageByTitle = new Map(published.filter((item) => item.type === 'page').map((item) => [item.title, item]));
const overviewPage = pageByTitle.get('课程概述');
const overviewContent = overviewPage?.content || '';
const syllabusMatch = overviewContent.match(/<h2>\s*课程大纲\s*<\/h2>([\s\S]*?)(?=<h2>\s*授课目标\s*<\/h2>|$)/);
const goalsMatch = overviewContent.match(/<h2>\s*授课目标\s*<\/h2>([\s\S]*)$/);

const pages = [
  {
    title: '课程概述',
    slug: 'overview',
    content: cleanHtml(overviewContent.split(/<h2>\s*课程大纲\s*<\/h2>/)[0] || overviewContent),
    source: 'WordPress XML: 课程概述'
  },
  {
    title: '授课目标',
    slug: 'goals',
    content: cleanHtml(goalsMatch?.[1] || ''),
    source: 'WordPress XML: 课程概述 / 授课目标'
  },
  {
    title: '课程大纲',
    slug: 'syllabus',
    content: cleanHtml(syllabusMatch?.[1] || ''),
    source: 'WordPress XML: 课程概述 / 课程大纲'
  },
  {
    title: '参考资料',
    slug: 'references',
    content: cleanHtml(pageByTitle.get('参考资料')?.content || ''),
    source: 'WordPress XML: 参考资料'
  },
  {
    title: '课后习题',
    slug: 'exercises',
    content: cleanHtml(pageByTitle.get('课后习题')?.content || ''),
    source: 'WordPress XML: 课后习题'
  },
  {
    title: '学生课程实践',
    slug: 'practice',
    content: cleanHtml(pageByTitle.get('学生课程实践')?.content || ''),
    source: 'WordPress XML: 学生课程实践'
  }
];

const posts = published
  .filter((item) => item.type === 'post')
  .map((item, index) => ({
    title: item.title,
    slug: `post-${String(index + 1).padStart(2, '0')}`,
    excerpt: item.excerpt,
    content: item.content,
    date: item.date,
    source: 'WordPress XML: post'
  }));

const lessons = published
  .filter((item) => item.type === 'lesson')
  .map((item, index) => ({
    title: item.title,
    slug: `lesson-${String(index + 1).padStart(2, '0')}`,
    excerpt: item.excerpt,
    content: item.content,
    date: item.date,
    source: 'WordPress XML: lesson'
  }));

const course = published.find((item) => item.type === 'course');

const output = `export interface LegacyPage {
  title: string;
  slug: string;
  content: string;
  source: string;
}

export interface LegacyEntry extends LegacyPage {
  excerpt: string;
  date: string;
}

export const legacyPages: LegacyPage[] = ${JSON.stringify(pages, null, 2)};

export const legacyPosts: LegacyEntry[] = ${JSON.stringify(posts, null, 2)};

export const legacyLessons: LegacyEntry[] = ${JSON.stringify(lessons, null, 2)};

export const legacyCourse = ${JSON.stringify(course ? {
  title: course.title,
  slug: 'course',
  content: course.content,
  source: 'WordPress XML: course'
} : null, null, 2)};
`;

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, output, 'utf8');

console.log(`Extracted ${pages.length} pages, ${posts.length} posts, ${lessons.length} lessons.`);
