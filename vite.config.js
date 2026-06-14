// vite.config.js
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.', 
  build: {
    outDir: 'dist', 
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'examples/index.html'), 
        checkers: resolve(__dirname, 'examples/checkers/index.html'),
        tictactoe: resolve(__dirname, 'examples/tictactoe/index.html'),      
      },
    },
  },
});