import { highlight } from 'codehike/code'
import { RawCode } from 'codehike/code'
import { SupportedLanguage } from '@/types'

export async function highlightCode(code: string, language: SupportedLanguage) {
  const rawCode: RawCode = {
    value: code,
    lang: language,
    meta: '',
  }
  return highlight(rawCode, 'github-from-css')
}
