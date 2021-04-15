import React from "react"
import { StyleProp, StyleSheet, Text, TextStyle, View } from "react-native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

import { H5, color, radius, spacing, palette } from "../../theme"

interface ChipProps {
  title: string
  height?: number
  iconSize?: number
  iconColor?: string
  borderRadius?: number
  backgroundColor?: string
  textStyle?: StyleProp<TextStyle>
  materialCommunityIconsName?: string
}

const Chip: React.FC<ChipProps> = ({
  title,
  iconSize,
  iconColor,
  textStyle,
  height = 32,
  borderRadius = radius.huge,
  materialCommunityIconsName,
  backgroundColor = color.chipPrimary,
}) => {
  return (
    <View style={{ ...styles.container, backgroundColor, borderRadius, height }}>
      {materialCommunityIconsName && (
        <Icon
          size={iconSize ?? 24}
          name={materialCommunityIconsName}
          color={iconColor ?? color.iconTertiary}
        />
      )}
      <Text
        style={[
          textStyle ?? styles.title,
          { marginHorizontal: materialCommunityIconsName ? spacing.xxs : spacing.m },
        ]}
      >
        {title}
      </Text>
    </View>
  )
}

export default Chip

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: color.buttonSecondary,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 6,
  },

  title: {
    ...H5,
    color: palette.darkGrey,
    marginBottom: 1,
  },
})
