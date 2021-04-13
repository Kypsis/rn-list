import React from "react"
import { StyleSheet, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

import { color, radius } from "../../theme"

const Fab: React.FC<{
  materialCommunityIconsName: string
  callback(): void
}> = ({ callback, materialCommunityIconsName }) => {
  return (
    <View style={styles.fabContainer}>
      <TouchableOpacity onPress={callback} style={styles.fab}>
        <Icon name={materialCommunityIconsName} size={24} color={color.iconPrimary} />
      </TouchableOpacity>
    </View>
  )
}

export default Fab

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
