import { forwardRef } from 'react';
import { Text as RNText, TextInput as RNTextInput, TextProps, TextInputProps } from 'react-native';
import { useColorScheme } from 'nativewind';

// ─── Types ────────────────────────────────────────────────────────────────────

type TextVariant = 'heading' | 'subheading' | 'body' | 'label' | 'caption';

type TextWeight =
  | 'thin'
  | 'extralight'
  | 'light'
  | 'regular'
  | 'medium'
  | 'semibold'
  | 'bold'
  | 'extrabold'
  | 'black';

type TextColor = 'default' | 'muted' | 'accent' | 'danger' | 'success' | 'white';

type AppTextProps = TextProps & {
  /** Typography scale. Defaults to `body`. */
  variant?: TextVariant;
  /** Font weight. Defaults to variant's default weight. */
  weight?: TextWeight;
  /** Semantic color. Defaults to `default` (slate-900 / slate-50). */
  color?: TextColor;
  /** NativeWind / Tailwind class overrides. Applied after base styles. */
  className?: string;
};

// ─── Maps ─────────────────────────────────────────────────────────────────────

// Full font names only — no dynamic string building (Tailwind / Metro won't tree-shake them).
const FONT_MAP: Record<TextWeight, string> = {
  thin: 'GoogleSansFlex_9pt-Thin',
  extralight: 'GoogleSansFlex_9pt-ExtraLight',
  light: 'GoogleSansFlex_9pt-Light',
  regular: 'GoogleSansFlex_9pt-Regular',
  medium: 'GoogleSansFlex_9pt-Medium',
  semibold: 'GoogleSansFlex_9pt-SemiBold',
  bold: 'GoogleSansFlex_9pt-Bold',
  extrabold: 'GoogleSansFlex_9pt-ExtraBold',
  black: 'GoogleSansFlex_9pt-Black',
};

const SIZE_MAP: Record<TextVariant, number> = {
  heading: 28,
  subheading: 20,
  body: 14,
  label: 12,
  caption: 11,
};

const LINE_HEIGHT_MAP: Record<TextVariant, number> = {
  heading: 36,
  subheading: 28,
  body: 22,
  label: 18,
  caption: 16,
};

const DEFAULT_WEIGHT_MAP: Record<TextVariant, TextWeight> = {
  heading: 'bold',
  subheading: 'semibold',
  body: 'regular',
  label: 'medium',
  caption: 'regular',
};

// Light / dark color pairs [light, dark]
const COLOR_MAP: Record<TextColor, [string, string]> = {
  default: ['#0f172a', '#f8fafc'], // slate-900 / slate-50
  muted: ['#64748b', '#94a3b8'], // slate-500 / slate-300
  accent: ['#1d4ed8', '#60a5fa'], // blue-700  / blue-400
  danger: ['#dc2626', '#f87171'], // red-600   / red-400
  success: ['#16a34a', '#4ade80'], // green-600 / green-400
  white: ['#ffffff', '#ffffff'],
};

// ─── Text ─────────────────────────────────────────────────────────────────────

/**
 * Drop-in replacement for React Native `Text` with typography variants.
 * Base variant/weight/color defaults apply only when `className` doesn't
 * override them — e.g. passing `className="text-blue-700"` skips the
 * default color but keeps font and size.
 *
 * @example
 * <Text variant="heading">Welcome back</Text>
 * <Text variant="label" weight="semibold" color="muted">EMAIL ADDRESS</Text>
 * <Text variant="caption" color="danger">Passwords do not match</Text>
 * <Text variant="body" className="text-blue-700 font-bold">Override</Text>
 */
export function Text({
  variant = 'body',
  weight,
  color = 'default',
  style,
  className,
  ...props
}: AppTextProps) {
  const dark = useColorScheme().colorScheme === 'dark';
  const resolvedWeight = weight ?? DEFAULT_WEIGHT_MAP[variant];
  const [lightColor, darkColor] = COLOR_MAP[color];

  const cn = className ?? '';

  // Only apply defaults when className doesn't already override them
  const baseStyle: Record<string, any> = {
    // Font family always defaults to GSF (className can't override fontFamily via Tailwind)
    fontFamily: FONT_MAP[resolvedWeight],
  };

  if (!/\btext-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl|\d)/.test(cn))
    baseStyle.fontSize = SIZE_MAP[variant];

  if (!/\bleading-/.test(cn)) baseStyle.lineHeight = LINE_HEIGHT_MAP[variant];

  if (
    !/\btext-(slate|gray|zinc|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|white|black|inherit|transparent)/.test(
      cn
    )
  )
    baseStyle.color = dark ? darkColor : lightColor;

  return <RNText className={className} style={[baseStyle, style]} {...props} />;
}

// ─── TextInput ────────────────────────────────────────────────────────────────

/**
 * Drop-in replacement for React Native `TextInput`.
 * Applies GoogleSansFlex as the default font.
 * Supports `ref` forwarding for focus management (e.g. OTP fields).
 *
 * @example
 * <TextInput placeholder="Enter email" keyboardType="email-address" />
 */
export const TextInput = forwardRef<RNTextInput, TextInputProps & { className?: string }>(
  ({ style, ...props }, ref) => {
    return (
      <RNTextInput ref={ref} style={[{ fontFamily: FONT_MAP['regular'] }, style]} {...props} />
    );
  }
);

TextInput.displayName = 'TextInput';
