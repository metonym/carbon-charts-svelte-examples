/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    target: "#svelte",
    vite: {
      optimizeDeps: { include: ["@carbon/charts"] },
    },
  },
};

export default config;
