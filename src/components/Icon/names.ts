import dynamicIconImports from 'lucide-react/dynamicIconImports'

export const iconNames = Object.keys(
  dynamicIconImports
) as (keyof typeof dynamicIconImports)[]

export type IconName = (typeof iconNames)[number]
