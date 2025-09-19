import React from "react"
import { YStack, Text, Button } from "tamagui"

export function TestComponent() {
  return (
    <YStack padding="$4" gap="$3" alignItems="center">
      <Text fontSize="$5" color="$blue10">
        Tamagui Test Component
      </Text>
      <Button
        size="$3"
        backgroundColor="$green9"
        color="$white1"
        onPress={() => alert("Tamagui is working!")}
      >
        Test Button
      </Button>
    </YStack>
  )
}
