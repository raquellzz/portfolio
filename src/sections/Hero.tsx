import type { CSSProperties } from 'react'
import { assets } from '../assets/figma'
import { Button, Polaroid, Tape } from '../components/ui'
import { useI18n } from '../i18n/I18nProvider'
import { useReducedMotion } from '../lib/useReducedMotion'
import { useTypewriter } from '../lib/useTypewriter'

export const GITHUB_URL = 'https://github.com/raquellzz'

export function Hero() {
  const { t } = useI18n()
  const h = t.hero
  const reduceMotion = useReducedMotion()
  const typed = useTypewriter(h.roles, { enabled: !reduceMotion })
  // Com "menos movimento": mostra só o primeiro título, parado.
  const visibleRole = reduceMotion ? h.roles[0] : typed
  const [firstName, ...restName] = h.name.split(' ')
  const lastName = restName.join(' ')

  return (
    <section
      id="home"
      className="flex flex-col items-center gap-10 pt-[76px] pb-[89px] pl-[var(--gutter)] pr-4 sm:pr-10 lg:flex-row"
    >
      {/* ------------------------------ texto ------------------------------ */}
      <div className="w-full lg:min-w-0 lg:flex-[1.4]">
        <p className="-rotate-2 font-hand text-[clamp(26px,3vw,34px)] leading-none text-accent-ink">
          {h.greeting}
        </p>

        <h1 className="mt-3 font-hand font-bold text-ink">
          <span className="block text-[clamp(34px,4vw,48px)] leading-none">{h.iam}</span>
          <span className="mt-1 block text-[clamp(64px,9vw,112px)] leading-[0.95] tracking-[-0.02em]">
            <span className="block">{firstName}</span>
            <span className="mark inline-block py-2">{lastName}</span>
          </span>
        </h1>

        {/* títulos que são digitados e apagados; o leitor de tela recebe a lista completa */}
        <p className="sr-only">
          {h.rolesLabel}: {h.roles.join(', ')}
        </p>
        <p
          aria-hidden
          className="mt-4 flex min-h-[2.2em] items-start font-hand text-[clamp(22px,2.4vw,32px)] leading-[1.05] text-accent-ink"
        >
          <span>{visibleRole}</span>
          <span className="caret ml-1 inline-block h-[1em] w-[3px] bg-accent-ink" />
        </p>

        <div className="mt-8 flex flex-wrap gap-[14px]">
          <Button href={GITHUB_URL} external>
            {h.ctaGithub}
          </Button>
          <Button href="#sobre" variant="outline">
            {h.ctaStory}
          </Button>
        </div>
      </div>

      {/* ------------------------- polaroid + post-it ------------------------ */}
      <div className="relative h-[470px] w-full max-w-[520px] lg:flex-1">
        <div className="sway absolute top-0 right-[4%] left-[39.5%] flex justify-center">
          <Polaroid
            width={270}
            ratio={1}
            rotate={3}
            padding="14px 14px 56px"
            captionClass="text-[28px] !bottom-3"
            hint={h.photoHint}
            caption={h.photoCaption}
            photoStyle={{
              backgroundImage:
                'linear-gradient(160deg, #7a2440 0%, #55122a 60%, #51364a 100%)',
            }}
          >
            <span className="font-hand text-[96px] leading-[96px] font-bold text-[#d8d2de]/90">RF</span>
          </Polaroid>
        </div>

        <aside className="absolute bottom-[27px] left-[-8px] w-[200px] -rotate-6 bg-blush px-[18px] pt-[22px] pb-[26px] shadow-[0_18px_30px_-14px_var(--c-shadow)]">
          <Tape
            mask={assets.tape.b}
            tone="pink"
            width={80}
            height={24}
            className="top-[-14px] left-[calc(50%-48px)] rotate-3"
          />
          <p className="font-type text-[11px] tracking-[0.88px] text-ink uppercase opacity-75">
            {h.noteLabel}
          </p>
          <p className="mt-[5px] font-hand text-[34px] leading-[34px] font-bold text-ink">
            {h.noteTitle}
          </p>
          <p className="pt-px font-hand text-[22px] leading-[24.2px] text-ink">{h.noteMeta}</p>
        </aside>

        <span
          aria-hidden
          className="mask-asset absolute bottom-[150px] left-[150px] h-[70px] w-24 bg-accent-ink"
          style={{ '--mask': `url("${assets.arrowCurve}")` } as CSSProperties}
        />
      </div>
    </section>
  )
}
