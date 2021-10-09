import adapter from "@sveltejs/adapter-node";
import preprocess from 'svelte-preprocess';

const production = process.env.NODE_ENV === "production";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: preprocess(),
  kit: {
    adapter: adapter(),
    target: '#svelte',
    vite: {
      optimizeDeps: {
        include: ["@carbon/charts"],
      },
      ssr: {
        noExternal: [production && "@carbon/charts"].filter(Boolean),
      },
    }
  }
};

export default config;
