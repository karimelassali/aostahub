/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'phone': '599px',
      'tablet': '640px',
      'laptop': '1024px',
      'desktop': '1280px',
    },
    borderRadius: {
      'none': '0',
      'sm': '.125rem',
      DEFAULT: '.25rem',
      'lg': '.5rem',
      'full': '9999px',
    },
    extend: {
      rotate:{
        '360' : '360deg',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'text': '#050315',
        'background': '#fbfbfe',
        'primary': '#2f27ce',
        'secondary': '#dedcff',
        'accent': '#433bff',
       },
      animation:{
        scroll:
        "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
    
      },
      fontSize: {
        sm: '0.750rem',
        base: '1rem',
        xl: '1.333rem',
        '2xl': '1.777rem',
        '3xl': '2.369rem',
        '4xl': '3.158rem',
        '5xl': '4.210rem',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        opensans: ['Open Sans', 'sans-serif'],
      },
      fontWeight: {
        normal: '400',
        bold: '700',
      },
    },
      keyframes: {
            scroll: {
              to: {
                transform: "translate(calc(-50% - 0.5rem))",
              },
            },
            "accordion-down": {
              "from": {
                "height": "0"
              },
              "to": {
                "height": "var(--radix-accordion-content-height)"
              }
            },
            "accordion-up": {
              "from": {
                "height": "var(--radix-accordion-content-height)"
              },
              "to": {
                "height": "0"
              }
            }
            
          }
},
  plugins: [require("tailwindcss-animate"),[addVariablesForColors]]
};

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );
 
  addBase({
    ":root": newVars,
  });
}
