import React from "react"
import { RouteProp, useNavigation } from "@react-navigation/native"

import { DataModel } from "../../data/models/video.model"
import VideoPlayerCustom from "../../library_extensions/video_player_controls/video-player"

const VideoScreen: React.FC<{
  route: RouteProp<{ params: DataModel }, "params">
}> = ({ route }) => {
  const navigation = useNavigation()

  const { videoUrl, thumbnailUrl } = route.params

  return (
    <VideoPlayerCustom
      poster={thumbnailUrl}
      repeat
      disableVolume
      hideShutterView
      disableFullscreen
      tapAnywhereToPause
      controlTimeout={5000}
      onBack={navigation.goBack}
      source={{
        uri: videoUrl,
      }}
    />
  )
}

export default VideoScreen
