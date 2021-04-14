import React, { memo } from "react"
import { StyleSheet, Text, View } from "react-native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

import { radius, spacing, color, H4, H5, H6 } from "../../theme"
import { timestampFromDateTime, timestampFromSeconds } from "../../utils/timeUtils"

interface CardInfoProps {
  fileName: string
  dateTime: string
  durationInSeconds: number
}

const CardInfo: React.FC<CardInfoProps> = ({ fileName, dateTime, durationInSeconds }) => {
  return (
    <View style={styles.textContainer}>
      <View style={styles.row}>
        <View style={styles.time}>
          <Icon name="clock-time-four-outline" size={24} color={color.iconTertiary} />
          <Text style={styles.leftText}>{timestampFromDateTime(dateTime)}</Text>
        </View>

        <View style={styles.duration}>
          <Icon name="timer-outline" size={16} color={color.iconSecondary} />
          <Text style={styles.rightText}>{timestampFromSeconds(durationInSeconds)}</Text>
        </View>
      </View>

      <View style={styles.playContainer}>
        <Icon name="play" size={36} color={color.iconSecondary} />
      </View>

      <Text style={H4}>{fileName}</Text>
    </View>
  )
}

export default memo(CardInfo)

const styles = StyleSheet.create({
  duration: {
    alignItems: "center",
    backgroundColor: color.chip,
    borderRadius: radius.medium,
    flexDirection: "row",
    height: 24,
    justifyContent: "space-between",
    paddingHorizontal: spacing.xxs,
  },

  leftText: { ...H5, marginBottom: 2, marginHorizontal: spacing.xxs },

  playContainer: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: color.chip,
    borderRadius: radius.huge,
    height: 48,
    justifyContent: "center",
    width: 48,
  },

  rightText: { ...H6, marginHorizontal: spacing.xxs },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  textContainer: { flex: 1, justifyContent: "space-between", padding: spacing.s },

  time: {
    alignItems: "center",
    backgroundColor: color.buttonSecondary,
    borderRadius: radius.huge,
    flexDirection: "row",
    height: 32,
    justifyContent: "space-between",
    paddingHorizontal: 6,
  },
})
