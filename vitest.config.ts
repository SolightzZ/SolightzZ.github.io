import {defineConfig} from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(() => {
  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.ts'],
      css: false,
      include: ['src/**/*.test.{ts,tsx}', 'src/**/*.spec.{ts,tsx}'],
      // Run test files serially in a single worker to avoid cross-file
      // contamination of lazy-imported modules and DOM observers.
      pool: 'forks',
      forks: {
         singleFork: true,
      },
      coverage: {
         provider: 'v8' as const,
         reporter: ['text', 'html'],
         exclude: ['src/test/**', 'src/**/*.d.ts', 'src/main.tsx'],
      },
   },
  };
});