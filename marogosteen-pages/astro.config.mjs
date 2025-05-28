import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import svelte from "@astrojs/svelte";
import remarkToc from 'remark-toc'

// https://astro.build/config
export default defineConfig({
  integrations: [svelte()],

  markdown: {
    remarkPlugins: [[remarkToc, { heading: "contents" }]],
  },

  vite: {
    plugins: [tailwindcss()]
  }
});
