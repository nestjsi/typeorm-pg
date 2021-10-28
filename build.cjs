const { exec } = require("child_process");

//---

const esbuild = require("esbuild");

const { Generator } = require("npm-dts");

const { readFileToString, writeFile } = require("@hilesystem/local");

//---

const { dependencies, peerDependencies, name } = require("./package.json");

//---

const args = new Object(null);

process.argv
  .slice(2)
  .filter((arg) => arg.length > 2)
  .filter((arg) => arg.startsWith("--"))
  .map((arg) => arg.slice(2))
  .forEach((arg) => {
    if (!arg.includes("=")) {
      args[arg] = true;
      return;
    }
    const index = arg.indexOf("=");
    const key = arg.slice(0, index);
    const value = arg.slice(index + 1);
    args[key] = value;
    const check = value.toLowerCase().trim();
    switch (true) {
      case check === "false":
        args[key] = false;
        break;
      case check === "null":
        args[key] = null;
        break;
      case check === "true":
        args[key] = true;
        break;
      case check === "undefined":
        args[key] = undefined;
        break;
      case /\d/.test(check) && Number.isFinite(Number.parseFloat(check)):
        args[key] = Number.parseFloat(check);
        break;
    }
  });

{
  const MINIFY = true;
  args.minify = "minify" in args ? (args.minify === true ? true : args.minify === false ? false : MINIFY) : MINIFY;
}

{
  const SOURCEMAP = "external";
  args.sourcemap =
    "sourcemap" in args
      ? true === args.sourcemap
        ? SOURCEMAP
        : false === args.sourcemap
        ? false
        : SOURCEMAP
      : SOURCEMAP;
}

const buildOptions = {
  bundle: true,
  entryPoints: ["./src/index.ts"],
  external: Object.keys(dependencies || {}).concat(Object.keys(peerDependencies || {})),
  minify: true,
  outdir: "./dist/",
  platform: "neutral",
  sourcemap: "external",
  target: "node12.22.0",
  tsconfig: "./tsconfig.build.json",
};

if ("minify" in args) {
  buildOptions.minify = args.minify;
  if (buildOptions.minify) {
    buildOptions.sourcemap = args.sourcemap;
  } else {
    buildOptions.sourcemap = false;
  }
}

async function mjs() {
  return new Promise((resolve) => {
    esbuild
      .build({ ...buildOptions, ...{ format: "esm", outExtension: { ".js": ".mjs" } } })
      .then(() => {
        console.log("   🟣 ESM build completed             ✔️");
        resolve();
      })
      .catch((error) => {
        console.log(error);
        process.exit(1);
      });
  });
}

async function cjs() {
  return new Promise((resolve) => {
    esbuild
      .build({ ...buildOptions, ...{ format: "cjs", outExtension: { ".js": ".cjs" } } })
      .then(() => {
        console.log("   🟢 CommonJS .CJS build completed    ✔️");
        resolve();
      })
      .catch((error) => {
        console.log(error);
        process.exit(2);
      });
  });
}

async function js() {
  return new Promise((resolve) => {
    esbuild
      .build({ ...buildOptions, ...{ format: "cjs", outExtension: { ".js": ".js" } } })
      .then(() => {
        console.log("   🟢 CommonJS .JS build completed     ✔️");
        resolve();
      })
      .catch((error) => {
        console.log(error);
        process.exit(3);
      });
  });
}

async function dtsOne() {
  return new Promise((resolve) => {
    new Generator(
      {
        entry: "./src/index.ts",
        output: "./dist/index.d.ts",
      },
      false,
      true,
    )
      .generate()
      .then(() => {
        console.log("   🔵 TS declarations build completed ✔️");
        resolve();
      })
      .catch((error) => {
        console.log(error);
        process.exit(4);
      });
  });
}

async function dts() {
  return new Promise((resolve) => {
    exec(
      "node ./node_modules/typescript/lib/tsc --emitDeclarationOnly --outFile ./dist/index.d.ts",
      (error, stdout, stderr) => {
        if (error) {
          console.log(error);
          process.exit(5);
        }
        if (stderr) {
          console.log(stderr);
          process.exit(6);
        }
        exec("node ./node_modules/prettier/bin-prettier.js --write ./dist/index.d.ts", (error, stdout, stderr) => {
          if (error) {
            console.log(error);
            process.exit(7);
          }
          if (stderr) {
            console.log(stderr);
            process.exit(8);
          }
          readFileToString("./dist/index.d.ts")
            //
            .then((data) => {
              const newData = data.replace(/declare module "index" {/g, `declare module "${name}" {`);
              writeFile("./dist/index.d.ts", newData)
                //
                .then(() => {
                  console.log("   🔵 TS declarations build completed ✔️");
                  resolve();
                })
                .catch((error) => {
                  console.log(error);
                  process.exit(9);
                });
            })
            .catch((error) => {
              console.log(error);
              process.exit(10);
            });
        });
      },
    );
  });
}

async function start() {
  return new Promise((resolve) => {
    console.clear();
    console.log("🏁 Build started…");
    resolve();
  });
}

Promise.all([
  //
  start(),
  mjs(),
  cjs(),
  js(),
  dts(),
])
  .then(() => {
    console.log("✅ Build completed");
    process.exit(0);
  })
  .catch((error) => {
    console.log(error);
    process.exit(99);
  });
