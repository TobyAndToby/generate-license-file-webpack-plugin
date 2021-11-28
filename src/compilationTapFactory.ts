import { Compilation, Compiler } from "webpack";
import LicenseFilePlugin from ".";
import { asyncProcessAssetTapFactory } from "./asyncProcessAssetTapFactory";
import { Options } from "./options";

type CompilationTap = (compilation: Compilation) => void;

export const compilationTapFactory = (options: Options, compiler: Compiler): CompilationTap => {
  const pluginName = LicenseFilePlugin.name;

  return compilation => {
    const processAssetTap = asyncProcessAssetTapFactory(options, compiler, compilation);

    const assetOptions = {
      name: pluginName,
      stage: Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL
    };

    compilation.hooks.processAssets.tapAsync(assetOptions, processAssetTap);
  };
};