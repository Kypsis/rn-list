export const withOpacity = (rgbaString: string, opacity: number) => {
  return rgbaString.split(", 1)")[0] + "," + opacity + ")"
}
