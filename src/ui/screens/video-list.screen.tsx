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
import Picker from "@gregfrench/react-native-wheel-picker"

import Fab from "../components/fab"
import Chip from "../components/chip"
import Separator from "../components/separator"
import VideoCard from "../components/video-card"
import { H2, H5, color, spacing, radius } from "../../theme"
import { VideoModel } from "../../data/models/video.model"

const VideoListScreen = () => {
  const listRef = useRef(null)
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isFabVisible, setIsFabVisible] = useState(false)
  const [isPickerVisible, setIsPickerVisible] = useState(false)
  const [currentDate, setCurrentDate] = useState("")
  const [dateIndex, setDateIndex] = useState(0)

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

  const scrollToIndex = (index) =>
    listRef.current.scrollToLocation({ animated: true, itemIndex: 0, sectionIndex: index })

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
      <Modal
        visible={isPickerVisible}
        animationType="slide"
        transparent
        onRequestClose={() => {
          setIsPickerVisible(false)
        }}
      >
        <View style={styles.pickerContainer}>
          <Picker
            style={styles.picker}
            lineColor="#000000" // to set top and bottom line color (Without gradients)
            selectedValue={data.findIndex((item) => item.title === currentDate)}
            itemStyle={styles.pickerItem}
            onValueChange={(index) => setDateIndex(index)}
          >
            {data.map((value, i) => (
              <Picker.Item label={value.title} value={i} key={i} />
            ))}
          </Picker>
          <Fab
            callback={() => {
              setIsPickerVisible(false)
              scrollToIndex(dateIndex)
            }}
          />
        </View>
      </Modal>

      <SectionList
        ref={listRef}
        sections={data}
        onScroll={hideFab}
        onRefresh={fetchData}
        refreshing={isLoading}
        initialScrollIndex={dateIndex}
        onScrollToIndexFailed={(info) => {
          const wait = new Promise((resolve) => setTimeout(resolve, 500))
          wait.then(() => {
            listRef.current?.scrollToIndex({ index: 0, sectionInde: dateIndex, animated: true })
          })
        }}
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

      <View style={styles.scrollFabContainer}>
        <Fab
          callback={scrollToTop}
          isVisible={isFabVisible}
          materialCommunityIconsName="arrow-collapse-up"
        />
      </View>

      <View style={styles.pickerFabContainer}>
        <Fab
          width={56}
          height={56}
          callback={() => setIsPickerVisible(true)}
          iconColor={color.iconSecondary}
          backgroundColor={color.accentWithOpacity}
          materialCommunityIconsName="calendar-search"
        />
      </View>
    </View>
  )
}

export default VideoListScreen

const width = Dimensions.get("window").width - spacing.m * 2

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

  picker: {
    height: 250,
    width: width,
  },

  pickerContainer: {
    alignItems: "center",
    backgroundColor: color.accentWithOpacity,
    flex: 1,
    justifyContent: "center",
  },

  pickerFabContainer: {
    alignSelf: "center",
    bottom: spacing.m,
    position: "absolute",
    right: spacing.l,
  },

  pickerItem: { ...H2 },

  scrollFabContainer: {
    alignSelf: "center",
    bottom: spacing.m,
    position: "absolute",
  },

  viewContainer: { backgroundColor: color.background },
})
