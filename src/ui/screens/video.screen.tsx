import React from "react"
import { RouteProp, useNavigation } from "@react-navigation/native"

import { DataModel } from "../../data/models/video.model"
import VideoPlayerCustom from "../../library_extensions/video_player_controls/video-player"

const VideoScreen: React.FC<{
  route: RouteProp<{ params: DataModel }, "params">
}> = ({ route }) => {
  const navigation = useNavigation()

  const { videoUrl } = route.params

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
