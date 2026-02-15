#!/usr/bin/env node
/**
 * Fetch posts from content repository during build time
 * Used by Vercel and GitHub Actions
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const CONTENT_REPO = process.env.CONTENT_REPO;
const CONTENT_POSTS_DIR = process.env.CONTENT_POSTS_DIR || '05_Posts';
const TOKEN = process.env.CONTENT_REPO_TOKEN;

const POSTS_DIR = path.join(__dirname, '..', 'src', 'content', 'posts');

// Ensure posts directory exists
if (!fs.existsSync(POSTS_DIR)) {
  fs.mkdirSync(POSTS_DIR, { recursive: true });
}

// Skip if no content repo configured (local dev without env vars)
if (!CONTENT_REPO || !TOKEN) {
  console.log('⚠️  CONTENT_REPO or CONTENT_REPO_TOKEN not set');
  console.log('   Skipping content fetch. Using local posts if any.');
  process.exit(0);
}

console.log(`📥 Fetching posts from ${CONTENT_REPO}...`);

try {
  // Clean up existing posts
  const existingFiles = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));
  for (const file of existingFiles) {
    fs.unlinkSync(path.join(POSTS_DIR, file));
    console.log(`   Removed: ${file}`);
  }

  // Clone and copy posts
  const cloneUrl = `https://x-access-token:${TOKEN}@github.com/${CONTENT_REPO}.git`;

  execSync(`
    git clone --depth 1 --filter=blob:none --sparse "${cloneUrl}" /tmp/kb
    cd /tmp/kb
    git sparse-checkout set ${CONTENT_POSTS_DIR}
    git checkout
  `, { stdio: 'inherit', shell: true });

  // Copy all .md files from the content directory
  const sourceDir = path.join('/tmp/kb', CONTENT_POSTS_DIR);
  const files = fs.readdirSync(sourceDir).filter(f => f.endsWith('.md'));

  for (const file of files) {
    fs.copyFileSync(path.join(sourceDir, file), path.join(POSTS_DIR, file));
    console.log(`   Copied: ${file}`);
  }

  console.log(`✅ Fetched ${files.length} posts successfully`);
} catch (error) {
  console.error('❌ Failed to fetch posts:', error.message);
  process.exit(1);
}
