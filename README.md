# 💪 FreeFitnessTracker

A modern React Native fitness tracking application built with Expo, Tamagui, and Space Grotesk typography.

## ✨ Features

- **Modern UI**: Built with Tamagui components and custom dark theme
- **Custom Typography**: Space Grotesk font as default across the app
- **SVG Logo**: Custom FreeFT circular logo component
- **Authentication UI**: Login and signup interface
- **TypeScript**: Full type safety throughout the application
- **Responsive Design**: Optimized for various screen sizes

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or pnpm
- Expo CLI
- iOS Simulator or Android Emulator (for testing)

### Installation

```bash
# Clone the repository
git clone git@github.com:0xburden/freefitnesstracker.git
cd freefitnesstracker

# Install dependencies
npm install

# Start the development server
npx expo start
```

### Development

```bash
# Start with specific platforms
npx expo start --ios      # iOS simulator
npx expo start --android  # Android emulator
npx expo start --web      # Web browser

# Code quality
npm run lint              # Run ESLint
npm run lint:fix          # Fix linting issues
npm run format            # Format with Prettier
npm run format:check      # Check formatting
```

## 🏗️ Project Structure

```
freefitnesstracker/
├── App.tsx                 # Main application component
├── components/             # Reusable UI components
│   ├── FreeFTLogo.tsx     # Custom SVG logo component
│   ├── Typography.tsx      # Enhanced text components
│   ├── index.ts           # Component exports
│   └── README.md          # Component documentation
├── tamagui.config.ts      # UI theme configuration
├── FONT_CONFIGURATION.md  # Font setup documentation
└── package.json           # Dependencies and scripts
```

## 🎨 Design System

### Theme
- **Primary Colors**: Purple and blue gradients
- **Accent Colors**: Orange and yellow
- **Background**: Dark theme optimized
- **Typography**: Space Grotesk font family

### Components
- **FreeFT Logo**: Scalable SVG logo with customizable colors
- **Enhanced Typography**: Text components with automatic font application
- **Form Elements**: Styled inputs and buttons
- **Cards**: Elevated container components

## 📱 Typography

This app uses **Space Grotesk** as the default font family across all components. The font configuration ensures consistent typography throughout the application.

**Available Weights:**
- Light (300)
- Regular (400) 
- Medium (500)
- SemiBold (600)
- Bold (700)

See [FONT_CONFIGURATION.md](FONT_CONFIGURATION.md) for detailed font setup.

## 🧩 Components

### FreeFT Logo
```tsx
import { FreeFTLogo } from './components'

<FreeFTLogo size={100} />
<FreeFTLogo size={80} circleColor="#8b5cf6" textColor="#fbbf24" />
```

### Enhanced Typography
```tsx
import { Text, H1, Paragraph } from './components'

<H1>Heading with Space Grotesk</H1>
<Text>Body text with Space Grotesk</Text>
<Paragraph>Paragraph with Space Grotesk</Paragraph>
```

## 🛠️ Tech Stack

- **Framework**: React Native with Expo
- **UI Library**: Tamagui
- **Typography**: Space Grotesk (Expo Google Fonts)
- **Graphics**: React Native SVG
- **Language**: TypeScript
- **Styling**: Tamagui styled system
- **Code Quality**: ESLint + Prettier

## 🔧 Configuration

### Environment Setup
The app is configured for:
- Dark theme by default
- Space Grotesk typography
- TypeScript strict mode
- ESLint and Prettier integration

### Tamagui Configuration
Custom theme with:
- Dark color palette
- Space Grotesk font family
- Custom component styling
- Responsive design tokens

## 📝 Development Notes

- All text components have explicit `fontFamily` props for Space Grotesk
- The app uses a component-based architecture
- TypeScript is configured for strict type checking
- ESLint and Prettier ensure code quality

## 🚢 Deployment

The app is configured for Expo deployment and can be built for:
- iOS App Store
- Google Play Store
- Expo Go (for development)
- Web deployment

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run linting and formatting
5. Submit a pull request

---

**Created with ❤️ using React Native, Expo, and Tamagui**