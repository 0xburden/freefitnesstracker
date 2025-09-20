import React from "react"
import {
  Text as TamaguiText,
  Paragraph as TamaguiParagraph,
  H1 as TamaguiH1,
  H2 as TamaguiH2,
  H3 as TamaguiH3,
  H4 as TamaguiH4,
  H5 as TamaguiH5,
  H6 as TamaguiH6,
  TextProps,
  ParagraphProps,
  HeadingProps,
} from "tamagui"

/**
 * Enhanced Text Components with forced Space Grotesk font
 *
 * These components ensure that Space Grotesk is always used,
 * even if the global Tamagui configuration doesn't pick it up.
 */

export const Text = (props: TextProps) => (
  <TamaguiText fontFamily="$body" letterSpacing="$1" {...props} />
)

export const Paragraph = (props: ParagraphProps) => (
  <TamaguiParagraph fontFamily="$body" letterSpacing="$1" {...props} />
)

export const H1 = (props: HeadingProps) => (
  <TamaguiH1 fontFamily="$heading" letterSpacing="$2" {...props} />
)

export const H2 = (props: HeadingProps) => (
  <TamaguiH2 fontFamily="$heading" letterSpacing="$2" {...props} />
)

export const H3 = (props: HeadingProps) => (
  <TamaguiH3 fontFamily="$heading" letterSpacing="$2" {...props} />
)

export const H4 = (props: HeadingProps) => (
  <TamaguiH4 fontFamily="$heading" letterSpacing="$2" {...props} />
)

export const H5 = (props: HeadingProps) => (
  <TamaguiH5 fontFamily="$heading" letterSpacing="$1" {...props} />
)

export const H6 = (props: HeadingProps) => (
  <TamaguiH6 fontFamily="$heading" letterSpacing="$1" {...props} />
)

export default {
  Text,
  Paragraph,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
}
