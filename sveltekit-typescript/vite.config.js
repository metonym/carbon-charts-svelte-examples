import { sveltekit } from "@sveltejs/kit/vite";

/** @type {import('vite').UserConfig} */
export default {
  plugins: [sveltekit()],
  ssr: {
    noExternal: process.env.NODE_ENV === "production" ? ["@carbon/charts", "carbon-components"] : [],
  },
};
