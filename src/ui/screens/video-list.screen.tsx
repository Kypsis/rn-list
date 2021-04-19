import React, { useState, useContext, useRef } from "react"
import {
  StyleSheet,
  View,
  StatusBar,
  SectionList,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ViewToken,
  Text,
} from "react-native"
import ActionSheet from "react-native-actions-sheet"
import Picker from "@gregfrench/react-native-wheel-picker"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import sectionListGetItemLayout from "react-native-section-list-get-item-layout"

import Fab from "../components/fab"
import Chip from "../components/chip"
import Button from "../components/button"
import VideoCard from "../components/video-card"
import { DataModel, VideoModel } from "../../data/models/video.model"
import { H1, H2, H4, color, spacing, radius } from "../../theme"
import { VideoDataContext } from "../../data/services/video-data"

const VideoListScreen = () => {
  const insets = useSafeAreaInsets()
  const listRef = useRef(null)
  const actionSheetRef = useRef(null)
  const [dateIndex, setDateIndex] = useState(0)
  const { data, isError, isLoading, fetchData } = useContext(VideoDataContext)

  const [currentDate, setCurrentDate] = useState("")
  const [isFabVisible, setIsFabVisible] = useState(false)

  const screenHeight = Dimensions.get("window").height

  function updateCurrentDate({ viewableItems }: { viewableItems: Array<ViewToken> }) {
    if (viewableItems?.length) {
      const firstItem = viewableItems[0]
      const titleIndex = data.findIndex((item) => item.title === firstItem.section.title)
      if (firstItem?.section) {
        setDateIndex(titleIndex)
        setCurrentDate(firstItem.section.title)
      } else {
        setCurrentDate(null)
      }
    } else {
      setCurrentDate(null)
    }
  }

  const getItemLayout = sectionListGetItemLayout({
    getItemHeight: () => 236,
    getSectionHeaderHeight: () => 48 + spacing.m * 2, // Height + bottom and top margins
  })

  const scrollToTop = () =>
    listRef.current.scrollToLocation({ animated: true, itemIndex: 0, sectionIndex: 0 })

  const scrollToIndex = (index: number) => {
    listRef.current.scrollToLocation({
      itemIndex: 0,
      animated: true,
      viewOffset: 0,
      sectionIndex: index,
    })
    listRef.current.recordInteraction()
  }

  const hideFab = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollOffset = event.nativeEvent.contentOffset.y

    if (scrollOffset <= screenHeight) {
      setIsFabVisible(false)
    } else {
      setIsFabVisible(true)
    }
  }

  return !isError ? (
    <View style={styles.viewContainer}>
      {currentDate ? (
        <View style={styles.dateContainer}>
          <Chip
            title={currentDate?.toUpperCase()}
            height={32}
            textStyle={H4}
            paddingVertical={0}
            paddingHorizontal={spacing.xs}
            borderRadius={radius.medium}
            backgroundColor={color.chipPrimary}
          />
        </View>
      ) : null}

      <ActionSheet
        bounceOnOpen
        elevation={3}
        gestureEnabled
        springOffset={30}
        headerAlwaysVisible
        ref={actionSheetRef}
        containerStyle={styles.actionSheet}
      >
        <Picker
          style={styles.picker}
          lineColor={"#fe9b01"} // Shows wrong colors if rgba
          itemStyle={styles.pickerItem}
          onValueChange={setDateIndex}
          selectedValue={dateIndex}
        >
          {data.map((value: VideoModel, index: number) => (
            <Picker.Item label={value.title} value={index} key={index} />
          ))}
        </Picker>
        <View style={styles.buttonContainer}>
          <Button
            width={240}
            title="Select date"
            callback={() => {
              actionSheetRef.current?.hide()
              scrollToIndex(dateIndex)
            }}
          />
        </View>
      </ActionSheet>

      <SectionList
        ref={listRef}
        sections={data}
        onScroll={hideFab}
        onRefresh={fetchData}
        refreshing={isLoading}
        stickySectionHeadersEnabled={false}
        getItemLayout={getItemLayout as any}
        onViewableItemsChanged={updateCurrentDate}
        keyExtractor={(item: DataModel, index: number) => item.dateTime + index}
        contentContainerStyle={{
          ...styles.contentContainer,
          paddingBottom: insets.bottom + spacing.l,
        }}
        progressViewOffset={(StatusBar.currentHeight ?? 50) + screenHeight / 3}
        renderItem={({ item }) => <VideoCard cardData={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.headerContainer}>
            <Chip
              title={title.toUpperCase()}
              height={48}
              textStyle={H4}
              paddingVertical={0}
              borderRadius={radius.medium}
              backgroundColor={color.transparent}
            />
          </View>
        )}
      />

      <View style={styles.scrollFabContainer}>
        <Fab
          margin={spacing.xs}
          callback={scrollToTop}
          isVisible={isFabVisible}
          materialCommunityIconsName="arrow-collapse-up"
        />
      </View>

      <View style={styles.pickerFabContainer}>
        {data && (
          <Fab
            callback={() => actionSheetRef.current?.show()}
            iconColor={color.iconSecondary}
            backgroundColor={color.buttonPrimary}
            materialCommunityIconsName="calendar-search"
          />
        )}
      </View>
    </View>
  ) : (
    <View style={styles.errorContainer}>
      <Text style={H1}>Something went wrong</Text>
    </View>
  )
}

export default VideoListScreen

const width = Dimensions.get("window").width - spacing.m * 2

const styles = StyleSheet.create({
  actionSheet: {
    alignItems: "center",
    backgroundColor: color.actionSheet,
    justifyContent: "center",
    paddingTop: spacing.xxs,
  },

  buttonContainer: {
    marginBottom: spacing.xl,
    marginTop: spacing.l,
  },

  contentContainer: {
    marginHorizontal: spacing.m,
    paddingTop: (StatusBar.currentHeight ?? 50) - spacing.m,
  },

  dateContainer: {
    alignItems: "center",
    elevation: 3,
    left: 0,
    position: "absolute",
    right: 0,
    top: (StatusBar.currentHeight ?? 50) + spacing.xs,
    zIndex: 3,
  },

  errorContainer: {
    alignItems: "center",
    backgroundColor: color.background,
    flex: 1,
    justifyContent: "center",
    padding: spacing.xl,
  },

  headerContainer: {
    alignItems: "center",
    marginVertical: spacing.m,
  },

  picker: {
    height: 260,
    marginTop: spacing.m,
    width: width,
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

  viewContainer: {
    backgroundColor: color.background,
    flex: 1,
  },
})
