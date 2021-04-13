import React from "react"
import { View, StyleSheet } from "react-native"
import VideoPlayer from "react-native-video-controls"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { palette } from "../../theme"

export default class VideoPlayerCustom extends VideoPlayer {
  renderBack() {
    return this.renderControl(
      <View style={styles.back}>
        <Icon name="chevron-left" size={32} color={palette.darkGrey} />
      </View>,
      this.events.onBack,
    )
  }
}

const styles = StyleSheet.create({
  back: {
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    borderRadius: 24,
    height: 48,
    justifyContent: "center",
    marginLeft: -16,
    marginTop: 24,
    paddingRight: 4,
    width: 48,
  },
})
