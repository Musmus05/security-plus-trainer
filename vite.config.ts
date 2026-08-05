import { fileURLToPath, URL } from 'node:url';

import mdx from '@mdx-js/rollup';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import remarkGfm from 'remark-gfm';
// `vitest/config` re-exports Vite's defineConfig with the `test` block typed.
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [
    // MDX must run before the React plugin so the JSX it generates gets transformed.
    {
      enforce: 'pre',
      ...mdx({
        providerImportSource: '@mdx-js/react',
        remarkPlugins: [remarkGfm],
      }),
    },
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    // Lazy-loading content per objective is only worth it if entry chunks stay small.
    // This warns loudly if a change silently pulls the content bank into the initial bundle.
    chunkSizeWarningLimit: 400,
    sourcemap: true,
  },
  test: {
    environment: 'jsdom',
    // Explicit imports over magic globals: a reader can always tell where `expect` came from.
    globals: false,
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reportsDirectory: './coverage',
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/**/*.{test,spec}.{ts,tsx}', 'src/test/**', 'src/**/*.d.ts', 'src/main.tsx'],
      thresholds: {
        // The pure engines carry the exam-critical logic, so they are held to a higher bar
        // than presentational code, which the Playwright suite covers instead.
        'src/domain/**': {
          statements: 95,
          branches: 90,
          functions: 95,
          lines: 95,
        },
      },
    },
  },
});
