import React from "react"
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
      <Text style={H4}>{fileName}</Text>
      <View style={styles.row}>
        <Text style={H5}>{timestampFromDateTime(dateTime)}</Text>
        <View style={styles.duration}>
          <Icon name="play" size={16} color={color.iconSecondary} />
          <Text style={styles.text}>{timestampFromSeconds(durationInSeconds)}</Text>
        </View>
      </View>
    </View>
  )
}

export default CardInfo

const styles = StyleSheet.create({
  duration: {
    alignItems: "center",
    backgroundColor: color.chip,
    borderRadius: radius.medium,
    flexDirection: "row",
    height: 24,
    justifyContent: "space-between",
    paddingHorizontal: 6,
  },

  row: { flexDirection: "row", justifyContent: "space-between", marginTop: spacing.xxs },

  text: { ...H6, marginHorizontal: spacing.xxs },

  textContainer: { padding: spacing.m },
})
