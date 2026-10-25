import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  // Automatically configure the correct base path for GitHub Pages
  // 1. If GITHUB_REPOSITORY is "owner/username.github.io" -> base is '/'
  // 2. If GITHUB_REPOSITORY is "owner/project-repo" -> base is '/project-repo/'
  // 3. Fallback for local build or custom domain -> './'
  const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1];
  const isUserSite = repoName?.toLowerCase().endsWith('.github.io');
  const base = isUserSite ? '/' : (repoName ? `/${repoName}/` : './');

  return {
    base,
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('.', import.meta.url)),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
