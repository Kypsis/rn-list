import React, { memo } from "react"
import { StyleSheet, Text, View, Platform } from "react-native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

import { H5, color, radius, spacing, palette } from "../../theme"

interface TimeChipProps {
  title: string

  trailingText?: string
}

const TimeChip: React.FC<TimeChipProps> = ({
  title,

  trailingText,
}) => {
  return (
    <View style={styles.container}>
      <Icon
        size={24}
        color={color.iconTertiary}
        style={styles.icon}
        name="clock-time-four-outline"
      />

      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        {trailingText && <Text style={styles.trailingText}>{trailingText}</Text>}
      </View>
    </View>
  )
}

export default memo(TimeChip)

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: color.chipSecondary,
    borderRadius: radius.huge,
    flexDirection: "row",
    justifyContent: "space-between",

    paddingHorizontal: spacing.s,
    paddingVertical: spacing.xxs,
  },

  icon: { marginLeft: -5.6 },

  textContainer: { flexDirection: "row" },

  title: {
    ...H5,
    color: palette.darkGrey,
    marginHorizontal: spacing.xxs,
  },

  trailingText: {
    color: palette.darkGrey,
    fontSize: 10,
    fontWeight: "700",
    marginLeft: -1.5,
    marginTop: Platform.OS === "ios" ? 3 : 4.4,
  },
})
