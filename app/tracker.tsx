import { StatusBar } from "expo-status-bar"
import { useState } from "react"
import { router } from "expo-router"
import { Modal, Pressable } from "react-native"
import {
  YStack,
  XStack,
  Button,
  Card,
  H1,
  H2,
  H3,
  Paragraph,
  Text,
  ScrollView,
} from "tamagui"

export default function TrackerScreen() {
  const [waterCount, setWaterCount] = useState(0)
  const [selectedAmount, setSelectedAmount] = useState(1)
  const [dropdownVisible, setDropdownVisible] = useState(false)

  const addWater = (amount: number) => {
    setWaterCount(prev => prev + amount)
  }

  const resetWater = () => {
    setWaterCount(0)
  }

  const goBack = () => {
    router.back()
  }

  const handleAddWater = () => {
    addWater(selectedAmount)
  }

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible)
  }

  const selectAmount = (amount: number) => {
    setSelectedAmount(amount)
    setDropdownVisible(false)
  }

  return (
    <YStack
      flex={1}
      backgroundColor="$background"
      padding="$4"
      paddingTop={60}
      gap="$4"
    >
      {/* Header */}
      <XStack
        alignItems="center"
        justifyContent="space-between"
        marginBottom="$2"
      >
        <Button
          size="$3"
          variant="outlined"
          borderColor="$gray8"
          color="$gray11"
          onPress={goBack}
          borderRadius="$6"
          fontFamily="$button"
        >
          <Text>← Back</Text>
        </Button>
        <H2 color="$color" fontFamily="$heading" letterSpacing="$2">
          Water Tracker
        </H2>
        <Button
          size="$3"
          variant="outlined"
          borderColor="$red8"
          color="$red10"
          onPress={resetWater}
          borderRadius="$6"
          fontFamily="$button"
        >
          <Text>Reset</Text>
        </Button>
      </XStack>

      {/* Water Count Card */}
      <Card
        elevate
        size="$4"
        bordered
        animation="bouncy"
        padding="$4"
        borderRadius="$6"
        backgroundColor="$blue2"
        borderColor="$blue6"
        flex={1}
      >
        <Card.Header
          alignItems="center"
          justifyContent="center"
          flex={1}
          gap="$3"
          paddingVertical="$4"
        >
          <H1
            color="$blue11"
            fontFamily="$heading"
            letterSpacing="0"
            fontSize="$12"
            textAlign="center"
            padding="$0"
            paddingTop="$8"
            margin="$0"
          >
            💧
          </H1>
          <H3
            color="$blue11"
            fontFamily="$heading"
            letterSpacing="$2"
            textAlign="center"
          >
            Total Water Consumption
          </H3>
          <H1
            color="$blue12"
            fontFamily="$heading"
            letterSpacing="$2"
            fontSize="$10"
            textAlign="center"
            paddingTop="$4"
          >
            {waterCount} oz
          </H1>
          <Paragraph
            color="$blue10"
            textAlign="center"
            fontFamily="$body"
            letterSpacing="$1"
            fontSize="$3"
            maxWidth="90%"
            lineHeight="$4"
          >
            Stay hydrated! Add water by selecting the amount below.
          </Paragraph>
        </Card.Header>
      </Card>

      {/* Water Add Interface */}
      <Card elevate size="$4" bordered padding="$4" borderRadius="$6">
        <Card.Header alignItems="center" marginBottom="$3">
          <H3 color="$color" fontFamily="$heading" letterSpacing="$2">
            Add Water (oz)
          </H3>
          <Paragraph
            color="$color"
            opacity={0.7}
            textAlign="center"
            fontFamily="$body"
          >
            Select amount and tap + to add to your total
          </Paragraph>
        </Card.Header>

        <XStack gap="$3" alignItems="flex-end">
          <YStack flex={1}>
            <Text
              fontSize="$4"
              color="$color"
              fontFamily="$body"
              fontWeight="500"
              marginBottom="$2"
            >
              Amount (oz)
            </Text>

            {/* Dropdown Trigger - Full Width */}
            <Button
              size="$6"
              backgroundColor="$background"
              borderColor="$borderColor"
              borderWidth={1}
              color="$color"
              onPress={toggleDropdown}
              borderRadius="$6"
              fontFamily="$body"
              width="100%"
            >
              <Text>{selectedAmount} oz ▼</Text>
            </Button>

            {/* Dropdown Modal */}
            <Modal
              visible={dropdownVisible}
              transparent={true}
              animationType="fade"
              onRequestClose={() => setDropdownVisible(false)}
            >
              <Pressable
                style={{
                  flex: 1,
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => setDropdownVisible(false)}
              >
                <Pressable
                  style={{
                    backgroundColor: "#1a1b42",
                    borderRadius: 12,
                    maxHeight: 300,
                    width: 200,
                    borderWidth: 1,
                    borderColor: "#374151",
                  }}
                >
                  <ScrollView showsVerticalScrollIndicator={true}>
                    {Array.from({ length: 34 }, (_, i) => i + 1).map(amount => (
                      <Pressable
                        key={amount}
                        onPress={() => selectAmount(amount)}
                        style={{
                          padding: 12,
                          borderBottomWidth: 1,
                          borderBottomColor: "#374151",
                          backgroundColor:
                            selectedAmount === amount
                              ? "#515e9b"
                              : "transparent",
                        }}
                      >
                        <Text
                          textAlign="center"
                          fontSize="$4"
                          color={
                            selectedAmount === amount ? "$background" : "$color"
                          }
                          fontFamily="$body"
                        >
                          {amount} oz
                        </Text>
                      </Pressable>
                    ))}
                  </ScrollView>
                </Pressable>
              </Pressable>
            </Modal>
          </YStack>

          <Button
            size="$6"
            backgroundColor="$blue9"
            color="$background"
            hoverStyle={{ backgroundColor: "$blue8" }}
            pressStyle={{ backgroundColor: "$blue10" }}
            onPress={handleAddWater}
            borderRadius="$6"
            fontFamily="$button"
            fontSize="$6"
            fontWeight="bold"
            width={80}
          >
            <Text>+</Text>
          </Button>
        </XStack>
      </Card>

      <StatusBar style="auto" />
    </YStack>
  )
}
