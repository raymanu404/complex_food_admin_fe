import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import svgrPlugin from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [
      react({
        include: ['**/*.tsx'],
      }),
      viteTsconfigPaths(),
      svgrPlugin(),
    ],
    resolve: {
      alias: [
        { find: '@', replacement: path.resolve(__dirname, 'src') },
        // { find: 'devextreme/ui', replacement: 'devextreme/esm/ui' },
      ],
    },
    server: {
      watch: {
        usePolling: true,
      },
      host: true,
      strictPort: true,
      port: 80,
      hmr: {
        port: 33,
        clientPort: 33,
        protocol: 'ws',
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './testSetup.js',
    },
    build: {
      outDir: 'build',
      sourcemap: false,
      chunkSizeWarningLimit: 2000,
    },
  }
})
