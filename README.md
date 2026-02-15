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

#### 1.2 Configure Vercel (for VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID)

1. **Install Vercel CLI locally**:
   ```bash
   npm i -g vercel
   ```

2. **Login and link project**:
   ```bash
   cd /path/to/first-principles-blog
   vercel login
   vercel link
   ```
   - When prompted, select "No" to not override existing settings
   - This creates `.vercel/project.json`

3. **Get project info**:
   ```bash
   cat .vercel/project.json
   # 输出: {"orgId":"xxxxxxxx","projectId":"xxxxxxxx"}
   ```

4. **Generate Vercel Token**:
   - Go to https://vercel.com/account/tokens
   - Click **Create Token**
   - Name: `GitHub Actions Deploy`
   - **Copy the token**

5. **Add to GitHub Secrets**:
   - `VERCEL_TOKEN` = 复制的 token
   - `VERCEL_ORG_ID` = project.json 中的 orgId
   - `VERCEL_PROJECT_ID` = project.json 中的 projectId

#### 1.3 Configure Repository Variables

In **Settings > Secrets and variables > Actions > Variables** tab, add:

| Variable | Example Value | Description |
|----------|---------------|-------------|
| `CONTENT_REPO` | `yourname/blog-content` | Content repository (format: `username/repo-name`) |
| `CONTENT_POSTS_DIR` | `posts` | Directory in content repo containing `.md` files |

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

### 3. Vercel Project Configuration

- [ ] Run `vercel link` in local project directory (see 1.2)
- [ ] (Optional) Configure custom domain in Vercel dashboard:
   - Project Settings > Domains > Add `jhihjian.com`
   - Follow DNS configuration instructions

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

- [ ] Site accessible at Vercel domain (`https://your-project.vercel.app`)
- [ ] (Optional) Custom domain `jhihjian.com` working
- [ ] RSS feed working at `/rss.xml`
- [ ] All posts rendering correctly
- [ ] Navigation between Articles and Explore working
- [ ] GitHub Actions workflow showing green checkmarks

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
