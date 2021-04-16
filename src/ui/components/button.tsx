import React from "react"
import { Text, StyleSheet, TouchableOpacity, StyleProp, TextStyle } from "react-native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

import { H5, color, radius, spacing } from "../../theme"

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
  height,
  iconSize = 24,
  iconColor = color.iconSecondary,
  borderRadius = radius.huge,
  backgroundColor = color.buttonPrimary,
  materialCommunityIconsName,
  textStyle,
  callback,
}) => {
  return (
    <TouchableOpacity
      onPress={callback}
      style={{
        ...styles.button,
        width,
        height,
        backgroundColor,
        borderRadius,
      }}
    >
      {materialCommunityIconsName && (
        <Icon
          name={materialCommunityIconsName}
          size={iconSize}
          color={iconColor}
          style={styles.icon}
        />
      )}
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
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.m,
  },

  icon: {
    marginRight: spacing.xs,
  },

  title: {
    ...H5,
    marginBottom: 1,
  },
})
