import { createTamagui } from "@tamagui/core"
import { config } from "@tamagui/config"

// Define Space Grotesk font family configuration
const spaceGroteskFont = {
  family: "Space Grotesk",
  size: {
    1: 12,
    2: 14,
    3: 15,
    4: 16,
    5: 18,
    6: 20,
    7: 22,
    8: 24,
    9: 30,
    10: 42,
    11: 52,
    12: 62,
    13: 72,
    14: 92,
    15: 114,
    16: 124,
  },
  lineHeight: {
    1: 16,
    2: 18,
    3: 20,
    4: 22,
    5: 24,
    6: 26,
    7: 28,
    8: 30,
    9: 36,
    10: 48,
    11: 58,
    12: 68,
    13: 78,
    14: 98,
    15: 120,
    16: 130,
  },
  weight: {
    1: "300", // Light
    2: "400", // Regular
    3: "500", // Medium
    4: "600", // SemiBold
    5: "700", // Bold
  },
  letterSpacing: {
    1: 0.5,   // Slightly increased for better readability
    2: 0.25,  // Positive spacing instead of negative
    3: 0,     // Neutral for mid-range text
    4: -0.25, // Slight tightening for larger text
    5: -0.5,  // Minimal tightening for headings
  },
  face: {
    300: { normal: "SpaceGrotesk_300Light" },
    400: { normal: "SpaceGrotesk_400Regular" },
    500: { normal: "SpaceGrotesk_500Medium" },
    600: { normal: "SpaceGrotesk_600SemiBold" },
    700: { normal: "SpaceGrotesk_700Bold" },
  },
}

// Dark theme only - no light mode support
const darkThemeColors = {
  // Dark blue/purple base colors
  background: "#0a0b1e", // Very dark blue-purple
  backgroundHover: "#121330", // Slightly lighter
  backgroundPress: "#1a1b42", // Even lighter for press states
  backgroundFocus: "#252654", // Focus state

  // Card and surface colors
  backgroundTransparent: "rgba(10, 11, 30, 0.8)",
  color: "#e2e8f0", // Light text on dark background
  colorHover: "#f1f5f9", // Lighter text on hover
  colorPress: "#cbd5e1", // Pressed text color
  colorTransparent: "rgba(226, 232, 240, 0.8)",

  // Border colors
  borderColor: "#374151", // Subtle border
  borderColorHover: "#4b5563", // Hover border
  borderColorPress: "#6b7280", // Press border
  borderColorFocus: "#fbbf24", // Yellow accent for focus

  // Accent colors (yellow/orange)
  accent: "#fbbf24", // Yellow accent
  accentHover: "#f59e0b", // Orange hover
  accentPress: "#d97706", // Darker orange press

  // Status colors with dark theme adjustments
  blue1: "#0c1a2e",
  blue2: "#111f3a",
  blue3: "#1a2847",
  blue4: "#233155",
  blue5: "#2c3a63",
  blue6: "#364371",
  blue7: "#3f4c7f",
  blue8: "#48558d",
  blue9: "#515e9b",
  blue10: "#5a67a9",
  blue11: "#6370b7",
  blue12: "#6c79c5",

  purple1: "#1a0c2e",
  purple2: "#23113a",
  purple3: "#2c1a47",
  purple4: "#352355",
  purple5: "#3e2c63",
  purple6: "#473571",
  purple7: "#503e7f",
  purple8: "#59478d",
  purple9: "#62509b",
  purple10: "#6b59a9",
  purple11: "#7462b7",
  purple12: "#7d6bc5",

  // Orange/yellow accents
  orange1: "#2e1a0c",
  orange2: "#3a2311",
  orange3: "#472c1a",
  orange4: "#553523",
  orange5: "#633e2c",
  orange6: "#714735",
  orange7: "#7f503e",
  orange8: "#8d5947",
  orange9: "#9b6250",
  orange10: "#a96b59",
  orange11: "#b77462",
  orange12: "#c57d6b",

  yellow1: "#2e2a0c",
  yellow2: "#3a3311",
  yellow3: "#473c1a",
  yellow4: "#554523",
  yellow5: "#634e2c",
  yellow6: "#715735",
  yellow7: "#7f603e",
  yellow8: "#8d6947",
  yellow9: "#9b7250",
  yellow10: "#a97b59",
  yellow11: "#b78462",
  yellow12: "#c58d6b",
}

