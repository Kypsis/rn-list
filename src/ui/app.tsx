import React from "react"
import { StatusBar } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack"

import VideoScreen from "./screens/video.screen"
import VideoListScreen from "./screens/video-list.screen"
import VideoDataProvider from "../data/services/video-data"

const Stack = createStackNavigator()

const App = () => {
  return (
    <VideoDataProvider>
      <NavigationContainer>
        <StatusBar barStyle={"light-content"} backgroundColor="transparent" translucent />
        <Stack.Navigator
          initialRouteName="VideoList"
          screenOptions={{
            gestureEnabled: false,
            headerShown: false,
            cardOverlayEnabled: true,

            cardStyle: { backgroundColor: "transparent" },
          }}
          mode="modal"
        >
          <Stack.Screen
            name="VideoList"
            component={VideoListScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Video"
            component={VideoScreen}
            options={{
              headerShown: false,
              ...TransitionPresets.FadeFromBottomAndroid,
              // cardStyleInterpolator: forFade,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </VideoDataProvider>
  )
}

export default App
