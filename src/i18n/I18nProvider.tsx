import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { en } from './en'
import { pt } from './pt'
import type { Dict } from './pt'

export type Lang = 'pt' | 'en'

const dictionaries: Record<Lang, Dict> = { pt, en }
const htmlLang: Record<Lang, string> = { pt: 'pt-BR', en: 'en' }

interface I18nValue {
  lang: Lang
  t: Dict
  setLang: (lang: Lang) => void
}

const I18nContext = createContext<I18nValue | null>(null)

function readInitialLang(): Lang {
  try {
    const saved = localStorage.getItem('lang')
    if (saved === 'pt' || saved === 'en') return saved
  } catch {
    /* storage indisponível */
  }
  return 'pt' // idioma do design; a troca para EN é feita no header
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readInitialLang)

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    try {
      localStorage.setItem('lang', next)
    } catch {
      /* ignora */
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = htmlLang[lang]
    document.title = dictionaries[lang].meta.title
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', dictionaries[lang].meta.description)
  }, [lang])

  const value = useMemo<I18nValue>(
    () => ({ lang, t: dictionaries[lang], setLang }),
    [lang, setLang],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n deve ser usado dentro de <I18nProvider>')
  return ctx
}
