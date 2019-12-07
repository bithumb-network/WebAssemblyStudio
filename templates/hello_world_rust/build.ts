import * as gulp from "gulp";
import { Service, project } from "@wasm/studio-utils";

gulp.task("build", async () => {
  // Optimize for small builds for now
  const options = { lto: true, opt_level: 's', debug: true };
  const libSrc = project.getFile("src/lib.rs");
  const data = await Service.compileFileWithBindings(libSrc, "rust", "wasm", options);

  const outWasm = project.newFile("out/contract.wasm", "wasm", true);
  outWasm.setData(data.wasm);
  /// remove out main.js
  // const outJs = project.newFile("out/main.js", "javascript", true);
  // outJs.setData(data.wasmBindgenJs);
});

gulp.task("default", ["build"], async () => {});
