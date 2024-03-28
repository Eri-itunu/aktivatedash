import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'

export default <Partial<Config>>{
    theme: {
    extend: {
      colors: {
        primary: colors.green,
        "darkBlue": "#1D192F",
        "vDarkBlue": "#090618",
        "grey1": "#CDC2FF",
        "grey2": "#E1DCF7",
        "purple1": "#5331E8",
        "green1": "#6EFFA8",
        "red1": "#FF0000"
      },
    }
  }
}
