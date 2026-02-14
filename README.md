# first-principles-blog

A minimalist personal blog built with Astro, featuring an editorial design aesthetic.

## Production Checklist

### 1. GitHub Repository Secrets & Variables

Configure in **Settings > Secrets and variables > Actions**:

**Secrets (encrypted):**
- `CONTENT_REPO_TOKEN` - GitHub Personal Access Token with read access to content repo
- `CF_API_TOKEN` - Cloudflare API Token with Pages deploy permissions

**Variables (plain text):**
- `CONTENT_REPO` - Format: `username/content-repo-name`
- `CONTENT_POSTS_DIR` - Directory in content repo containing markdown posts (e.g., `posts`)
- `CF_PROJECT_NAME` - Cloudflare Pages project name

### 2. Content Repository Setup

- [ ] Create a private repository for blog posts
- [ ] Add markdown files with frontmatter:
  ```yaml
  ---
  title: "Post Title"
  date: 2026-02-15
  tags: [tag1, tag2]
  excerpt: "Optional summary"
  words: 1200
  ---
  ```
- [ ] Grant `CONTENT_REPO_TOKEN` access to this repository

### 3. Cloudflare Pages Configuration

- [ ] Create a new Pages project in Cloudflare dashboard
- [ ] Configure custom domain `jhihjian.com` (DNS A/AAAA records pointing to Cloudflare)
- [ ] Generate API token with **Cloudflare Pages:Edit** permission
- [ ] Save token as `CF_API_TOKEN` in GitHub secrets

### 4. Local Development Workflow

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build locally (posts in src/content/posts/ will be included)
npm run build

# Preview production build
npm run preview
```

**Note:** Files in `src/content/posts/` are for local development only. In production, posts are fetched from the separate content repository.

### 5. Content Publishing Workflow

After setup, publish new posts by:

1. Push markdown file to content repository
2. Trigger deployment via webhook:
   ```bash
   curl -X POST \
     -H "Authorization: token $GITHUB_TOKEN" \
     -H "Accept: application/vnd.github.v3+json" \
     https://api.github.com/repos/$USERNAME/first-principles-blog/dispatches \
     -d '{"event_type":"content-update"}'
   ```

Or manually: Go to **Actions > Build & Deploy > Run workflow**

### 6. Post-Deployment Verification

- [ ] Site accessible at custom domain
- [ ] RSS feed working at `/rss.xml`
- [ ] All posts rendering correctly
- [ ] Navigation between Articles and Explore working

## Project Structure

```
.
├── src/
│   ├── components/      # Astro components (Header, Footer, ArticleList, etc.)
│   ├── content/
│   │   └── posts/       # Local dev posts (gitignored in production workflow)
│   ├── layouts/         # Page layouts (Base, Post)
│   ├── pages/           # Routes (index, explore, posts/[slug], rss.xml)
│   ├── styles/          # Global CSS
│   ├── content.config.ts    # Content collection schema
│   └── site.config.ts       # Site metadata & explore page content
├── .github/workflows/   # CI/CD configuration
├── dist/                # Build output (generated)
└── public/              # Static assets
```

## Configuration Files

- `astro.config.mjs` - Astro configuration (static output, site URL)
- `tsconfig.json` - TypeScript configuration (extends Astro strict)
- `src/site.config.ts` - Site title, tagline, footer links, explore sections
- `src/content.config.ts` - Post schema validation
