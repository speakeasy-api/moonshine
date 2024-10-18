import { build } from "esbuild";
import dts from "npm-dts";
const { Generator } = dts;

build({
  entryPoints: ["src/index.ts"],
  outfile: "dist/index.js",
  format: "esm",
  platform: "browser",
  minify: true,
  sourcemap: true,
  bundle: true,
});

new Generator({
  entry: "src/index.ts",
  output: "dist/index.d.ts",
}).generate();
