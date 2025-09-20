# FFT Logo Component

A circular SVG logo component for the Free Fitness Tracker app featuring custom drawn "FFT" text paths.

## Features

- **SVG-based**: Scalable vector graphics for crisp rendering at any size
- **Tamagui Integration**: Uses theme colors by default with manual override options
- **Responsive**: Font size scales with logo size
- **Enhanced Legibility**: Optimized letter spacing (0.5px) for better readability
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

- **Text**: "FFT" custom drawn paths (more compact than FreeFT)
- **Design**: Smaller and wider letter forms for better balance
- **Color**: Uses theme dark purple (#59478d) for bold text
- **Stroke Style**: Sharp square caps and miter joins (not rounded)
- **Weight**: Bold stroke width for prominent appearance
- **Shape**: Clean circular background without outer stroke
- **Glow Effect**: Layered transparent white circles (8% and 12% opacity)
- **Theme Integration**: Automatically adapts to Tamagui theme colors

## Dependencies

- `react-native-svg`: For SVG rendering
- `@tamagui/core`: For theme integration