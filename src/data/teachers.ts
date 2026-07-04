export interface Teacher {
  slug: string;
  name: string;
  title: string;
  research: string;
  email: string;
  image: string;
  detailUrl: string;
}

export const teachers: Teacher[] = [
  {
    slug: 'sun-li',
    name: '孙立',
    title: '教授，院长',
    research: '中国古代诗文批评、先秦文学、域外汉学',
    email: 'sunl@nfu.edu.cn',
    image: '/images/teachers/01-sunl.jpg',
    detailUrl: 'https://staff.nfu.edu.cn/sunl/cn'
  },
  {
    slug: 'zhou-fengling',
    name: '周凤玲',
    title: '教授，副院长',
    research: '汉语作为第二语言习得、语言生活',
    email: 'zhoufl@nfu.edu.cn',
    image: '/images/teachers/02-zhoufl.jpg',
    detailUrl: 'https://staff.nfu.edu.cn/zhoufl/cn'
  },
  {
    slug: 'chen-ke',
    name: '陈珂',
    title: '副教授',
    research: '应用新闻传播、新闻传播实务',
    email: 'chenk@nfu.edu.cn',
    image: '/images/teachers/03-chenk.jpg',
    detailUrl: 'https://staff.nfu.edu.cn/chenk/cn'
  },
  {
    slug: 'liu-na',
    name: '刘娜',
    title: '副教授',
    research: '马克思主义新闻思想，传播社会与心理研究',
    email: 'liun@nfu.edu.cn',
    image: '/images/teachers/04-liun.jpg',
    detailUrl: 'https://staff.nfu.edu.cn/liun/cn'
  },
  {
    slug: 'luo-xi',
    name: '罗希',
    title: '副教授',
    research: '广告传播、品牌营销、营销策划、教育社会学',
    email: 'luox1@nfu.edu.cn',
    image: '/images/teachers/05-luox1.jpeg',
    detailUrl: 'https://staff.nfu.edu.cn/luox1/cn'
  },
  {
    slug: 'wen-ling',
    name: '温灵',
    title: '副教授',
    research: '摄影教育、文艺理论、水彩绘画',
    email: 'wenl@nfu.edu.cn',
    image: '/images/teachers/06-wenl.jpg',
    detailUrl: 'https://staff.nfu.edu.cn/wenl/cn'
  },
  {
    slug: 'zhang-xiaodan',
    name: '张晓丹',
    title: '副教授',
    research: '影像传播、岭南文化',
    email: 'zhangxd@nfu.edu.cn',
    image: '/images/teachers/07-zhangxd.jpeg',
    detailUrl: 'https://staff.nfu.edu.cn/zhangxd/cn'
  },
  {
    slug: 'liu-le',
    name: '刘乐',
    title: '副教授',
    research: '纪录片创作、国际传播',
    email: 'liul1@nfu.edu.cn',
    image: '/images/teachers/08-liul1.jpg',
    detailUrl: 'https://staff.nfu.edu.cn/liul1/cn'
  }
];
