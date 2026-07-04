# Coursefolio

## What This Is

Coursefolio 是“中国古代文学史在线课程”的纪念性复活项目。原 WordPress 代码和媒体资源已丢失，只保留 WordPress XML 导出、MySQL SQL 备份和少量截图；本项目不重建完整 WordPress/LMS 系统，而是基于现存文字、结构和视觉线索，做一个可阅读、可浏览、可长期保存的轻量课程网站。

它面向项目维护者、课程相关师生和未来回看者，核心体验是打开网页后能重新看到这门课程的基本样貌、课程结构、教师介绍、课程说明和学生实践内容。

## Core Value

在没有原始媒体资源的情况下，最大限度恢复旧课程网站的公开信息结构和视觉记忆，让它重新可访问、可阅读、可保存。

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] 从 WordPress XML 和 SQL 备份中抽取可恢复的文字内容、页面结构、课程目录和文章条目。
- [ ] 复刻旧站公开页面的核心视觉：学院蓝页头、深蓝导航、浅灰背景、白色内容区、中文课程站风格。
- [ ] 提供不依赖图片、视频、PDF、PPT 本体的最小可浏览网站。
- [ ] 保留旧站主要栏目：课程概述、授课教师简介、授课目标、课程大纲、参考资料、在线学习课程、学生课程实践。
- [ ] 对缺失媒体采用文本化表达，不使用大量空占位破坏浏览体验。
- [ ] 项目架构简单、可维护、可静态部署。

### Out of Scope

- 恢复原 WordPress 后台 — 纪念站不需要后台编辑、用户管理和插件生态。
- 恢复 LifterLMS 学习进度 — 媒体资源已丢失，学习完成状态不是核心纪念价值。
- 恢复视频、PDF、PPT、图片原文件 — 两个备份只提供媒体索引和 URL，不能提供文件本体。
- 重建测验提交、表单、登录、邮件通知 — 动态交互成本高，不符合最小可行复活。
- 追求像素级还原 Elementor 页面 — 缺少完整主题和资源，目标是保留识别度和信息结构。

## Context

现存资料：

- `WordPress.2021-05-26.xml`：WordPress WXR 导出，包含页面、文章、课程、课时、附件记录等。
- `Wordpress_20210526_162456.sql.gz`：MySQL 备份，包含 WordPress、Elementor、LifterLMS、Quiz Master 等插件数据痕迹。
- 3 张旧站截图：展示了课程概述页、LifterLMS 课程进度页、Elementor 编辑中的授课教师简介页。

已确认事实：

- 旧站标题为“中国古代文学史在线课程”。
- 旧站使用 WordPress 5.7.2。
- XML 中有 1 个 course、44 个 lesson、13 个已发布 page、24 篇已发布 post、306 条 attachment 记录。
- 媒体记录包含图片、视频、PDF、PPT 等 URL，但不包含文件本体。
- 当前旧服务器媒体 URL 返回 502，不能作为可靠资源来源。

旧站识别特征：

- 顶部为蓝色学院页头，包含“文学与传媒学院 / SCHOOL OF LITERATURE AND MEDIA / 中国古代文学史在线课程”。
- 主导航为深蓝色，栏目包括首页、课程概述、授课教师简介、授课目标、课程大纲、参考资料、中国古代文学史在线学习课程和搜索入口。
- 内容区为浅灰背景上的白色居中容器，大标题居中，正文为中文段落排版。
- 教师简介页是重复的“教师姓名 + 职称/简介”列表结构，原图缺失时可用文本卡片替代。

## Constraints

- **资料约束**: 媒体文件本体视为全部丢失 — v1 不依赖任何旧图片、视频、PDF、PPT。
- **架构约束**: 优先静态站或极轻量前端 — 项目核心是保存和展示，不是运行课程系统。
- **维护约束**: KISS，避免引入数据库、后台、账号系统和复杂构建链。
- **视觉约束**: 参考旧截图保留识别度 — 但不追求完全还原 WordPress/Elementor。
- **内容约束**: 以备份中能抽取的文字和结构为准 — 不凭空补写课程内容。

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| 将媒体资源视为丢失 | XML/SQL 只有附件记录和 URL，不含文件本体，旧 URL 当前不可用 | — Pending |
| v1 做纪念性静态网站 | 核心价值是可访问、可阅读、可保存，而不是恢复 LMS | — Pending |
| 使用 Astro + TypeScript + 纯 CSS | 项目是内容型静态纪念站，需要从备份生成页面且保持轻量 | — Pending |
| 不恢复 WordPress 后台 | 原插件体系复杂且与纪念目标无关 | — Pending |
| 缺失媒体文本化处理 | 空图片/视频占位会降低复活体验，文本结构更稳定 | — Pending |
| 用备份抽取内容，不手工想象内容 | 尊重事实，避免把新内容误当旧内容 | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition**:
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone**:
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-07-04 after initialization*
