/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  darkMode: 'class',

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        // 9pt
        'gsf-9-thin':       ['GoogleSansFlex_9pt-Thin'],
        'gsf-9-extralight': ['GoogleSansFlex_9pt-ExtraLight'],
        'gsf-9-light':      ['GoogleSansFlex_9pt-Light'],
        'gsf-9':            ['GoogleSansFlex_9pt-Regular'],
        'gsf-9-medium':     ['GoogleSansFlex_9pt-Medium'],
        'gsf-9-semibold':   ['GoogleSansFlex_9pt-SemiBold'],
        'gsf-9-bold':       ['GoogleSansFlex_9pt-Bold'],
        'gsf-9-extrabold':  ['GoogleSansFlex_9pt-ExtraBold'],
        'gsf-9-black':      ['GoogleSansFlex_9pt-Black'],
        // 24pt
        'gsf-24-thin':       ['GoogleSansFlex_24pt-Thin'],
        'gsf-24-extralight': ['GoogleSansFlex_24pt-ExtraLight'],
        'gsf-24-light':      ['GoogleSansFlex_24pt-Light'],
        'gsf-24':            ['GoogleSansFlex_24pt-Regular'],
        'gsf-24-medium':     ['GoogleSansFlex_24pt-Medium'],
        'gsf-24-semibold':   ['GoogleSansFlex_24pt-SemiBold'],
        'gsf-24-bold':       ['GoogleSansFlex_24pt-Bold'],
        'gsf-24-extrabold':  ['GoogleSansFlex_24pt-ExtraBold'],
        'gsf-24-black':      ['GoogleSansFlex_24pt-Black'],
        // 36pt
        'gsf-36-thin':       ['GoogleSansFlex_36pt-Thin'],
        'gsf-36-extralight': ['GoogleSansFlex_36pt-ExtraLight'],
        'gsf-36-light':      ['GoogleSansFlex_36pt-Light'],
        'gsf-36':            ['GoogleSansFlex_36pt-Regular'],
        'gsf-36-medium':     ['GoogleSansFlex_36pt-Medium'],
        'gsf-36-semibold':   ['GoogleSansFlex_36pt-SemiBold'],
        'gsf-36-bold':       ['GoogleSansFlex_36pt-Bold'],
        'gsf-36-extrabold':  ['GoogleSansFlex_36pt-ExtraBold'],
        'gsf-36-black':      ['GoogleSansFlex_36pt-Black'],
        // 72pt
        'gsf-72-thin':       ['GoogleSansFlex_72pt-Thin'],
        'gsf-72-extralight': ['GoogleSansFlex_72pt-ExtraLight'],
        'gsf-72-light':      ['GoogleSansFlex_72pt-Light'],
        'gsf-72':            ['GoogleSansFlex_72pt-Regular'],
        'gsf-72-medium':     ['GoogleSansFlex_72pt-Medium'],
        'gsf-72-semibold':   ['GoogleSansFlex_72pt-SemiBold'],
        'gsf-72-bold':       ['GoogleSansFlex_72pt-Bold'],
        'gsf-72-extrabold':  ['GoogleSansFlex_72pt-ExtraBold'],
        'gsf-72-black':      ['GoogleSansFlex_72pt-Black'],
        // 120pt
        'gsf-120-thin':       ['GoogleSansFlex_120pt-Thin'],
        'gsf-120-extralight': ['GoogleSansFlex_120pt-ExtraLight'],
        'gsf-120-light':      ['GoogleSansFlex_120pt-Light'],
        'gsf-120':            ['GoogleSansFlex_120pt-Regular'],
        'gsf-120-medium':     ['GoogleSansFlex_120pt-Medium'],
        'gsf-120-semibold':   ['GoogleSansFlex_120pt-SemiBold'],
        'gsf-120-bold':       ['GoogleSansFlex_120pt-Bold'],
        'gsf-120-extrabold':  ['GoogleSansFlex_120pt-ExtraBold'],
        'gsf-120-black':      ['GoogleSansFlex_120pt-Black'],
      },
    },
  },
  plugins: [],
};
