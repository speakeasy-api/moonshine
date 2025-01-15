// TODO: https://linear.app/speakeasy/issue/SXF-172/language-indicator-component
import { SupportedLanguage } from '@/types'

interface LanguageIndicatorProps {
  language: SupportedLanguage
}

const languageLabelMap: Record<SupportedLanguage, string> = {
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
}

const languageColorMap: Record<SupportedLanguage, string> = {
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
}

export function LanguageIndicator({ language }: LanguageIndicatorProps) {
  return (
    <div className="gap flex select-none items-center gap-2">
      <div
        className={`mx-1 h-2 w-2 rounded-full ${languageColorMap[language]}`}
      />
      <span className="text-muted-foreground font-medium">
        {languageLabelMap[language]}
      </span>
    </div>
  )
}
