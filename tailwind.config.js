// tailwind.config.js

module.exports = {
  content: [
    './index.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'app-thin': ['Roboto-Thin'],
        'app-light': ['Roboto-Light'],
        'app-regular': ['Roboto-Regular'],
        'app-medium': ['Roboto-Medium'],
        'app-bold': ['Roboto-Bold'],
        'app-black': ['Roboto-Black'],
        'app-ultra': ['Roboto-Ultra'],
      },
    },
  },
  plugins: [],
};
