import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import alpine from '@astrojs/alpinejs';
import node from '@astrojs/node';

export default defineConfig({
  integrations: [
    tailwind(),
    alpine({
      entrypoint: '/src/entrypoint'
    })
  ],
  output: 'server',
  adapter: node({
    mode: 'standalone'
  })
});