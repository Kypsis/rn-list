import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { StyleSheet, StatusBar } from "react-native"

import VideoListScreen from "./screens/video-list.screen"
import VideoScreen from "./screens/video.screen"

/* const Section: React.FC<{
  title: string;
}> = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}; */

const Stack = createStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar translucent backgroundColor="transparent" barStyle={"dark-content"} />
      <Stack.Navigator initialRouteName="VideoList">
        <Stack.Screen
          name="VideoList"
          component={VideoListScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Video"
          component={VideoScreen}
          options={{ headerTransparent: true, headerTitle: "" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

/* const styles = StyleSheet.create({
  app: {backgroundColor: 'gainsboro', flex: 1},
}); */

export default App
