import React, { useState, useEffect } from "react"
import { StyleSheet, View, StatusBar, SectionList, Text } from "react-native"

import Separator from "../components/separator"
import VideoCard from "../components/video-card"
import { VideoModel } from "../../data/models/video.model"

const VideoListScreen = () => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false)
      setIsLoading(true)

      try {
        const response = await fetch(
          "https://europe-central2-supervaisor-test.cloudfunctions.net/getVideos",
        )
        const json = await response.json()

        setData(json)
      } catch (error) {
        setIsError(true)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <View>
      <SectionList
        sections={data}
        ItemSeparatorComponent={Separator}
        contentContainerStyle={styles.container}
        keyExtractor={(item, index) => item + index}
        renderSectionHeader={({ section: { title } }) => <Text style={styles.header}>{title}</Text>}
        renderItem={({ item }) => <VideoCard cardData={item} />}
      />
    </View>
  )
}

export default VideoListScreen

const styles = StyleSheet.create({
  container: {
    marginBottom: 24.0,
    marginHorizontal: 24.0,
    marginTop: (StatusBar.currentHeight ?? 50.0) + 24.0,
  },
  header: {
    backgroundColor: "#fff",
    fontSize: 32,
  },
})
