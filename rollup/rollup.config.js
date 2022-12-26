import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import css from "rollup-plugin-css-only";
import svelte from "rollup-plugin-svelte";
import { terser } from "rollup-plugin-terser";

const production = !process.env.ROLLUP_WATCH;

export default {
  input: "src/index.js",
  output: {
    sourcemap: !production,
    format: "es",
    dir: "public/build",
  },

  // avoid "`this` has been rewritten to `undefined`" Rollup error
  context: "window",

  // ignore Rollup warnings for d3 circular dependencies
  onwarn: (warning, warn) => {
    if (warning.code === "CIRCULAR_DEPENDENCY") {
      if (warning.ids.some((id) => /node_modules\/(d3-|@carbon\/charts)/.test(id))) {
        return;
      }
    }
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
  ],
};
