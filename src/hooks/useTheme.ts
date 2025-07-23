import { useConfig } from './useConfig'
/**
 * Hook to get the current theme (light or dark) from the tailwind class element.
 * @deprecated get the theme from useMoonshineConfig
 */
export function useTheme() {
  const { theme } = useConfig()

  return theme
}
