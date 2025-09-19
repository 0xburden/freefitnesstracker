# Space Grotesk Font Configuration

This app has been configured to use **Space Grotesk** as the default font for all text elements throughout the application.

## Configuration Changes Made

### 1. Tamagui Configuration (`tamagui.config.ts`)

- **Font Definition**: Complete Space Grotesk font family with all weights (300-700)
- **Font Mapping**: All font variants (`heading`, `body`, `mono`, `text`, `paragraph`, `button`, `label`, `input`) now use Space Grotesk
- **Face Mapping**: Proper mapping to Expo Google Fonts family names

```typescript
const spaceGroteskFont = {
  family: "SpaceGrotesk",
  // ... weight, size, lineHeight configurations
  face: {
    300: { normal: "SpaceGrotesk_300Light" },
    400: { normal: "SpaceGrotesk_400Regular" },
    500: { normal: "SpaceGrotesk_500Medium" },
    600: { normal: "SpaceGrotesk_600SemiBold" },
    700: { normal: "SpaceGrotesk_700Bold" },
  },
}
```

### 2. Component-Level Enforcement (`App.tsx`)

Every text component in the main app has explicit `fontFamily` props to ensure Space Grotesk is used:

- `H1`, `H3`: Use `fontFamily="$heading"`
- `Paragraph`, `Text`: Use `fontFamily="$body"`
- `Input`: Use `fontFamily="$input"`
- `Button`: Use `fontFamily="$button"`

### 3. Enhanced Typography Components (`components/Typography.tsx`)

Created wrapper components that automatically apply Space Grotesk:

```tsx
export const Text = (props: TextProps) => (
  <TamaguiText fontFamily="$body" {...props} />
)
```

Available components:
- `Text`, `Paragraph`
- `H1`, `H2`, `H3`, `H4`, `H5`, `H6`

## Font Loading

The app loads all Space Grotesk weights via Expo Google Fonts:

```typescript
const [fontsLoaded] = useFonts({
  SpaceGrotesk_300Light,
  SpaceGrotesk_400Regular,
  SpaceGrotesk_500Medium,
  SpaceGrotesk_600SemiBold,
  SpaceGrotesk_700Bold,
})
```

## Usage Guidelines

### For New Components

1. **Preferred**: Use the enhanced Typography components from `./components`
   ```tsx
   import { Text, H1, Paragraph } from './components'
   ```

2. **Alternative**: Use explicit `fontFamily` props
   ```tsx
   <Text fontFamily="$body">Your text</Text>
   <H1 fontFamily="$heading">Your heading</H1>
   ```

### Font Weights Available

- **Light** (300): `fontWeight="300"`
- **Regular** (400): `fontWeight="400"`
- **Medium** (500): `fontWeight="500"`
- **SemiBold** (600): `fontWeight="600"`
- **Bold** (700): `fontWeight="700"`

## Verification

To verify Space Grotesk is being used:

1. **Development**: Check React Native Debugger or Flipper
2. **Production**: Visual inspection - Space Grotesk has distinctive letterforms
3. **Code**: All text components have explicit `fontFamily` props

## Font Name Resolution

**Important**: The font face names in Tamagui configuration must match exactly what Expo Google Fonts registers:

```typescript
face: {
  300: { normal: "SpaceGrotesk_300Light" },
  400: { normal: "SpaceGrotesk_400Regular" },
  500: { normal: "SpaceGrotesk_500Medium" },
  600: { normal: "SpaceGrotesk_600SemiBold" },
  700: { normal: "SpaceGrotesk_700Bold" },
}
```

### SVG Text Elements

SVG Text elements require explicit font family names:
```tsx
<SvgText fontFamily="SpaceGrotesk_600SemiBold">
  FreeFT
</SvgText>
```

## Troubleshooting

If Space Grotesk isn't displaying:

1. Ensure fonts are loaded before rendering (`fontsLoaded` check)
2. Verify `fontFamily` props are set on all text components
3. Check that font face names match Expo imports exactly
4. For SVG text, use the explicit font import names (e.g., `SpaceGrotesk_600SemiBold`)
5. Clear Metro bundler cache: `npx expo start --clear`

---

**Result**: Every text element in the app now uses Space Grotesk font family by default.