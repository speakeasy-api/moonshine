// TODO: https://linear.app/speakeasy/issue/SXF-172/language-indicator-component
import { cn } from '@/lib/utils'
import { SupportedLanguage } from '@/types'

interface LanguageIndicatorProps {
  language: SupportedLanguage
  className?: string
  indicatorOnly?: boolean
}

const languageLabelMap: Record<string, string> = {
  typescript: 'TypeScript',
  go: 'Go',
  java: 'Java',
  python: 'Python',
  csharp: 'C#',
  terraform: 'Terraform',
  unity: 'Unity',
  php: 'PHP',
  swift: 'Swift',
  ruby: 'Ruby',
  postman: 'Postman',

  // Unsupported languages but used elsewhere
  bash: 'Bash',
  json: 'JSON',
  dotnet: 'C#',
  javascript: 'JavaScript',
}

const languageColorMap: Record<string, string> = {
  typescript: 'bg-yellow-500',
  go: 'bg-green-600',
  java: 'bg-orange-500',
  python: 'bg-indigo-500',
  csharp: 'bg-purple-500',
  terraform: 'bg-blue-500',
  unity: 'bg-emerald-300',
  php: 'bg-orange-500',
  swift: 'bg-sky-300',
  ruby: 'bg-red-500',
  postman: 'bg-pink-500',

  // Unsupported languages but used elsewhere
  bash: 'bg-gray-500',
  json: 'bg-gray-500',
  dotnet: 'bg-gray-500',
  javascript: 'bg-yellow-500',
}

export function LanguageIndicator({
  language,
  className,
  indicatorOnly = false,
}: LanguageIndicatorProps) {
  return (
    <div className={cn('gap flex items-center gap-2 select-none', className)}>
      <div
        className={`mx-1 h-2 w-2 rounded-full ${languageColorMap[language]}`}
      />
      {!indicatorOnly && (
        <span className="text-body font-medium">
          {languageLabelMap[language]}
        </span>
      )}
    </div>
  )
}
