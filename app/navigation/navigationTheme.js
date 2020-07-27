import { DefaultTheme } from "@react-navigation/native";

import colors from "../config/colors";

// console.log(DefaultTheme);
export default {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    // card: colors.primary,
    // text: colors.white,
    background: colors.white,
  },
};
