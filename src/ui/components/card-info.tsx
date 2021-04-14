import React, { memo } from "react"
import { StyleSheet, Text, View } from "react-native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

import Chip from "./chip"
import { radius, spacing, color, H3, H6 } from "../../theme"
import { timestampFromDateTime, timestampFromSeconds } from "../../utils"

interface CardInfoProps {
  fileName: string
  dateTime: string
  durationInSeconds: number
}

const CardInfo: React.FC<CardInfoProps> = ({ fileName, dateTime, durationInSeconds }) => {
  return (
    <View style={styles.textContainer}>
      <View style={styles.row}>
        <Chip
          title={timestampFromDateTime(dateTime)}
          materialCommunityIconsName="clock-time-four-outline"
        />

        <Chip
          height={24}
          iconSize={16}
          borderRadius={radius.medium}
          backgroundColor={color.chip}
          iconColor={color.iconSecondary}
          materialCommunityIconsName="timer-outline"
          title={timestampFromSeconds(durationInSeconds)}
          textStyle={{ ...H6, marginHorizontal: spacing.xxs }}
        />
      </View>

      <View style={styles.playContainer}>
        <Icon name="play" size={36} color={color.iconSecondary} />
      </View>

      <Text style={H3}>{fileName}</Text>
    </View>
  )
}

export default memo(CardInfo)

const styles = StyleSheet.create({
  playContainer: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: color.chip,
    borderRadius: radius.huge,
    height: 48,
    justifyContent: "center",
    width: 48,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  textContainer: { flex: 1, justifyContent: "space-between", padding: spacing.s },
})
