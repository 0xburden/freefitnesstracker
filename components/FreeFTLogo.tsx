import React from 'react'
import { View } from 'react-native'
import Svg, { Circle, Path, Defs, RadialGradient, Stop } from 'react-native-svg'
import { useTheme } from '@tamagui/core'

/**
 * FFT Logo Component
 *
 * A circular SVG logo with custom drawn "FFT" text paths.
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
  const finalCircleColor = circleColor || theme.purple10?.val || '#8b5cf6'
  const finalTextColor = textColor || theme.purple8?.val || '#59478d'

  // Calculate bold stroke width for more prominent text
  const strokeWidth = Math.max(2, size * 0.05)

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
        <Circle
          cx="50"
          cy="50"
          r="52"
          fill="rgba(255, 255, 255, 0.08)"
        />
        <Circle
          cx="50"
          cy="50"
          r="50"
          fill="rgba(255, 255, 255, 0.12)"
        />
        
        {/* Main circle background */}
        <Circle
          cx="50"
          cy="50"
          r="48"
          fill="url(#backgroundGradient)"
        />

        {/* FFT Text - Custom drawn paths - smaller and wider */}
        {/* First F */}
        <Path
          d="M25 42 L25 58 M25 42 L35 42 M25 50 L32 50"
          stroke={finalTextColor}
          strokeWidth={strokeWidth}
          strokeLinecap="square"
          strokeLinejoin="miter"
          fill="none"
        />

        {/* Second F */}
        <Path
          d="M40 42 L40 58 M40 42 L50 42 M40 50 L47 50"
          stroke={finalTextColor}
          strokeWidth={strokeWidth}
          strokeLinecap="square"
          strokeLinejoin="miter"
          fill="none"
        />

        {/* T */}
        <Path
          d="M55 42 L75 42 M65 42 L65 58"
          stroke={finalTextColor}
          strokeWidth={strokeWidth}
          strokeLinecap="square"
          strokeLinejoin="miter"
          fill="none"
        />
      </Svg>
    </View>
  )
}

export default FreeFTLogo
