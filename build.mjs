import { build } from "esbuild";
import dts from "npm-dts";
const { Generator } = dts;

console.log("Running esbuild...")
build({
  entryPoints: ["src/index.ts"],
  outfile: "dist/index.js",
  format: "esm",
  platform: "browser",
  minify: true,
  sourcemap: true,
  bundle: true,
  target: "es2019",
});

console.log("Generating TypeScript declaration file...")
new Generator({
  entry: "./index.ts",
  output: "dist/index.d.ts",
}, true, true).generate();

console.log("Done.")
