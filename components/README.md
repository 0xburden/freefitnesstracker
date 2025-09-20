# FreeFitnessTracker Logo Component

A circular SVG logo component for the Free Fitness Tracker app featuring "FreeFitnessTracker" text in bold monospace font.

## Features

- **SVG-based**: Scalable vector graphics for crisp rendering at any size
- **Tamagui Integration**: Uses theme colors by default with manual override options
- **Responsive**: Font size scales with logo size
- **Monospace Typography**: Bold monospace font for technical/modern appearance
- **Responsive Text**: Font size scales with logo size (12% of diameter)
- **Glow Effect**: Subtle outer white glow for luminous appearance
- **TypeScript**: Fully typed with comprehensive prop documentation

## Usage

```tsx
import { FreeFTLogo } from './components'

// Basic usage with default size (80px)
<FreeFTLogo />

// Custom size
<FreeFTLogo size={120} />

// Custom colors
<FreeFTLogo 
  size={100}
  circleColor="#8b5cf6"
  textColor="#fbbf24"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `number` | `80` | Logo diameter in pixels |
| `circleColor` | `string` | `theme.purple10` | Background circle color |
| `textColor` | `string` | `theme.yellow10` | Text color |

## Design Details

- **Text**: "FreeFitnessTracker" in bold monospace font
- **Font**: System monospace font with bold weight for consistency
- **Color**: Uses theme dark purple (#59478d) for text
- **Typography**: SVG Text element with responsive font sizing
- **Positioning**: Centered with textAnchor="middle"
- **Shape**: Clean circular background without outer stroke
- **Glow Effect**: Layered transparent white circles (8% and 12% opacity)
- **Theme Integration**: Automatically adapts to Tamagui theme colors

## Dependencies

- `react-native-svg`: For SVG rendering
- `@tamagui/core`: For theme integration