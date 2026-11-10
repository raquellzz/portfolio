import type { CSSProperties } from 'react'
import { assets } from '../assets/figma'
import { Ribbon, Tape } from '../components/ui'
import { cx } from '../lib/styles'
import { useI18n } from '../i18n/I18nProvider'

type Tone = 'ink' | 'rose' | 'azure'
const toneClass: Record<Tone, string> = {
  ink: 'bg-badge-ink',
  rose: 'bg-accent',
  azure: 'bg-badge-muted',
}
const tones: Tone[] = ['ink', 'rose', 'azure']

/** [sigla do selo, nome] — a cor do selo alterna ink → rose → azure. */
const groups: Array<{ key: 'languages' | 'frontend' | 'backend' | 'data'; tilt: number; items: Array<[string, string]> }> = [
  {
    key: 'languages',
    tilt: -1.12,
    items: [['Py', 'Python'], ['TS', 'TypeScript'], ['JS', 'JavaScript'], ['Jv', 'Java'], ['C#', 'C#'], ['Zg', 'Zig']],
  },
  {
    key: 'frontend',
    tilt: 1.76,
    items: [['Re', 'React'], ['Nx', 'Next.js'], ['Tw', 'Tailwind CSS'], ['Zs', 'Zustand'], ['Zd', 'Zod']],
  },
  {
    key: 'backend',
    tilt: -2.94,
    items: [['SB', 'Spring Boot'], ['FA', 'FastAPI'], ['Fl', 'Flask'], ['MA', '.NET MAUI'], ['Rs', 'APIs REST']],
  },
  {
    key: 'data',
    tilt: 2.01,
    items: [['Pg', 'PostgreSQL'], ['Dk', 'Docker'], ['Gh', 'Git / GitHub'], ['Jm', 'JMeter'], ['Se', 'Selenium'], ['Pd', 'Pandas']],
  },
]

export function Stack() {
  const { t } = useI18n()
  const s = t.stack

  return (
    <section id="stack" className="flex flex-col gap-[34px] pt-[76px] pb-[89px] pl-[var(--gutter)] pr-4 sm:pr-10">
      <header className="flex max-w-[600px] flex-col gap-[6px]">
        <h2 className="font-hand text-[clamp(44px,6vw,76.8px)] leading-[73.73px] font-bold text-ink">
          <span className="mark inline-block py-[11.5px]">{s.title}</span>
        </h2>
        <p className="text-[17px] leading-[30.6px] text-muted">{s.intro}</p>
      </header>

      <div className="grid gap-x-[30px] gap-y-[35px] pt-[10px] md:grid-cols-2 lg:grid-cols-3">
        {groups.map((group) => (
          <article
            key={group.key}
            className="ruled relative self-start px-5 pt-7 pb-[22px] shadow-[0_16px_28px_-16px_var(--c-shadow)]"
            style={{ '--pitch': '28px', transform: `rotate(${group.tilt}deg)` } as CSSProperties}
          >
            <Tape
              mask={assets.tape.stack}
              width={78}
              height={24}
              className="top-[-14px] left-[19px] -rotate-4"
            />
            <h3 className="font-hand text-[30px] leading-[30px] font-bold text-accent-ink">
              {s.groups[group.key]}
            </h3>
            <ul className="m-0 mt-[18px] flex list-none flex-wrap gap-x-2 gap-y-3 p-0">
              {group.items.map(([code, name], i) => (
                <li
                  key={name}
                  className={cx(
                    'flex h-11 items-center gap-2 rounded-full bg-pill py-1 pr-[14px] pl-[5px] shadow-[0_0_0_3px_var(--c-pill),0_8px_14px_-4px_var(--c-shadow)]',
                    i % 2 === 0 ? '-rotate-2' : 'rotate-[1.6deg]',
                  )}
                >
                  <span
                    className={cx(
                      'flex size-8 items-center justify-center rounded-2xl font-type text-[11px] font-bold text-white',
                      toneClass[tones[i % 3]],
                    )}
                  >
                    {code}
                  </span>
                  <span className="text-[14px] font-medium whitespace-nowrap text-ink">{name}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <ul className="m-0 flex list-none flex-wrap gap-x-[10px] gap-y-[10px] p-0">
        {s.concepts.map((concept, i) => (
          <li key={concept}>
            <Ribbon mask={assets.labelRose[i]} tone="pink">
              {concept}
            </Ribbon>
          </li>
        ))}
      </ul>
    </section>
  )
}
