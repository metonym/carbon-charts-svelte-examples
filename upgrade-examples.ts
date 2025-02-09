import { $ } from "bun";

for await (const dir of $`find . -maxdepth 1 -type d -exec test -f {}/package.json \; -print`.lines()) {
  await $`cd ${dir} && bun update && bun install`;
}
