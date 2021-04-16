import React, { useRef, useEffect, useCallback } from "react"
import { Animated, Easing, StyleSheet, TouchableOpacity } from "react-native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

import { color, duration, radius, spacing } from "../../theme"

interface FabProps {
  width?: number
  height?: number
  margin?: number
  iconSize?: number
  iconColor?: string
  isVisible?: boolean
  borderRadius?: number
  backgroundColor?: string
  materialCommunityIconsName?: string
  callback(): void
}

const Fab: React.FC<FabProps> = ({
  width,
  height,
  margin = spacing.m,
  iconSize = 24,
  iconColor = color.iconPrimary,
  isVisible = true,
  borderRadius = radius.huge,
  backgroundColor = color.buttonSecondary,
  materialCommunityIconsName = "plus",
  callback,
}) => {
  const animation = useRef(new Animated.Value(0)).current

  const fade = useCallback(
    (isVisible: boolean): void => {
      Animated.timing(animation, {
        toValue: isVisible ? 1 : 0,
        duration: duration.fast,
        easing: Easing.inOut(Easing.circle),
        useNativeDriver: true,
      }).start()
    },
    [isVisible],
  )

  useEffect(() => {
    fade(isVisible)
  }, [isVisible])

  return (
    <Animated.View style={{ opacity: animation }}>
      <TouchableOpacity
        onPress={callback}
        style={{ ...styles.fab, height, width, backgroundColor, borderRadius }}
      >
        <Icon
          name={materialCommunityIconsName}
          size={iconSize}
          color={iconColor}
          style={{ margin }}
        />
      </TouchableOpacity>
    </Animated.View>
  )
}

export default Fab

const styles = StyleSheet.create({
  fab: {
    alignItems: "center",
    justifyContent: "center",
  },
})
