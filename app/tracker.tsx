import { StatusBar } from "expo-status-bar"
import { useState, useEffect } from "react"
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
  const [lastResetDate, setLastResetDate] = useState<string | null>(null)

  // Tab state
  const [activeTab, setActiveTab] = useState<"hydration" | "fasting">(
    "hydration"
  )

  // Simple fasting timer state
  const [fastingGoal, setFastingGoal] = useState(12) // hours
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [timerStartTime, setTimerStartTime] = useState<Date | null>(null)
  const [currentTime, setCurrentTime] = useState(new Date())

  // Previous fast tracking
  const [previousFast, setPreviousFast] = useState<{
    duration: string
    date: string
    goalHours: number
    completedEarly: boolean
  } | null>(null)

  // Early stop modal state
  const [showEarlyStopModal, setShowEarlyStopModal] = useState(false)

  // Helper function to get current date as string (YYYY-MM-DD)
  const getCurrentDateString = () => {
    const now = new Date()
    return now.getFullYear() + '-' + 
           String(now.getMonth() + 1).padStart(2, '0') + '-' + 
           String(now.getDate()).padStart(2, '0')
  }

  // Daily reset effect - check if it's a new day and reset water count
  useEffect(() => {
    const currentDate = getCurrentDateString()
    
    if (lastResetDate === null) {
      // First time loading, set current date
      setLastResetDate(currentDate)
    } else if (lastResetDate !== currentDate) {
      // It's a new day, reset water count
      setWaterCount(0)
      setLastResetDate(currentDate)
    }
  }, [lastResetDate])

  // Check for date change every minute
  useEffect(() => {
    const interval = setInterval(() => {
      const currentDate = getCurrentDateString()
      if (lastResetDate && lastResetDate !== currentDate) {
        setWaterCount(0)
        setLastResetDate(currentDate)
      }
    }, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [lastResetDate])

  // Timer update effect
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null
    if (isTimerRunning) {
      interval = setInterval(() => {
        setCurrentTime(new Date())
      }, 1000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isTimerRunning])

  // Auto-stop timer when countdown reaches zero
  useEffect(() => {
    if (isTimerRunning && timerStartTime) {
      const { hours, minutes, seconds } = getRemainingTime()
      if (hours === 0 && minutes === 0 && seconds === 0) {
        setIsTimerRunning(false)
      }
    }
  }, [isTimerRunning, currentTime, timerStartTime, fastingGoal])

  // Simple timer functions
  const startFastingTimer = () => {
    const now = new Date()
    setTimerStartTime(now)
    // Set current time 1 second ahead to show -1s immediately
    setCurrentTime(new Date(now.getTime() + 1000))
    setIsTimerRunning(true)
  }

  const stopFastingTimer = () => {
    // Check if the fast is being ended early
    if (isTimerRunning && timerStartTime) {
      const { hours, minutes, seconds } = getRemainingTime()
      // If there's still time remaining, show confirmation modal
      if (hours > 0 || minutes > 0 || seconds > 0) {
        setShowEarlyStopModal(true)
        return
      }
    }
    // If no time remaining or timer not running, end normally
    endFast()
  }

  const endFast = () => {
    if (timerStartTime) {
      const endTime = new Date()
      const durationMs = endTime.getTime() - timerStartTime.getTime()
      const hours = Math.floor(durationMs / (1000 * 60 * 60))
      const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60))
      const durationText = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`

      // Save to previous fast
      setPreviousFast({
        duration: durationText,
        date: endTime.toLocaleDateString(),
        goalHours: fastingGoal,
        completedEarly: hours < fastingGoal,
      })
    }
    setIsTimerRunning(false)
    setTimerStartTime(null)
    setShowEarlyStopModal(false)
  }

  const cancelEarlyStop = () => {
    setShowEarlyStopModal(false)
  }

  const formatTime = (hours: number, minutes: number, seconds: number) => {
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  const formatTimeAmPm = (date: Date) => {
    let hours = date.getHours()
    const minutes = date.getMinutes()
    const ampm = hours >= 12 ? "pm" : "am"
    hours = hours % 12
    hours = hours ? hours : 12 // the hour '0' should be '12'
    const hoursStr = hours.toString().padStart(2, "0")
    const minutesStr = minutes.toString().padStart(2, "0")
    return `${hoursStr}:${minutesStr} ${ampm}`
  }

  const getRemainingTime = () => {
    if (!isTimerRunning || !timerStartTime) {
      // When not running, show the full goal time
      return { hours: fastingGoal, minutes: 0, seconds: 0 }
    }

    // Calculate how much time has passed
    const now = currentTime.getTime()
    const start = timerStartTime.getTime()
    const elapsedMs = now - start

    // Calculate total goal time in milliseconds
    const goalMs = fastingGoal * 60 * 60 * 1000

    // Calculate remaining time (COUNTDOWN)
    const remainingMs = Math.max(0, goalMs - elapsedMs)

    // Convert back to hours, minutes, and seconds
    const remainingSeconds = Math.floor(remainingMs / 1000)
    const hours = Math.floor(remainingSeconds / 3600)
    const minutes = Math.floor((remainingSeconds % 3600) / 60)
    const seconds = remainingSeconds % 60

    return { hours, minutes, seconds }
  }

  const getStartTime = () => {
    if (!timerStartTime) return null
    return formatTimeAmPm(timerStartTime)
  }

  const getEndTime = () => {
    if (!timerStartTime) return null
    const endTime = new Date(
      timerStartTime.getTime() + fastingGoal * 60 * 60 * 1000
    )
    return formatTimeAmPm(endTime)
  }

  const addWater = (amount: number) => {
    setWaterCount(prev => prev + amount)
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
          Fitness Tracker
        </H2>
        {/* Empty space to maintain center alignment */}
        <YStack width={60} />
      </XStack>

      {/* Tab Navigation */}
      <XStack gap="$2" marginBottom="$4">
        <Button
          flex={1}
          size="$4"
          variant="outlined"
          backgroundColor={activeTab === "hydration" ? "$blue9" : "transparent"}
          borderColor={activeTab === "hydration" ? "$blue9" : "$gray8"}
          color={activeTab === "hydration" ? "$background" : "$color"}
          onPress={() => setActiveTab("hydration")}
          borderRadius="$6"
          fontFamily="$button"
          fontWeight="600"
        >
          <Text>💧 Hydration</Text>
        </Button>
        <Button
          flex={1}
          size="$4"
          variant="outlined"
          backgroundColor={activeTab === "fasting" ? "$orange9" : "transparent"}
          borderColor={activeTab === "fasting" ? "$orange9" : "$gray8"}
          color={activeTab === "fasting" ? "$background" : "$color"}
          onPress={() => setActiveTab("fasting")}
          borderRadius="$6"
          fontFamily="$button"
          fontWeight="600"
        >
          <Text>🕐 Fasting</Text>
        </Button>
      </XStack>

      {/* Tab Content */}
      <ScrollView flex={1} showsVerticalScrollIndicator={false}>
        {activeTab === "hydration" && (
          /* Hydration Tab - Water Tracking */
          <YStack gap="$4">
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
                          {Array.from({ length: 34 }, (_, i) => i + 1).map(
                            amount => (
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
                                    selectedAmount === amount
                                      ? "$background"
                                      : "$color"
                                  }
                                  fontFamily="$body"
                                >
                                  {amount} oz
                                </Text>
                              </Pressable>
                            )
                          )}
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
          </YStack>
        )}

        {activeTab === "fasting" && (
          <YStack gap="$4">
            {/* Simple Fasting Timer Card */}
            <Card elevate size="$4" bordered padding="$4" borderRadius="$6">
              <Card.Header alignItems="center" gap="$3">
                <H3 color="$color" fontFamily="$heading" letterSpacing="$2">
                  🕐 Fasting Timer
                </H3>

                {/* Goal Selection */}
                <XStack gap="$2">
                  {[12, 14, 16].map(hours => (
                    <Button
                      key={hours}
                      size="$3"
                      variant="outlined"
                      backgroundColor={
                        fastingGoal === hours ? "$orange9" : "transparent"
                      }
                      borderColor="$orange8"
                      color={
                        fastingGoal === hours ? "$background" : "$orange11"
                      }
                      onPress={() => !isTimerRunning && setFastingGoal(hours)}
                      borderRadius="$6"
                      fontFamily="$button"
                    >
                      <Text>{hours}h</Text>
                    </Button>
                  ))}
                </XStack>

                {/* Timer Display */}
                <Text
                  fontSize="$6"
                  color="$orange11"
                  fontFamily="$heading"
                  fontWeight="600"
                  textAlign="center"
                >
                  {(() => {
                    const { hours, minutes, seconds } = getRemainingTime()
                    return formatTime(hours, minutes, seconds)
                  })()}
                </Text>

                {/* Start/Stop Button */}
                <Button
                  size="$4"
                  backgroundColor={isTimerRunning ? "$red9" : "$green9"}
                  color="$background"
                  onPress={
                    isTimerRunning ? stopFastingTimer : startFastingTimer
                  }
                  borderRadius="$6"
                  fontFamily="$button"
                  fontWeight="bold"
                >
                  <Text>{isTimerRunning ? "End Fast" : "Start Fast"}</Text>
                </Button>

                {/* Start and End Time Display */}
                {timerStartTime && (
                  <YStack alignItems="center" gap="$1" marginTop="$3">
                    <XStack gap="$4" alignItems="center">
                      <YStack alignItems="center">
                        <Text
                          fontSize="$2"
                          color="$orange10"
                          fontFamily="$body"
                          fontWeight="500"
                          textAlign="center"
                        >
                          Started
                        </Text>
                        <Text
                          fontSize="$3"
                          color="$orange11"
                          fontFamily="$body"
                          fontWeight="600"
                          textAlign="center"
                        >
                          {getStartTime()}
                        </Text>
                      </YStack>

                      <Text fontSize="$4" color="$orange8" fontFamily="$body">
                        →
                      </Text>

                      <YStack alignItems="center">
                        <Text
                          fontSize="$2"
                          color="$orange10"
                          fontFamily="$body"
                          fontWeight="500"
                          textAlign="center"
                        >
                          Ends at
                        </Text>
                        <Text
                          fontSize="$3"
                          color="$orange11"
                          fontFamily="$body"
                          fontWeight="600"
                          textAlign="center"
                        >
                          {getEndTime()}
                        </Text>
                      </YStack>
                    </XStack>
                  </YStack>
                )}
              </Card.Header>
            </Card>

            {/* Previous Fast Card */}
            {previousFast && (
              <Card elevate size="$4" bordered padding="$4" borderRadius="$6">
                <Card.Header alignItems="center" gap="$2">
                  <H3 color="$gray11" fontFamily="$heading" letterSpacing="$2">
                    📊 Previous Fast
                  </H3>

                  {/* Emphasized Duration */}
                  <H1
                    color="$gray12"
                    fontFamily="$heading"
                    fontSize="$8"
                    fontWeight="bold"
                    textAlign="center"
                  >
                    {previousFast.duration}
                  </H1>

                  {/* Status and Date */}
                  <Text
                    fontSize="$3"
                    color={
                      previousFast.completedEarly ? "$orange10" : "$green10"
                    }
                    fontFamily="$body"
                    fontWeight="600"
                    textAlign="center"
                  >
                    {previousFast.completedEarly
                      ? `Ended early (Goal: ${previousFast.goalHours}h)`
                      : "Goal completed! 🎉"}
                  </Text>

                  <Text
                    fontSize="$2"
                    color="$gray10"
                    fontFamily="$body"
                    textAlign="center"
                  >
                    {previousFast.date}
                  </Text>
                </Card.Header>
              </Card>
            )}
          </YStack>
        )}
      </ScrollView>

      {/* Early Stop Confirmation Modal */}
      <Modal
        visible={showEarlyStopModal}
        transparent={true}
        animationType="fade"
        onRequestClose={cancelEarlyStop}
      >
        <Pressable
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={cancelEarlyStop}
        >
          <Pressable
            style={{
              backgroundColor: "#1a1b42",
              borderRadius: 16,
              padding: 24,
              width: 320,
              maxWidth: "90%",
              borderWidth: 1,
              borderColor: "#374151",
            }}
          >
            <YStack gap="$4" alignItems="center">
              {/* Modal Title */}
              <Text
                fontSize="$6"
                fontWeight="bold"
                color="$orange11"
                textAlign="center"
                fontFamily="$heading"
              >
                You're so close!
              </Text>

              {/* Modal Message */}
              <Text
                fontSize="$4"
                color="$color"
                textAlign="center"
                fontFamily="$body"
                opacity={0.9}
              >
                Are you sure you want to stop now?
              </Text>

              {/* Buttons */}
              <XStack gap="$3" width="100%">
                <Button
                  flex={1}
                  size="$4"
                  variant="outlined"
                  borderColor="$gray8"
                  color="$color"
                  onPress={cancelEarlyStop}
                  borderRadius="$6"
                  fontFamily="$button"
                  backgroundColor="transparent"
                >
                  <Text>Cancel</Text>
                </Button>

                <Button
                  flex={1}
                  size="$4"
                  backgroundColor="$red9"
                  color="$background"
                  onPress={endFast}
                  borderRadius="$6"
                  fontFamily="$button"
                  hoverStyle={{ backgroundColor: "$red8" }}
                  pressStyle={{ backgroundColor: "$red10" }}
                >
                  <Text>End Fast</Text>
                </Button>
              </XStack>
            </YStack>
          </Pressable>
        </Pressable>
      </Modal>

      <StatusBar style="auto" />
    </YStack>
  )
}
