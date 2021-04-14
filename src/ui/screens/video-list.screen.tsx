import React, { useState, useEffect, useRef } from "react"
import {
  StyleSheet,
  View,
  StatusBar,
  SectionList,
  Text,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native"

import Fab from "../components/fab"
import Separator from "../components/separator"
import VideoCard from "../components/video-card"
import { H5, color, radius, spacing } from "../../theme"

const VideoListScreen = () => {
  const listRef = useRef(null)
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isFabVisible, setIsFabVisible] = useState(false)

  const screenHeight = Dimensions.get("window").height

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

  const hideFab = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollOffset = event.nativeEvent.contentOffset.y

    if (scrollOffset <= screenHeight) {
      setIsFabVisible(false)
    } else {
      setIsFabVisible(true)
    }
  }

  return (
    <View style={styles.viewContainer}>
      <SectionList
        progressViewOffset={(StatusBar.currentHeight ?? 50) + screenHeight / 3}
        refreshing={isLoading}
        onScroll={hideFab}
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

      <Fab
        isVisible={isFabVisible}
        callback={scrollToTop}
        materialCommunityIconsName="arrow-collapse-up"
      />
    </View>
  )
}

export default VideoListScreen

const styles = StyleSheet.create({
  contentContainer: {
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
