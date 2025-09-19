# FreeFT Logo Component

A circular SVG logo component for the Free Fitness Tracker app featuring "FreeFT" text in Space Grotesk font.

## Features

- **SVG-based**: Scalable vector graphics for crisp rendering at any size
- **Tamagui Integration**: Uses theme colors by default with manual override options
- **Responsive**: Font size scales with logo size
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

- **Font**: Space Grotesk SemiBold (600 weight)
- **Text**: "FreeFT" (abbreviated from FreeFitnessTracker)
- **Shape**: Circular background with slight border
- **Theme Integration**: Automatically adapts to Tamagui theme colors

## Dependencies

- `react-native-svg`: For SVG rendering
- `@tamagui/core`: For theme integration