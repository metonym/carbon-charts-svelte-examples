import { sveltekit } from "@sveltejs/kit/vite";

/** @type {import('vite').UserConfig} */
export default {
  plugins: [sveltekit()],
  ssr: {
    noExternal: ["@carbon/charts", "carbon-components"],
  },
};
