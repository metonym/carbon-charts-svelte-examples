import svelte from "rollup-plugin-svelte";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import css from "rollup-plugin-css-only";
import replace from "@rollup/plugin-replace";
import { terser } from "rollup-plugin-terser";

const production = !process.env.ROLLUP_WATCH;

export default {
  input: "src/index.js",
  output: {
    sourcemap: !production,
    format: "iife",
    name: "app",
    file: "public/build/bundle.js",
  },

  // avoid "`this` has been rewritten to `undefined`" Rollup error
  context: "window",

  // required if dynamically importing code
  inlineDynamicImports: true,

  // ignore Rollup warnings for d3 circular dependencies
  onwarn: (warning, warn) => {
    if (warning.code === 'CIRCULAR_DEPENDENCY' && /^node_modules\/d3-/.test(warning.importer)) return;
    warn(warning);
  },
  plugins: [
    // required to avoid "process is not defined" browser error
    replace({
      preventAssignment: true,
      "process.env.NODE_ENV": JSON.stringify(production ? "production" : "development"),
    }),
    svelte({ compilerOptions: { dev: !production } }),
    resolve({ browser: true, dedupe: ["svelte"] }),
    commonjs(),
    css({ output: "bundle.css" }),
    production && terser(),
  ]
};
