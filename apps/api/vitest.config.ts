import path from 'path';
import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    poolOptions: {
      threads: {
        singleThread: true,
      },
    },
  },
  resolve: {
    alias: {
      '@pkgs': path.resolve(__dirname, '../../pkgs'),
      '@utils': path.resolve(__dirname, '../../pkgs/utils'),
      '@shared': path.resolve(__dirname, '../../pkgs/shared'),
      '@db': path.resolve(__dirname, './src/db'),
      '@routes': path.resolve(__dirname, './src/routes'),
      '@controllers': path.resolve(__dirname, './src/controllers'),
      '@helpers': path.resolve(__dirname, './src/helpers'),
      '@validators': path.resolve(__dirname, './src/validators'),
      '@cfg': path.resolve(__dirname, './src/config'),
      '@const': path.resolve(__dirname, './src/constants'),
      '@middlewares': path.resolve(__dirname, './src/middlewares'),
    },
  },
});
