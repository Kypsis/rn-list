import React from "react"
import { StyleSheet, View } from "react-native"
import { useNavigation } from "@react-navigation/native"

import VideoPlayerCustom from "../../library_extensions/video_player_controls/video-player"
import { VideoModel } from "../../data/models/video.model"
import { color } from "../../theme"

const VideoScreen: React.FC<{
  route: any
  navigation: any
}> = ({ route }) => {
  const navigation = useNavigation()

  const { videoUrl } = route.params as VideoModel

  return (
    <VideoPlayerCustom
      repeat
      disableVolume
      disableFullscreen
      tapAnywhereToPause
      onBack={navigation.goBack}
      source={{
        uri: videoUrl,
      }}
    />
  )
}

export default VideoScreen
