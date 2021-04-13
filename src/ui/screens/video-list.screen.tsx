import React, { useState, useEffect, useRef } from "react"
import { StyleSheet, View, StatusBar, SectionList, Text } from "react-native"

import Fab from "../components/fab"
import Separator from "../components/separator"
import VideoCard from "../components/video-card"
import { H5, color, radius, spacing } from "../../theme"

const VideoListScreen = () => {
  const listRef = useRef(null)
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

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

  const scrollToTop = () =>
    listRef.current.scrollToLocation({ animated: true, itemIndex: 0, sectionIndex: 0 })

  return (
    <View style={styles.viewContainer}>
      <SectionList
        refreshing={isLoading}
        ref={listRef}
        onRefresh={fetchData}
        stickySectionHeadersEnabled
        sections={data}
        ItemSeparatorComponent={Separator}
        contentContainerStyle={styles.contentContainer}
        keyExtractor={(item, index) => item + index}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.header}>
            <Text style={H5}>{title}</Text>
          </View>
        )}
        renderItem={({ item }) => <VideoCard cardData={item} />}
      />

      <Fab callback={scrollToTop} materialCommunityIconsName="arrow-collapse-up" />
    </View>
  )
}

export default VideoListScreen

const styles = StyleSheet.create({
  contentContainer: {
    // marginBottom: spacing.l,
    marginHorizontal: spacing.l,
    marginTop: (StatusBar.currentHeight ?? 50) - spacing.l,
  },

  header: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: color.buttonPrimary,
    borderRadius: radius.huge,
    height: 48,
    justifyContent: "center",
    marginBottom: spacing.l,
    marginTop: spacing.xl,
    paddingHorizontal: spacing.l,
  },

  viewContainer: { backgroundColor: color.background },
})
