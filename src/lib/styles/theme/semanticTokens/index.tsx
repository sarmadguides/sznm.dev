import type { DeepPartial, SemanticValue, ThemeScale } from "@chakra-ui/react";

export type TokenValue = string | number | SemanticValue<string>;

export type ThemeTokenValues = Record<string, TokenValue>;

export type SemanticTokenType = DeepPartial<
  Record<ThemeScale, ThemeTokenValues>
>;

export const semanticTokens: SemanticTokenType = {
  colors: {
    text: {
      default: "gray.900",
      _dark: "gray.200",
    },
    background: {
      default: "gray.50",
      _dark: "gray.800",
    },
    headerAlphaBackground: {
      default: "rgba(247, 250, 252, 0.8)",
      _dark: "rgba(26, 32, 44, 0.8)",
    },
    tabBarAlphaBackground: {
      default: "rgba(237, 242, 247, 0.8)",
      _dark: "rgba(45, 55, 72, 0.8)",
    },
    cardBorder: {
      default: "gray.100",
      _dark: "gray.700",
    },
    buttonBackground: {
      default: "gray.300",
      _dark: "gray.500",
    },
  },
};
