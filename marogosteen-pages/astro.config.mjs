import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import svelte from "@astrojs/svelte";
import remarkToc from 'remark-toc'
import oembedTransformer from '@remark-embedder/transformer-oembed'
import remarkEmbedder from '@remark-embedder/core'

// https://astro.build/config
export default defineConfig({
  integrations: [svelte()],

  markdown: {
    remarkPlugins: [
      [remarkToc, { heading: "contents" }],
      [remarkEmbedder.default, { transformers: [oembedTransformer] }]
    ],
  },

  vite: {
    plugins: [tailwindcss()]
  }
});
