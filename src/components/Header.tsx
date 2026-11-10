import type { CSSProperties } from 'react'
import { assets } from '../assets/figma'
import { useI18n } from '../i18n/I18nProvider'
import type { Lang } from '../i18n/I18nProvider'
import { useTheme } from '../theme/ThemeProvider'
import { cx } from '../lib/styles'

const tabs = [
  { id: 'home', key: 'home', bg: 'bg-tab-home' },
  { id: 'sobre', key: 'about', bg: 'bg-tab-about' },
  { id: 'exp', key: 'exp', bg: 'bg-tab-exp' },
  { id: 'proj', key: 'proj', bg: 'bg-tab-proj' },
  { id: 'contato', key: 'contact', bg: 'bg-tab-contact' },
] as const

const langs: Lang[] = ['pt', 'en']

export function Header() {
  const { t, lang, setLang } = useI18n()
  const { theme, toggle } = useTheme()

  return (
    <header className="sticky top-0 z-50 bg-header backdrop-blur-[10px]">
      <div className="mx-auto flex max-w-[1180px] flex-wrap items-end justify-between gap-x-4 gap-y-2 px-4 pt-[10px] sm:px-[34px]">
        <nav aria-label={t.nav.label} className="-mb-px flex flex-wrap gap-1">
          {tabs.map(({ id, key, bg }) => (
            <a
              key={id}
              href={`#${id}`}
              className={cx(
                'flex min-h-[46px] items-center rounded-t-[12px] px-3 font-hand text-[21px] font-bold text-ink sm:px-5 sm:text-[23px]',
                bg,
              )}
            >
              {t.nav[key]}
            </a>
          ))}
        </nav>

        <div className="flex flex-wrap items-center gap-2 pb-1">
          <a
            href="/arte"
            className="relative flex min-h-[44px] items-center rounded-[6px] border-2 border-dashed border-white/60 bg-accent px-5 py-1.5 font-hand text-[22px] font-bold text-on-accent"
          >
            {t.nav.art}
          </a>

          <div
            role="group"
            aria-label={t.controls.language}
            className="flex overflow-hidden rounded-[6px] border-2 border-ink"
          >
            {langs.map((code) => {
              const active = lang === code
              return (
                <button
                  key={code}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setLang(code)}
                  className={cx(
                    'h-[42px] cursor-pointer px-[14px] font-type text-[14px] font-bold uppercase',
                    active ? 'bg-accent text-on-accent' : 'bg-page text-muted',
                  )}
                >
                  {code}
                </button>
              )
            })}
          </div>

          <button
            type="button"
            onClick={toggle}
            aria-label={t.controls.theme}
            aria-pressed={theme === 'dark'}
            title={t.controls.theme}
            className="flex size-11 cursor-pointer items-center justify-center rounded-[6px] border-2 border-ink bg-page"
          >
            <span
              aria-hidden
              className="mask-asset block size-5 bg-ink"
              style={{ '--mask': `url("${assets.iconMoon}")` } as CSSProperties}
            />
          </button>
        </div>
      </div>
    </header>
  )
}
