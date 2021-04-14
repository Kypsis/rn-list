import { Platform, TextStyle } from "react-native"
import { palette } from "./palette"

export const typography = {
  primary: Platform.select({ ios: "Helvetica", android: "normal" }),
  secondary: Platform.select({ ios: "Arial", android: "sans-serif" }),
}

export const H1: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 48,
  fontWeight: "800",
  color: palette.white,
}

export const H2: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 32,
  fontWeight: "800",
  color: palette.white,
}

export const H3: TextStyle = {
  fontFamily: typography.secondary,
  fontSize: 22,
  fontWeight: "700",
  color: palette.white,
}

export const H4: TextStyle = {
  fontFamily: typography.secondary,
  fontSize: 18,
  fontWeight: "700",
  color: palette.white,
}

export const H5: TextStyle = {
  fontFamily: typography.secondary,
  fontSize: 14,
  fontWeight: "700",
  color: palette.white,
}

export const H6: TextStyle = {
  fontFamily: typography.secondary,
  fontSize: 12,
  fontWeight: "700",
  color: palette.white,
}
