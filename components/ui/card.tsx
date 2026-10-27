import { View } from "react-native";

type CardSize =
  | "quarter"
  | "third"
  | "half"
  | "twoThirds"
  | "threeQuarters"
  | "full";

type CardTone = "default" | "outline" | "accent";

type CardProps = {
  /** Content rendered inside the card. */
  children: React.ReactNode;
  /** Width in the grid. Fractions in one row should add up to 1. */
  size?: CardSize;
  /** Visual style of the card surface. */
  tone?: CardTone;
  /** Extra classes for the outer wrapper (margin, self-alignment). Not for width. */
  className?: string;
};

// Full class names only. Tailwind scans the source for complete strings,
// so building them like `lg:w-${n}` would silently produce no CSS.
const SIZE_CLASSES: Record<CardSize, string> = {
  quarter: "w-full md:w-1/2 lg:w-1/4",
  third: "w-full lg:w-1/3",
  half: "w-full lg:w-1/2",
  twoThirds: "w-full lg:w-2/3",
  threeQuarters: "w-full lg:w-3/4",
  full: "w-full",
};

const TONE_CLASSES: Record<CardTone, string> = {
  default: "bg-slate-200 dark:bg-slate-900 border-slate-300 dark:border-slate-800",
  outline: "bg-transparent border-slate-400 dark:border-slate-700",
  accent: "bg-blue-100 dark:bg-blue-950 border-blue-500",
};

/**
 * Responsive dashboard card. Pick a width with `size` and a surface with `tone`.
 * Place inside a `flex-row flex-wrap -m-2` container.
 *
 * @example
 * <Card size="half" tone="accent">...</Card>
 */
export function Card({
  children,
  size = "quarter",
  tone = "default",
  className = "",
}: CardProps) {
  return (
    <View className={`p-2 ${SIZE_CLASSES[size]} ${className}`}>
      <View className={`flex-1 rounded-lg border p-6 ${TONE_CLASSES[tone]}`}>
        {children}
      </View>
    </View>
  );
}
