import React from "react"
import { Text, StyleSheet, TouchableOpacity, StyleProp, TextStyle } from "react-native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

import { H6, color, radius, spacing } from "../../theme"
import { palette } from "../../theme/palette"

interface ButtonProps {
  title?: string
  width?: number
  height?: number
  iconSize?: number
  iconColor?: string
  borderRadius?: number
  backgroundColor?: string
  materialCommunityIconsName?: string
  textStyle?: StyleProp<TextStyle>
  callback(): void
}

const Button: React.FC<ButtonProps> = ({
  title,
  width,
  height = 48,
  iconSize = 24,
  iconColor = color.iconPrimary,
  borderRadius = radius.huge,
  backgroundColor = color.buttonPrimary,
  materialCommunityIconsName = "plus",
  textStyle,
  callback,
}) => {
  return (
    <TouchableOpacity
      onPress={callback}
      style={{
        ...styles.button,
        height,
        width,
        backgroundColor,
        borderRadius,
        paddingHorizontal: spacing.l,
      }}
    >
      <Icon name={materialCommunityIconsName} size={iconSize} color={iconColor} />
      {title && <Text style={textStyle ?? styles.title}>{title}</Text>}
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  title: {
    ...H6,
    color: palette.darkerGrey,
    marginBottom: 1,
    marginLeft: spacing.xs,
  },
})
