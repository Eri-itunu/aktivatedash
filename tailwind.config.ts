import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'

export default <Partial<Config>>{
    theme: {
    extend: {
      colors: {
        customPrimary: {
          50: '#5331E8',
          100: '#5331E8',
          200: '#E9DABD',
          300: '#DFC99E',
          400: '#D1B274',
          500: '#C39A4A',
          600: '#A07C35',
          700: '#765B27',
          800: '#4C3A19',
          900: '#211A0B',
          950: '#0C0A04',
        },
        primary: "090618",
        "customGray": "#444",
        "darkBlue": "#1D192F",
        "vDarkBlue": "#090618",
        "grey1": "#CDC2FF",
        "grey2": "#E1DCF7",
        "purple1": "#5331E8",
        "green1": "#6EFFA8",
        "red1": "#FF0000",
        "otpBox" : "#54616C",
        "purplebg" : "#CDC2FF",
        "purplelabel" : "#E1DCF7",
        "dashbg" : "#100C21"
      },

    }
  }
}
