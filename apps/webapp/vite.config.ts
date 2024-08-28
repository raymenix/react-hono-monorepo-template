import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import unocss from 'unocss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [unocss(), react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@shared': path.resolve(__dirname, '../../pkgs/shared'),
      '@utils': path.resolve(__dirname, '../../pkgs/utils'),
    },
  },
  define: {
    // ! for some reason we need to wrap this in single quotes
    // ! I think it's because we load env using "dotenv-cli"
    'import.meta.env.API_URL': `'${process.env.API_URL}'`,
    'import.meta.env.WEBAPP_URL': `'${process.env.WEBAPP_URL}'`,
    'import.meta.env.API_PORT': `'${process.env.API_PORT}'`,
    'import.meta.env.PROJECT': `'${process.env.PROJECT}'`,
  },
  server: {
    port: Number(process.env.WEBAPP_PORT) ?? 3000,
  },
});
