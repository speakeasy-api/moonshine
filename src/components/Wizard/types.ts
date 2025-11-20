import { ProgrammingLanguage } from '../../types'

export interface WizardCommand {
  id: string
  code: string
  language: ProgrammingLanguage
  comment?: string
  active?: boolean
  path?: string
  onSelectOrCopy?: (id: string) => void
}

export interface WizardStep {
  title: string
  description: string
  commands?: WizardCommand[]
}
