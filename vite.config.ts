import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import svgrPlugin from 'vite-plugin-svgr'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [
      react({
        include: ['**/*.tsx'],
      }),
      viteTsconfigPaths(),
      svgrPlugin(),
    ],
    resolve: {
      alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
    },
    server: {
      watch: {
        usePolling: true,
      },
      host: true,
      strictPort: true,
      port: 80,
      hmr: {
        port: 34,
        clientPort: 34,
        protocol: 'ws',
      },
      open: true,
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './testSetup.js',
    },
    build: {
      outDir: 'build',
      sourcemap: false,
    },
  }
})

