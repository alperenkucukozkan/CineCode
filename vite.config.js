import { defineConfig } from 'vite';
import { glob } from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import SortCss from 'postcss-sort-media-queries';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig(({ command }) => ({
  base: command === 'serve' ? '/' : '/CineCode/',
  root: 'src',
  define: { [command === 'serve' ? 'global' : '_global']: {} },
  build: {
    sourcemap: true,
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: glob.sync('./src/*.html'),
      output: {
        manualChunks: id => (id.includes('node_modules') ? 'vendor' : undefined),
        entryFileNames: c => (c.name === 'commonHelpers' ? 'commonHelpers.js' : '[name].js'),
        assetFileNames: a => (a.name?.endsWith('.html') ? '[name].[ext]' : 'assets/[name]-[hash][extname]'),
      },
    },
  },
  plugins: [
    injectHTML(),
    FullReload(['./src/**/*.html']),
    SortCss({ sort: 'mobile-first' }),
    viteStaticCopy({
      targets: [
        { src: 'partials/**/*', dest: 'partials' }, 
        { src: 'img/**/*',      dest: 'img' },       
        { src: 'images/**/*',   dest: 'images' },    
      ],
    }),
  ],
}));
