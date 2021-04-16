import React, { memo } from "react"
import { StyleProp, StyleSheet, Text, TextStyle, View } from "react-native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

import { H5, color, radius, spacing, palette } from "../../theme"

interface ChipProps {
  title: string
  width?: number
  height?: number
  iconSize?: number
  iconColor?: string
  borderRadius?: number
  backgroundColor?: string
  paddingVertical?: number
  paddingHorizontal?: number
  textStyle?: StyleProp<TextStyle>
  materialCommunityIconsName?: string
}

const Chip: React.FC<ChipProps> = ({
  title,
  width,
  height,
  textStyle,
  iconSize = 24,
  materialCommunityIconsName,
  borderRadius = radius.huge,
  paddingVertical = spacing.xxs,
  paddingHorizontal = spacing.xs,
  iconColor = color.iconTertiary,
  backgroundColor = color.chipPrimary,
}) => {
  return (
    <View
      style={{
        ...styles.container,
        paddingHorizontal,
        paddingVertical,
        backgroundColor,
        borderRadius,
        height,
        width,
      }}
    >
      <Icon size={iconSize} color={iconColor} name={materialCommunityIconsName} />

      <Text style={textStyle ?? styles.title}>{title}</Text>
    </View>
  )
}

export default memo(Chip)

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: color.buttonSecondary,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  title: {
    ...H5,
    color: palette.darkGrey,
    marginBottom: 1,
    marginHorizontal: spacing.xxs,
  },
})