// Create dark-only theme configuration with Space Grotesk font
const darkOnlyConfig = {
  ...config,
  // Custom border radius for modern UI
  radius: {
    0: 0,         // No radius
    1: 4,         // Small radius
    2: 8,         // Medium radius  
    3: 12,        // Large radius
    4: 20,        // Button/Card radius (1.25rem)
    5: 24,        // Extra large radius
    6: 32,        // Maximum radius
    true: 20,     // Default radius for components
  },
  fonts: {
    // Set Space Grotesk as the default font for ALL text elements
    heading: spaceGroteskFont,
    body: spaceGroteskFont,
    mono: spaceGroteskFont, // Use Space Grotesk even for mono (override)
    // Override all other font variants to use Space Grotesk
    text: spaceGroteskFont,
    paragraph: spaceGroteskFont,
    button: spaceGroteskFont,
    label: spaceGroteskFont,
    input: spaceGroteskFont,
  },
  themes: {
    // Only dark theme - remove light theme entirely
    dark: {
      ...config.themes.dark,
      background: darkThemeColors.background,
      backgroundHover: darkThemeColors.backgroundHover,
      backgroundPress: darkThemeColors.backgroundPress,
      backgroundFocus: darkThemeColors.backgroundFocus,
      backgroundTransparent: darkThemeColors.backgroundTransparent,
      color: darkThemeColors.color,
      colorHover: darkThemeColors.colorHover,
      colorPress: darkThemeColors.colorPress,
      colorTransparent: darkThemeColors.colorTransparent,
      borderColor: darkThemeColors.borderColor,
      borderColorHover: darkThemeColors.borderColorHover,
      borderColorPress: darkThemeColors.borderColorPress,
      borderColorFocus: darkThemeColors.borderColorFocus,

      // Blue theme variants
      blue1: darkThemeColors.blue1,
      blue2: darkThemeColors.blue2,
      blue3: darkThemeColors.blue3,
      blue4: darkThemeColors.blue4,
      blue5: darkThemeColors.blue5,
      blue6: darkThemeColors.blue6,
      blue7: darkThemeColors.blue7,
      blue8: darkThemeColors.blue8,
      blue9: darkThemeColors.blue9,
      blue10: darkThemeColors.blue10,
      blue11: darkThemeColors.blue11,
      blue12: darkThemeColors.blue12,

      // Purple theme variants
      purple1: darkThemeColors.purple1,
      purple2: darkThemeColors.purple2,
      purple3: darkThemeColors.purple3,
      purple4: darkThemeColors.purple4,
      purple5: darkThemeColors.purple5,
      purple6: darkThemeColors.purple6,
      purple7: darkThemeColors.purple7,
      purple8: darkThemeColors.purple8,
      purple9: darkThemeColors.purple9,
      purple10: darkThemeColors.purple10,
      purple11: darkThemeColors.purple11,
      purple12: darkThemeColors.purple12,

      // Orange/yellow accents
      orange1: darkThemeColors.orange1,
      orange2: darkThemeColors.orange2,
      orange3: darkThemeColors.orange3,
      orange4: darkThemeColors.orange4,
      orange5: darkThemeColors.orange5,
      orange6: darkThemeColors.orange6,
      orange7: darkThemeColors.orange7,
      orange8: darkThemeColors.orange8,
      orange9: darkThemeColors.orange9,
      orange10: darkThemeColors.orange10,
      orange11: darkThemeColors.orange11,
      orange12: darkThemeColors.orange12,

      yellow1: darkThemeColors.yellow1,
      yellow2: darkThemeColors.yellow2,
      yellow3: darkThemeColors.yellow3,
      yellow4: darkThemeColors.yellow4,
      yellow5: darkThemeColors.yellow5,
      yellow6: darkThemeColors.yellow6,
      yellow7: darkThemeColors.yellow7,
      yellow8: darkThemeColors.yellow8,
      yellow9: darkThemeColors.yellow9,
      yellow10: darkThemeColors.yellow10,
      yellow11: darkThemeColors.yellow11,
      yellow12: darkThemeColors.yellow12,
    },
  },
  // Force dark theme as default
  defaultTheme: "dark",
  // Override default styles to ensure Space Grotesk is used everywhere
  shorthands: {
    ...config.shorthands,
  },
  settings: {
    ...config.settings,
    // Force Space Grotesk as the default font family
    defaultFont: "$body",
  },
}

const tamaguiConfig = createTamagui(darkOnlyConfig)

export type AppConfig = typeof tamaguiConfig

export default tamaguiConfig
