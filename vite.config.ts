import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
   return {
      plugins: [react(), tailwindcss()],
      resolve: {
         alias: {
            '@': path.resolve(__dirname, '.'),
         },
      },
      server: {
// HMR is disabled in AI Studio via DISABLE_HMR env var.
// Do not modify—file watching is disabled to prevent flickering during agent edits.
         hmr: process.env.DISABLE_HMR !== 'true',
         // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
         watch: process.env.DISABLE_HMR === 'true' ? null : {},
      },
      build: {
         target: 'es2022',
         cssCodeSplit: true,
         sourcemap: false,
         minify: 'esbuild' as const,
         // Split heavy vendor libs into their own chunks so they cache across deploys.
         rollupOptions: {
            output: {
               manualChunks: {
                  'vendor-mui': [
                     '@mui/material',
                     '@emotion/react',
                     '@emotion/styled',
                  ],
                  'vendor-motion': ['motion', 'motion/react'],
                  'vendor-three': ['three'],
                  'vendor-icons': ['lucide-react'],
               },
            },
         },
         // Drop noisy dev output in production.
         esbuild: {
            drop: ['console', 'debugger'],
            legalComments: 'none',
         },
      },
   };
});
