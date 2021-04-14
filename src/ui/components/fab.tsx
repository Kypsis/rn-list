import React, { memo, useRef, useEffect, useCallback } from "react"
import { Animated, Easing, StyleSheet } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

import { color, duration, radius } from "../../theme"

const Fab: React.FC<{
  materialCommunityIconsName: string
  callback(): void
  isVisible: boolean
}> = ({ callback, materialCommunityIconsName, isVisible }) => {
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
    console.log(isVisible)
    fade(isVisible)
  }, [isVisible])

  return (
    <Animated.View style={{ ...styles.fabContainer, opacity: animation }}>
      <TouchableOpacity onPress={callback} style={styles.fab}>
        <Icon name={materialCommunityIconsName} size={24} color={color.iconPrimary} />
      </TouchableOpacity>
    </Animated.View>
  )
}

export default memo(Fab)

const styles = StyleSheet.create({
  fab: {
    alignItems: "center",
    backgroundColor: color.buttonSecondary,
    borderRadius: radius.huge,
    height: 48,
    justifyContent: "center",
    width: 48,
  },

  fabContainer: {
    alignSelf: "center",
    bottom: 16,
    position: "absolute",
  },
})
