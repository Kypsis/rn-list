import React from "react"
import { View, StyleSheet, Dimensions } from "react-native"
import VideoPlayer from "react-native-video-controls"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

export default class VideoPlayerCustom extends VideoPlayer {
  renderBack() {
    return this.renderControl(
      <View style={styles.back}>
        <Icon name="arrow-left" size={32} color="#FFFFFF" />
      </View>,
      this.events.onBack,
    )
  }

  renderPlayPause() {
    return this.renderControl(
      <View style={styles.playPause}>
        {this.state.paused === true ? (
          <Icon name="play-circle-outline" size={48} color="#FFFFFF" />
        ) : (
          <Icon name="pause-circle-outline" size={48} color="#FFFFFF" />
        )}
      </View>,
      this.methods.togglePlayPause,
    )
  }
}

const width = Dimensions.get("window").width

const styles = StyleSheet.create({
  back: {
    alignItems: "center",
    borderRadius: 24,
    height: 48,
    justifyContent: "center",
    marginLeft: -24,
    marginTop: 8,
    paddingRight: 4,
    width: 48,
  },

  playPause: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    left: width / 2 - 32,
    position: "absolute",
  },
})
