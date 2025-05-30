import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import svelte from "@astrojs/svelte";
import remarkToc from 'remark-toc'
import remarkOEmbed from 'remark-oembed';

// https://astro.build/config
export default defineConfig({
  integrations: [svelte()],

  markdown: {
    remarkPlugins: [
      [remarkToc, { heading: "contents" }],
      [remarkOEmbed, { syncWidget: true }]
    ],
  },

  vite: {
    plugins: [tailwindcss()]
  }
});
