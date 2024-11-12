import solidJs from '@astrojs/solid-js';
import starlight from '@astrojs/starlight';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';

import pkg from '../package.json';
console.log(`🚀 ${pkg.name} v${pkg.version} - ${pkg.description}`);

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'Somoto',
      components: {
        ThemeProvider: './src/components/theme/theme-provider/index.astro',
        ThemeSelect: './src/components/theme/theme-select/index.astro',
      },
      social: {
        github: 'https://github.com/Oc1S/somo',
      },
      customCss: ['./src/app.css'],
      // sidebar: [
      //   {
      //     label: 'Guides',
      //     items: [
      //       // Each item here is one entry in the navigation menu.
      //       { label: 'Example Guide', link: '/guides/example/' },
      //     ],
      //   },
      //   {
      //     label: 'Reference',
      //     autogenerate: { directory: 'reference' },
      //   },
      // ],
    }),
    solidJs(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
});
