import adapter from "@sveltejs/adapter-node";

const production = process.env.NODE_ENV === "production";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    target: "#svelte",
    vite: {
      optimizeDeps: {
        include: ["@carbon/charts"],
      },
      ssr: {
        noExternal: [production && "@carbon/charts"].filter(Boolean),
      },
    },
  },
};

export default config;
