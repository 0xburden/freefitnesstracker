import { StatusBar } from "expo-status-bar"
import { useState } from "react"
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
import {
  YStack,
  XStack,
  Text,
  Button,
  Input,
  Card,
  H1,
  H3,
  Paragraph,
  Separator,
} from "tamagui"
import config from "./tamagui.config"
import { FreeFTLogo } from "./components"

export default function App() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoginMode, setIsLoginMode] = useState(true)

  // Load Space Grotesk fonts
  const [fontsLoaded] = useFonts({
    SpaceGrotesk_300Light,
    SpaceGrotesk_400Regular,
    SpaceGrotesk_500Medium,
    SpaceGrotesk_600SemiBold,
    SpaceGrotesk_700Bold,
  })

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync()
    }
    prepare()
  }, [])

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null
  }

  const handleLogin = () => {
    // Handle login logic here
    console.log("Login:", { email, password })
  }

  const handleSignup = () => {
    // Handle signup logic here
    console.log("Signup:", { email, password })
  }

  return (
    <TamaguiProvider config={config} defaultTheme="dark">
      <YStack
        flex={1}
        backgroundColor="$background"
        alignItems="center"
        justifyContent="center"
        padding="$4"
        paddingTop={40}
        gap="$6"
      >
        {/* App Icon/Logo */}
        <YStack alignItems="center" gap="$3">
          <FreeFTLogo size={100} />
          <H1
            color="$color"
            textAlign="center"
            fontFamily="$heading"
            letterSpacing="$2"
          >
            Free Fitness Tracker
          </H1>
          <Paragraph
            color="$color"
            opacity={0.8}
            textAlign="center"
            maxWidth={300}
            fontFamily="$body"
            letterSpacing="$1"
          >
            Track your fitness journey with ease. Stay motivated, stay healthy.
          </Paragraph>
        </YStack>

        {/* Login Card */}
        <Card
          elevate
          size="$4"
          bordered
          animation="bouncy"
          width={350}
          maxWidth="90%"
          padding="$4"
          borderRadius="$6"
        >
          <Card.Header alignItems="center" gap="$2">
            <H3 color="$color" fontFamily="$heading" letterSpacing="$2">
              {isLoginMode ? "Welcome Back" : "Join Us Today"}
            </H3>
            <Paragraph
              color="$color"
              opacity={0.7}
              fontSize="$3"
              fontFamily="$body"
              letterSpacing="$1"
            >
              {isLoginMode ? "Sign in to continue" : "Create your account"}
            </Paragraph>
          </Card.Header>

          <YStack gap="$3" padding="$2">
            <YStack gap="$2">
              <Text
                fontSize="$3"
                fontWeight="500"
                color="$color"
                fontFamily="$body"
                letterSpacing="$1"
              >
                Email
              </Text>
              <Input
                size="$4"
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                fontFamily="$input"
                borderRadius="$6"
              />
            </YStack>

            <YStack gap="$2">
              <Text
                fontSize="$3"
                fontWeight="500"
                color="$color"
                fontFamily="$body"
                letterSpacing="$1"
              >
                Password
              </Text>
              <Input
                size="$4"
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                fontFamily="$input"
                borderRadius="$6"
              />
            </YStack>

            <Button
              size="$4"
              backgroundColor="$orange10"
              color="$background"
              hoverStyle={{ backgroundColor: "$orange9" }}
              pressStyle={{ backgroundColor: "$orange11" }}
              onPress={isLoginMode ? handleLogin : handleSignup}
              marginTop="$2"
              fontFamily="$button"
              letterSpacing="$2"
              borderRadius="$6"
            >
              {isLoginMode ? "Sign In" : "Create Account"}
            </Button>

            <XStack alignItems="center" gap="$3" marginVertical="$2">
              <Separator flex={1} borderColor="$borderColor" />
              <Text
                fontSize="$2"
                color="$color"
                opacity={0.6}
                fontFamily="$body"
                letterSpacing="$3"
              >
                OR
              </Text>
              <Separator flex={1} borderColor="$borderColor" />
            </XStack>

            <Button
              size="$4"
              variant="outlined"
              borderColor="$purple8"
              color="$purple10"
              hoverStyle={{
                backgroundColor: "$purple2",
                borderColor: "$purple9",
              }}
              pressStyle={{ backgroundColor: "$purple3" }}
              onPress={() => setIsLoginMode(!isLoginMode)}
              fontFamily="$button"
              letterSpacing="$1"
              borderRadius="$6"
            >
              {isLoginMode ? "Create New Account" : "Already have an account?"}
            </Button>
          </YStack>
        </Card>

        <StatusBar style="auto" />
      </YStack>
    </TamaguiProvider>
  )
}
