const esbuild = require("esbuild");
const { Generator } = require("npm-dts");

const { dependencies, peerDependencies } = require("./package.json");

const buildOptions = {
  bundle: true,
  entryPoints: ["./src/index.ts"],
  external: Object.keys(dependencies || {}).concat(Object.keys(peerDependencies || {})),
  format: "esm",
  minify: false,
  outdir: "./cache/",
  outExtension: { ".js": ".js" },
  platform: "neutral",
  sourcemap: false,
  target: "node12.22.0",
  watch: {
    onRebuild(error, result) {
      if (error) {
        console.warn("🟥 Watch build failed:", error);
      } else {
        console.clear();
        console.log("🟦 Watch build succeeded");
        if ("error" in result && result.error.length > 0) {
          result.errors.map((error) => {
            console.warn(`🔴 ${error}`);
          });
        }
        if ("warnings" in result && result.warnings.length > 0) {
          result.warnings.map((error) => {
            console.warn(`🟡 ${error}`);
          });
        }
        dts().catch(() => undefined);
        // result.stop();
      }
    },
  },
};

async function dts() {
  return new Generator({
    entry: "./src/index.ts",
    output: "./cache/index.d.ts",
  }).generate();
}

esbuild.build(buildOptions).then((result) => {
  console.clear();
  console.log("🟩 Build completed");
  dts().catch(() => undefined);
  // result.stop();
});
