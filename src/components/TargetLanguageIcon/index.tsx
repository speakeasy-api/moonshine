import { Size } from '@/types'
import { SupportedLanguage } from '@/types'

import TypeScriptIcon from '@/assets/icons/languages/typescript.svg?react'
import GoIcon from '@/assets/icons/languages/go.svg?react'
import JavaIcon from '@/assets/icons/languages/java.svg?react'
import PythonIcon from '@/assets/icons/languages/python.svg?react'
import CSharpIcon from '@/assets/icons/languages/csharp.svg?react'
import TerraformIcon from '@/assets/icons/languages/terraform.svg?react'
import UnityIcon from '@/assets/icons/languages/unity.svg?react'
import PhpIcon from '@/assets/icons/languages/php.svg?react'
import SwiftIcon from '@/assets/icons/languages/swift.svg?react'
import RubyIcon from '@/assets/icons/languages/ruby.svg?react'
import PostmanIcon from '@/assets/icons/languages/postman.svg?react'
import JSONIcon from '@/assets/icons/languages/json.svg?react'
import { cn } from '@/lib/utils'

const sizeMap: Record<Size, number> = {
  small: 32,
  medium: 40,
  large: 48,
  xl: 64,
  '2xl': 80,
}

const iconSizeMap: Record<Size, number> = {
  small: 16,
  medium: 24,
  large: 32,
  xl: 48,
  '2xl': 64,
}

const icons: Record<
  SupportedLanguage,
  React.FC<React.SVGProps<SVGSVGElement>>
> = {
  typescript: TypeScriptIcon,
  go: GoIcon,
  java: JavaIcon,
  python: PythonIcon,
  csharp: CSharpIcon,
  terraform: TerraformIcon,
  unity: UnityIcon,
  php: PhpIcon,
  swift: SwiftIcon,
  ruby: RubyIcon,
  postman: PostmanIcon,
  json: JSONIcon,
}

export interface TargetLanguageIconProps {
  language: SupportedLanguage
  size?: Size
  className?: string
}

export function TargetLanguageIcon({
  language,
  size = 'medium',
  className,
}: TargetLanguageIconProps) {
  const IconComponent = icons[language]

  return (
    <div
      className={cn(
        'bg-background/50 flex items-center justify-center rounded-lg border p-2',
        className
      )}
      style={{
        width: sizeMap[size],
        height: sizeMap[size],
      }}
    >
      <IconComponent
        style={{
          width: iconSizeMap[size],
          height: iconSizeMap[size],
        }}
      />
    </div>
  )
}
