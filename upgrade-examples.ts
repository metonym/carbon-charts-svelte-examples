import { $, Glob } from "bun";
import fs from "node:fs";

const dirs = new Glob("*").scanSync({
  onlyFiles: false,
});

for await (const dir of dirs) {
  if (fs.lstatSync(dir).isDirectory() && dir !== "node_modules") {
    await $`cd ${dir} && bun install`;
  }
}
