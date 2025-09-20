import React from "react"
import { View } from "react-native"
import Svg, {
  Circle,
  Text as SvgText,
  Defs,
  RadialGradient,
  Stop,
} from "react-native-svg"
import { useTheme } from "@tamagui/core"

/**
 * FreeFitnessTracker Logo Component
 *
 * A circular SVG logo with "Free", "Fitness", "Tracker" text stacked vertically in bold monospace font.
 * Clean design with no outer stroke and bold dark purple text.
 * Integrates with Tamagui theming system for consistent colors.
 *
 * @param size - Logo diameter in pixels (default: 80)
 * @param circleColor - Background circle color (defaults to theme purple10)
 * @param textColor - Text color (defaults to theme dark purple)
 */
export interface FreeFTLogoProps {
  /** Logo size in pixels */
  size?: number
  /** Background circle color - overrides theme color */
  circleColor?: string
  /** Text color - overrides theme color */
  textColor?: string
}

export const FreeFTLogo: React.FC<FreeFTLogoProps> = ({
  size = 80,
  circleColor,
  textColor,
}) => {
  const theme = useTheme()

  // Use provided colors or fall back to theme colors with final fallbacks
  const finalCircleColor = circleColor || theme.purple10?.val || "#8b5cf6"
  const finalTextColor = textColor || theme.purple8?.val || "#59478d"

  // Calculate responsive font size for text
  const fontSize = Math.max(6, size * 0.12)

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size} viewBox="0 0 100 100">
        {/* Gradient definitions */}
        <Defs>
          <RadialGradient id="backgroundGradient" cx="50%" cy="50%" r="50%">
            <Stop offset="0%" stopColor="#fefefe" />
            <Stop offset="50%" stopColor="#f8b4d9" />
            <Stop offset="100%" stopColor={finalCircleColor} />
          </RadialGradient>
        </Defs>

        {/* Outer glow circles */}
        <Circle cx="50" cy="50" r="52" fill="rgba(255, 255, 255, 0.08)" />
        <Circle cx="50" cy="50" r="50" fill="rgba(255, 255, 255, 0.12)" />

        {/* Main circle background */}
        <Circle cx="50" cy="50" r="48" fill="url(#backgroundGradient)" />

        {/* Stacked Text: Free, Fitness, Tracker */}
        <SvgText
          x="50"
          y="42"
          fontSize={fontSize}
          fontFamily="monospace"
          fontWeight="bold"
          fill={finalTextColor}
          textAnchor="middle"
        >
          Free
        </SvgText>
        <SvgText
          x="50"
          y="55"
          fontSize={fontSize}
          fontFamily="monospace"
          fontWeight="bold"
          fill={finalTextColor}
          textAnchor="middle"
        >
          Fitness
        </SvgText>
        <SvgText
          x="50"
          y="68"
          fontSize={fontSize}
          fontFamily="monospace"
          fontWeight="bold"
          fill={finalTextColor}
          textAnchor="middle"
        >
          Tracker
        </SvgText>
      </Svg>
    </View>
  )
}

export default FreeFTLogo
