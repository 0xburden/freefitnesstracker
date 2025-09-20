import { Stack } from "expo-router"
import { TamaguiProvider } from "@tamagui/core"
import {
  useFonts,
  SpaceGrotesk_300Light,
  SpaceGrotesk_400Regular,
  SpaceGrotesk_500Medium,
  SpaceGrotesk_600SemiBold,
  SpaceGrotesk_700Bold,
} from "@expo-google-fonts/space-grotesk"
import * as SplashScreen from "expo-splash-screen"
import { useEffect } from "react"
import config from "../tamagui.config"

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    SpaceGrotesk_300Light,
    SpaceGrotesk_400Regular,
    SpaceGrotesk_500Medium,
    SpaceGrotesk_600SemiBold,
    SpaceGrotesk_700Bold,
  })

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null
  }

  return (
    <TamaguiProvider config={config} defaultTheme="dark">
      <Stack>
        <Stack.Screen
          name="index"
          options={{ title: "Login", headerShown: false }}
        />
        <Stack.Screen
          name="tracker"
          options={{ title: "Water Tracker", headerShown: false }}
        />
      </Stack>
    </TamaguiProvider>
  )
}
