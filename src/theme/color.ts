import { palette } from "./palette"
import { withOpacity } from "../utils/colorUtils"

export const color = {
  transparent: "rgba(0, 0, 0, 0)",

  /**
   * Accent color.
   */
  accent: palette.gold,

  /**
   * Action sheet background color.
   */
  actionSheet: palette.darkerGrey,

  /**
   * The screen background.
   */
  background: palette.black,

  /**
   * Primary button background color.
   */
  buttonPrimary: withOpacity(palette.gold, 0.95),

  /**
   * Secondary button background color.
   */
  buttonSecondary: withOpacity(palette.white, 0.9),

  /**
   * Primary chip background color.
   */
  chipPrimary: withOpacity(palette.black, 0.7),

  /**
   * Secondary chip background color.
   */
  chipSecondary: withOpacity(palette.white, 0.9),

  /**
   * Tertiary chip background color.
   */
  chipTertiary: withOpacity(palette.black, 0.35),

  /**
   * Primary icon background color.
   */
  iconPrimary: palette.darkGrey,

  /**
   * Secondary icon background color.
   */
  iconSecondary: palette.white,

  /**
   * Secondary icon background color.
   */
  iconTertiary: palette.grey,

  /**
   * Error messages and icons.
   */
  error: palette.dangerRed,
}
