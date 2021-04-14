import React, { useState, useEffect, useRef } from "react"
import {
  StyleSheet,
  View,
  Modal,
  StatusBar,
  SectionList,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ViewToken,
} from "react-native"

import Fab from "../components/fab"
import Chip from "../components/chip"
import Separator from "../components/separator"
import VideoCard from "../components/video-card"
import { H5, color, spacing, radius } from "../../theme"

const VideoListScreen = () => {
  const listRef = useRef(null)
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isFabVisible, setIsFabVisible] = useState(false)
  const [isPickerVisible, setIsPickerVisible] = useState(false)
  const [currentDate, setCurrentDate] = useState("")

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

  function updateCurrentDate({ viewableItems }: { viewableItems: Array<ViewToken> }) {
    if (viewableItems && viewableItems.length) {
      const firstItem = viewableItems[0]
      if (firstItem && firstItem.section) {
        setCurrentDate(firstItem.section.title)
      } else {
        setCurrentDate(null)
      }
    } else {
      setCurrentDate(null)
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
      <Modal visible={isPickerVisible}></Modal>

      <SectionList
        ref={listRef}
        sections={data}
        onScroll={hideFab}
        onRefresh={fetchData}
        refreshing={isLoading}
        stickySectionHeadersEnabled
        ItemSeparatorComponent={Separator}
        onViewableItemsChanged={updateCurrentDate}
        keyExtractor={(item, index) => item + index}
        contentContainerStyle={styles.contentContainer}
        progressViewOffset={(StatusBar.currentHeight ?? 50) + screenHeight / 3}
        renderItem={({ item }) => <VideoCard cardData={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.chipContainer}>
            <Chip
              title={title.toUpperCase()}
              textStyle={H5}
              backgroundColor={color.iconPrimary}
              height={32}
              borderRadius={radius.medium}
            />
          </View>
        )}
      />

      <Fab
        callback={scrollToTop}
        isVisible={isFabVisible}
        materialCommunityIconsName="arrow-collapse-up"
      />
    </View>
  )
}

export default VideoListScreen

const styles = StyleSheet.create({
  chipContainer: {
    alignItems: "center",
    flex: 1,
    marginBottom: spacing.l,
    marginTop: spacing.xl,
  },

  contentContainer: {
    marginHorizontal: spacing.m,
    marginTop: (StatusBar.currentHeight ?? 50) - spacing.l,
  },

  viewContainer: { backgroundColor: color.background },
})
