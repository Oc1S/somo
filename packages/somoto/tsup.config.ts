import { defineConfig } from 'tsup';
import * as preset from 'tsup-preset-solid';

const presetOptions: preset.PresetOptions = {
  // array or single object
  entries: [
    {
      // entries with '.ts' extension will have `solid` export condition generated
      entry: 'src/index.ts',
      // will generate a separate development entry
      dev_entry: true,
      server_entry: true,
    },
  ],
  // Set to `true` to remove all `console.*` calls and `debugger` statements in prod builds
  drop_console: true,
  // Set to `true` to generate a CommonJS build alongside ESM
  cjs: true,
};

const CI =
  process.env['CI'] === 'true' ||
  process.env['GITHUB_ACTIONS'] === 'true' ||
  process.env['CI'] === '"1"' ||
  process.env['GITHUB_ACTIONS'] === '"1"';

export default defineConfig(config => {
  const watching = !!config.watch;

  const parsedOptions = preset.parsePresetOptions(presetOptions, watching);

  if (!watching && !CI) {
    const packageFields = preset.generatePackageExports(parsedOptions);

    console.log(`package.json: \n\n${JSON.stringify(packageFields, null, 2)}\n\n`);

    // will update ./package.json with the correct export fields
    preset.writePackageJson(packageFields);
  }

  return preset.generateTsupOptions(parsedOptions);
});
