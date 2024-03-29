import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import markdoc from "@astrojs/markdoc";
import keystatic from "@keystatic/astro";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), markdoc(), mdx(), ...(process.env.ENV === 'PROD' ? [] : [keystatic()])],
  output: process.env.ENV === 'PROD' ? 'static' : 'hybrid'
});