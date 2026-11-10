import type { CSSProperties } from 'react'
import { assets } from '../assets/figma'
import { Button, Tape, TagChip } from '../components/ui'
import { cx } from '../lib/styles'
import { useI18n } from '../i18n/I18nProvider'
import { GITHUB_URL } from './Hero'

const tilts = [-1.4, 1, -0.7, 1.3, -1]
const tapes = [assets.tape.proj[0], assets.tape.proj[0], assets.tape.a, assets.tape.proj[1], assets.tape.proj[1]]

export function Projects() {
  const { t } = useI18n()
  const p = t.projects

  return (
    <section
      id="proj"
      className="flex flex-col gap-14 pt-[76px] pb-[89px] pl-[var(--gutter)] pr-4 sm:pr-10"
    >
      <header className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
        <div className="flex max-w-[600px] flex-col gap-[6px]">
          <h2 className="font-hand text-[clamp(44px,6vw,76.8px)] leading-[73.73px] font-bold text-ink">
            <span className="mark inline-block py-[11.5px]">{p.title}</span>
          </h2>
          <p className="text-[17px] leading-[30.6px] text-muted">{p.intro}</p>
        </div>
        <Button href={GITHUB_URL} external variant="outline" className="!py-[7.5px]">
          {p.all} <span aria-hidden>→</span>
        </Button>
      </header>

      <ul className="m-0 grid list-none gap-x-7 gap-y-[34px] p-0 md:grid-cols-2 lg:grid-cols-3">
        {p.items.map((item, i) => (
          <li key={item.name.join(' ')} className={cx('self-start', i % 2 === 1 && 'md:mt-[45px] lg:mt-[45px]')}>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="relative flex min-h-[270px] flex-col bg-card px-6 pt-[30px] pb-6 shadow-[0_16px_30px_-16px_var(--c-shadow)] transition-transform hover:-translate-y-1"
              style={{ transform: `rotate(${tilts[i]}deg)` } as CSSProperties}
            >
              <Tape
                mask={tapes[i]}
                className="top-[-15px] left-1/2 -translate-x-1/2 -rotate-3"
              />
              <span className="w-fit bg-accent px-[10px] py-[3px] font-type text-[11px] font-bold tracking-[1.1px] text-on-accent">
                {item.kind}
              </span>
              <h3 className="mt-[19px] font-hand text-[40px] leading-[39.2px] font-bold text-ink">
                {item.name.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h3>
              <p className="mt-[14px] text-[15.5px] leading-[26.35px] text-muted">{item.text}</p>
              <ul className="m-0 mt-4 flex list-none flex-wrap gap-[7px] p-0">
                {item.tags.map((tag) => (
                  <li key={tag}>
                    <TagChip size="sm">{tag}</TagChip>
                  </li>
                ))}
              </ul>
              <span className="mt-auto pt-5 font-hand text-[24px] font-semibold text-accent-ink">
                {p.viewOnGithub} →
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
