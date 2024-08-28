import { defineConfig, presetUno, presetIcons, presetWebFonts } from 'unocss';

const fontFamily = 'Moderustic';

export default defineConfig({
  presets: [
    presetWebFonts({
      fonts: {
        sans: [
          {
            name: fontFamily,
            weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
            italic: true,
            provider: 'google',
          },
        ],
      },
    }),
    presetUno({}),
    presetIcons({
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
      },
    }),
  ],
  preflights: [{ getCSS: () => `body {font-family: ${fontFamily}}` }],
});
