import React from "react"
import { StatusBar } from "react-native"
import { NavigationContainer, DarkTheme } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"

import VideoScreen from "./screens/video.screen"
import VideoListScreen from "./screens/video-list.screen"
import VideoDataProvider from "../data/services/video-data"

const Stack = createStackNavigator()

const App = () => {
  return (
    <VideoDataProvider>
      <NavigationContainer
        theme={{
          dark: false,
          colors: {
            ...DarkTheme.colors,
            background: "#000",
            card: "#000",
          },
        }}
      >
        <StatusBar barStyle={"light-content"} backgroundColor="transparent" translucent />
        <Stack.Navigator initialRouteName="VideoList">
          <Stack.Screen
            name="VideoList"
            component={VideoListScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen name="Video" component={VideoScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </VideoDataProvider>
  )
}

export default App
