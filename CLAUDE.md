# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm run dev          # Start Astro dev server (localhost:4321)
npm run build        # Build static site to dist/
npm run preview      # Preview production build locally

# Dependencies
npm ci               # Clean install (used in CI)
```

## Architecture

**Astro v5 Static Blog** - A personal blog with a minimalist, editorial design.

### Content Flow

Posts are sourced from two locations:
1. **Local development**: `src/content/posts/*.md`
2. **Production**: Fetched from a separate content repository via GitHub Actions (`.github/workflows/build.yml`)

The CI workflow uses `git sparse-checkout` to pull only the posts directory from `vars.CONTENT_REPO` and copies markdown files into `src/content/posts/` before building.

### Content Schema

Posts use frontmatter with this structure:
```yaml
---
title: string (required)
date: YYYY-MM-DD (required)
tags: string[] (default: [])
excerpt: string (optional)
words: number (optional)
---
```

Content collections are defined in `src/content.config.ts` with Zod validation.

### Site Structure

| Route | File | Purpose |
|-------|------|---------|
| `/` | `src/pages/index.astro` | Article list, sorted by date desc |
| `/posts/[slug]` | `src/pages/posts/[slug].astro` | Individual post pages |
| `/explore` | `src/pages/explore.astro` | Knowledge base/sections page |
| `/rss.xml` | `src/pages/rss.xml.ts` | RSS feed endpoint |

### Key Files

- `src/site.config.ts` - Site metadata, navigation links, and explore page content
- `src/content.config.ts` - Content collection schema definition
- `src/layouts/Base.astro` - Root layout with shared HTML/head
- `src/layouts/Post.astro` - Blog post layout with styling
- `src/styles/global.css` - Global CSS variables and base styles

### Design System

The site uses a warm, editorial aesthetic:
- **Colors**: Cream background (`#fcfaf7`), dark text (`#1a1a1a`), gold accent (`#8b6914`)
- **Typography**: Newsreader (serif) for body text, DM Mono for metadata/code
- **Features**: Grain texture overlay, sticky header with backdrop blur, subtle animations

### Deployment

- **Target**: Cloudflare Pages
- **Trigger**: Push to `main` branch or `repository_dispatch` event of type `content-update`
- **Build output**: `dist/` directory (static files)

## Important Notes

- Posts are markdown files; the production content comes from a separate private repository
- The explore page content is static config in `siteConfig.explore.sections`
- RSS feed is generated at build time from the posts collection
