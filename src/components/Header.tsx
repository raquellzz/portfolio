import type { CSSProperties } from 'react'
import { assets } from '../assets/figma'
import { useI18n } from '../i18n/I18nProvider'
import type { Lang } from '../i18n/I18nProvider'
import { cx } from '../lib/styles'
import { useTheme } from '../theme/ThemeProvider'

type NavKey = 'home' | 'about' | 'exp' | 'proj' | 'contact' | 'works' | 'process'

interface Tab {
  href: string
  key: NavKey
  bg: string
}

const homeTabs: Tab[] = [
  { href: '#home', key: 'home', bg: 'bg-tab-home' },
  { href: '#sobre', key: 'about', bg: 'bg-tab-about' },
  { href: '#exp', key: 'exp', bg: 'bg-tab-exp' },
  { href: '#proj', key: 'proj', bg: 'bg-tab-proj' },
  { href: '#contato', key: 'contact', bg: 'bg-tab-contact' },
]

const artTabs: Tab[] = [
  { href: '/', key: 'home', bg: 'bg-tab-home' },
  { href: '#obras', key: 'works', bg: 'bg-tab-about' },
  { href: '#processo', key: 'process', bg: 'bg-tab-exp' },
  { href: '#contato', key: 'contact', bg: 'bg-tab-contact' },
]

const langs: Lang[] = ['pt', 'en']

/** `page` define as abas e o botão que leva à outra página. */
export function Header({ page }: { page: 'home' | 'art' }) {
  const { t, lang, setLang } = useI18n()
  const { theme, toggle } = useTheme()

  const tabs = page === 'home' ? homeTabs : artTabs
  const other =
    page === 'home'
      ? { href: '/arte', label: t.nav.art, dashed: true }
      : { href: '/', label: t.nav.dev, dashed: false }

  return (
    <header className="sticky top-0 z-50 bg-header backdrop-blur-[10px]">
      <div className="mx-auto flex max-w-[1180px] flex-wrap items-end justify-between gap-x-4 gap-y-2 px-4 pt-[10px] sm:px-[34px]">
        <nav aria-label={t.nav.label} className="-mb-px flex flex-wrap gap-1">
          {tabs.map(({ href, key, bg }) => (
            <a
              key={key}
              href={href}
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
            href={other.href}
            className={cx(
              'relative flex min-h-[44px] items-center rounded-[6px] border-2 border-dashed bg-accent px-5 py-1.5 font-hand text-[22px] font-bold text-on-accent',
              other.dashed ? 'border-white/60' : 'border-accent',
            )}
          >
            {other.label}
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
