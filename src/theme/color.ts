import { palette } from "./palette"
import { withOpacity } from "../utils/colorUtils"

export const color = {
  transparent: "rgba(0, 0, 0, 0)",

  /**
   * The screen background.
   */
  background: palette.black,

  /**
   * Secondary button background color.
   */
  buttonPrimary: withOpacity(palette.white, 0.2),

  /**
   * Secondary button background color.
   */
  buttonSecondary: withOpacity(palette.white, 0.9),

  /**
   * Chip background color.
   */
  chip: withOpacity(palette.black, 0.3),

  /**
   * Primary icon background color.
   */
  iconPrimary: palette.darkGrey,

  /**
   * Secondary icon background color.
   */
  iconSecondary: palette.white,

  /**
   * The main tinting color.
   */
  // primary: palette.orange,

  /**
   * The main tinting color, but darker.
   */
  // primaryDarker: palette.orangeDarker,

  /**
   * Error messages and icons.
   */
  error: palette.dangerRed,
}
