import type { CSSProperties } from 'react'
import { assets } from '../assets/figma'
import { Button, Polaroid } from '../components/ui'
import { useI18n } from '../i18n/I18nProvider'

const tape = (mask: string, rotate: number) => ({ mask, rotate, width: 80, height: 26 })

export function ArtHero() {
  const { t } = useI18n()
  const h = t.art.hero

  return (
    <section
     
      className="flex flex-col items-center gap-10 pt-[76px] pb-[76px] pl-[var(--gutter)] pr-4 sm:pr-10 lg:flex-row"
    >
      {/* ------------------------------ texto ------------------------------ */}
      <div className="w-full lg:flex-1">
        <span className="inline-block -rotate-3 border-[3px] border-accent-ink px-[14px] py-2 font-type text-[13px] font-bold tracking-[1.04px] text-accent-ink uppercase">
          {h.badge}
        </span>

        <h1 className="mt-3 font-hand text-[clamp(60px,9vw,107.5px)] leading-[0.92] font-bold tracking-[-1.075px] text-ink">
          {h.titleStart}
          <span className="mark -mt-[18px] block w-fit py-[18px]">{h.titleMark}</span>
        </h1>

        <p className="mt-2 max-w-[470px] text-[18px] leading-[31.5px] text-muted">{h.intro}</p>

        <div className="mt-8 flex flex-wrap gap-[14px]">
          <Button href="#obras">{h.ctaWorks}</Button>
          <Button href="/" variant="outline">
            {h.ctaDev}
          </Button>
        </div>
      </div>

      {/* ----------------------- três fotos coladas ---------------------- */}
      <div className="relative h-[480px] w-full max-w-[520px] lg:flex-1">
        {/* aquarela */}
        <div className="sway absolute top-[16px] left-[-4%] w-[246px]">
          <Polaroid
            width={246}
            ratio={222 / 296}
            rotate={-7}
            padding="12px 12px 40px"
            tape={tape(assets.tape.art[0], -5)}
            photoStyle={{
              backgroundColor: '#fbf7f9',
              backgroundImage:
                'radial-gradient(ellipse 60% 50% at 30% 30%, rgb(232 137 165 / 0.8), transparent 72%), radial-gradient(ellipse 55% 60% at 70% 65%, rgb(157 176 198 / 0.8), transparent 72%), radial-gradient(ellipse 42% 42% at 55% 20%, rgb(201 117 143 / 0.667), transparent 72%)',
            }}
          />
        </div>

        {/* geométrica vinho */}
        <div className="sway absolute top-[-10px] right-0 w-[236px]">
          <Polaroid
            width={236}
            ratio={212 / 283}
            rotate={5}
            padding="12px 12px 40px"
            tape={tape(assets.tape.art[1], 4)}
            photoStyle={{
              backgroundColor: '#7a2440',
              backgroundImage:
                'linear-gradient(70deg, #55122a 0 34%, transparent 34%), linear-gradient(120deg, #d8d2de 0 22%, transparent 22%), radial-gradient(circle at 30% 65%, #e889a5 0 17%, transparent 18%)',
            }}
          />
        </div>

        {/* digital */}
        <div className="sway absolute bottom-[-4px] left-[25%] w-[226px]">
          <Polaroid
            width={226}
            ratio={202 / 270}
            rotate={-2}
            padding="12px 12px 40px"
            tape={tape(assets.tape.art[2], 0)}
            photoStyle={{
              backgroundImage:
                'conic-gradient(from 100deg at 30% 70%, #7a2440 0%, #963d59 6.25%, #b15773 12.5%, #cd708c 18.75%, #e889a5 25%, #c17d96 31.25%, #9a7288 37.5%, #736679 43.75%, #4c5a6a 50%, #3b3b4c 62.5%, #2a1b2e 75%, #522037 87.5%, #7a2440 100%)',
            }}
          />
        </div>

        <p className="absolute bottom-[18px] left-[-21px] -rotate-8 font-hand text-[34px] leading-[34px] font-bold whitespace-nowrap text-accent-ink">
          {h.handmade}
        </p>
        <span
          aria-hidden
          className="mask-asset absolute bottom-[70px] left-[70px] h-[60px] w-[70px] bg-accent-ink"
          style={{ '--mask': `url("${assets.arrowDownLeft}")` } as CSSProperties}
        />
      </div>
    </section>
  )
}
