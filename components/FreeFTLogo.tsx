import React from 'react'
import { View } from 'react-native'
import Svg, { Circle, Text as SvgText } from 'react-native-svg'
import { useTheme } from '@tamagui/core'

/**
 * FreeFT Logo Component
 * 
 * A circular SVG logo with "FreeFT" text in Space Grotesk font.
 * Integrates with Tamagui theming system for consistent colors.
 * 
 * @param size - Logo diameter in pixels (default: 80)
 * @param circleColor - Background circle color (defaults to theme purple10)
 * @param textColor - Text color (defaults to theme yellow10)
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
  const finalTextColor = textColor || theme.yellow10?.val || '#fbbf24'
  
  // Calculate responsive font size based on logo size
  const fontSize = Math.max(12, size * 0.22)
  
  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size} viewBox="0 0 100 100">
        {/* Circle background */}
        <Circle
          cx="50"
          cy="50"
          r="46"
          fill={finalCircleColor}
          stroke={finalTextColor}
          strokeWidth="3"
        />
        
        {/* FreeFT Text */}
        <SvgText
          x="50"
          y="58"
          fontSize={fontSize}
          fontFamily="SpaceGrotesk_600SemiBold"
          fill={finalTextColor}
          textAnchor="middle"
          fontWeight="600"
          letterSpacing="-0.5"
        >
          FreeFT
        </SvgText>
      </Svg>
    </View>
  )
}

export default FreeFTLogo
