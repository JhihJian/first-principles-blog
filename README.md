# first-principles-blog

A minimalist personal blog built with Astro, featuring an editorial design aesthetic.

## Production Checklist

### 1. GitHub Repository Secrets & Variables

Go to your GitHub repository: **Settings > Secrets and variables > Actions**

#### 1.1 Create GitHub Personal Access Token (for CONTENT_REPO_TOKEN)

1. **Generate the token** (use a dedicated GitHub account or your own):
   - Go to https://github.com/settings/tokens?type=classic
   - Click **Generate new token (classic)**
   - Token name: `Blog Content Repo Access`
   - Expiration: Choose an expiration (recommend: 1 year)
   - Scopes: Select **`repo`** (full control of private repositories)
   - Click **Generate token**
   - **⚠️ Copy the token immediately** (you won't see it again)

2. **Grant token access to content repo**:
   - Go to your **content repository** (the separate repo storing posts)
   - **Settings > Manage access > Invite a collaborator**
   - Add the GitHub account that owns the token

3. **Add to GitHub Secrets**:
   - Back in your **blog repository**: **Settings > Secrets and variables > Actions > New repository secret**
   - Name: `CONTENT_REPO_TOKEN`
   - Value: Paste the token you copied
   - Click **Add secret**

#### 1.2 Configure Cloudflare API Token (for CF_API_TOKEN)

1. Go to Cloudflare dashboard: https://dash.cloudflare.com/profile/api-tokens
2. Click **Create Token**
3. Use template **"Cloudflare Pages: Edit"**
4. Select your account and zone, or use **"Include > All zones"**
5. Click **Continue to summary > Create token**
6. **Copy the token**
7. Add to GitHub Secrets as `CF_API_TOKEN`

#### 1.3 Configure Repository Variables

In **Settings > Secrets and variables > Actions > Variables** tab, add:

| Variable | Example Value | Description |
|----------|---------------|-------------|
| `CONTENT_REPO` | `yourname/blog-content` | Content repository (format: `username/repo-name`) |
| `CONTENT_POSTS_DIR` | `posts` | Directory in content repo containing `.md` files |
| `CF_PROJECT_NAME` | `first-principles-blog` | Your Cloudflare Pages project name |

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
