import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors:{
      
        whitefir:"#EAEEF0",
        yellow:"#EDE4FF",
        whitesec:"#F2FFFA",
        blue:"#30B4FF",
        orange:"#6528F7",
        bluesec:"#142948",
        black:"#2C2C2C"
      }
    },

  },
  daisyui: {
    themes: ["light",],
  },
  plugins: [require("daisyui")],
  
}
export default config
