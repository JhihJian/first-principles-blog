import { defineConfig } from 'astro/config';

// 支持多平台部署：GitHub Pages 需要 base 路径，Vercel 不需要
const base = process.env.DEPLOY_TARGET === 'github-pages'
  ? '/first-principles-blog/'
  : undefined;

export default defineConfig({
  site: 'https://jhihjian.com',
  base,
  output: 'static',
});
