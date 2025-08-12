import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import dts from 'vite-plugin-dts'

// Get dirname in ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['src'],
      exclude: ['src/main.tsx', 'src/App.tsx'],
      outDir: 'dist',
      entryRoot: 'src',
      tsconfigPath: 'tsconfig.build.json'
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'FriendlyTruncation',
      fileName: (format) => `friendly-truncation.${format === 'es' ? 'mjs' : 'js'}`,
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'styles.css';
          return assetInfo.name || '';
        },
      },
    },
    cssCodeSplit: false,
    sourcemap: true,
    minify: 'terser',
  },
});
