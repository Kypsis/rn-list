import React from "react"
import { StatusBar } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"

import VideoScreen from "./screens/video.screen"
import VideoListScreen from "./screens/video-list.screen"

const Stack = createStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar translucent backgroundColor="transparent" barStyle={"light-content"} />
      <Stack.Navigator initialRouteName="VideoList">
        <Stack.Screen
          name="VideoList"
          component={VideoListScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen name="Video" component={VideoScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
