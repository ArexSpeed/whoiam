module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  mode: 'jit',
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#EFF1F3',
        white: '#FFFFFF'
      },
      fontSize: {
        xm: '12px',
        sm: '16px',
        md: '24px',
        lg: '32px',
        xl: '72px'
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif']
      },
      maxHeight: {
        80: '80vh'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
