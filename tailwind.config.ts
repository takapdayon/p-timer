import { getIconCollections, iconsPlugin } from '@egoist/tailwindcss-icons';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        xs: '510px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        background: 'rgb(var(--background))',
        text: 'rgb(var(--text))',
        subtext: 'rgb(var(--sub-text))',
      },
      boxShadow: {
        'np-fly': `6px 6px 9px rgb(var(--np-shadow)), -6px -6px 9px rgb(var(--np-bright))`,
        'np-flat': `3px 3px 5px rgb(var(--np-shadow)), -3px -3px 5px rgb(var(--np-bright))`,
        'np-pressed': 'inset 3px 3px 5px rgb(var(--np-shadow)), inset -3px -3px 5px rgb(var(--np-bright))',

        'np-shallow-flat': '2px 2px 3px rgb(var(--np-shadow)), -2px -2px 3px rgb(var(--np-bright))',
        'np-shallow-pressed': 'inset 2px 2px 3px rgb(var(--np-shadow)), inset -2px -2px 3px rgb(var(--np-bright))',

        'np-deep-flat': '3px 3px 5px rgb(var(--np-shadow)), -3px -3px 5px rgb(var(--np-bright))',
        'np-deep-pressed': 'inset 3px 3px 5px rgb(var(--np-shadow)), inset -3px -3px 5px rgb(var(--np-bright))',
      },
    },
  },
  plugins: [
    iconsPlugin({
      collections: getIconCollections(['material-symbols', 'simple-icons']),
    }),
  ],
  darkMode: 'class',
};
export default config;
