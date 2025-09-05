// @ts-check
import db from "@astrojs/db";
import markdoc from "@astrojs/markdoc";
import react from "@astrojs/react";
import svelte from "@astrojs/svelte";
import vercel from "@astrojs/vercel";
import keystatic from "@keystatic/astro";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  // The `site` property specifies the base URL for your site.
  // Be sure to update this to your own domain (e.g., "https://yourdomain.com") before deploying.
  site: "https://gmtec.eu",
  prefetch: true,
  trailingSlash: "never",
  experimental: {
    clientPrerender: true,
  },
  integrations: [
    react(),
    markdoc(),
    ...(process.env.SKIP_KEYSTATIC ? [] : [keystatic()]),
    db(),
    svelte(),
  ],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': '/src',
        '@common': '/src/components/common',
        '@megaMenu': '/src/components/common/MegaMenu',
        '@assets': '/src/assets',
        '@images': '/src/assets/images',
        '@layout': '/src/layout',
        '@ui': '/src/components/ui',
        '@sections': '/src/components/sections',
        '@styles': '/src/assets/styles',
        '@utils': '/src/utils',
        '@data': '/src/data',
      },
    },
  },
  output: "server",
  adapter: vercel(),
});
