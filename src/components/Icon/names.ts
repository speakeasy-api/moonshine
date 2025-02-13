import dynamicIconImports from 'lucide-react/dynamicIconImports'
import customDynamicIconImports from './customIcons'

export const lucideIconNames = Object.keys(
  dynamicIconImports
) as (keyof typeof dynamicIconImports)[]

export const customIconNames = Object.keys(
  customDynamicIconImports
) as (keyof typeof customDynamicIconImports)[]

export const iconNames = [...lucideIconNames, ...customIconNames]

export type IconName = (typeof iconNames)[number]
