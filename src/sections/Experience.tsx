import { useEffect, useRef } from 'react'
import type { CSSProperties } from 'react'
import { assets } from '../assets/figma'
import { Polaroid, Tape, TagChip } from '../components/ui'
import { photoGradient } from '../lib/styles'
import { useI18n } from '../i18n/I18nProvider'
import { useReducedMotion } from '../lib/useReducedMotion'

/** Distância do topo da lista até onde a linha começa. */
const LINE_TOP = 19
/** A linha "escreve" até este ponto da altura da janela (0 = topo, 1 = base). */
const ANCHOR = 0.65

export function Experience() {
  const { t } = useI18n()
  const e = t.experience
  const listRef = useRef<HTMLOListElement>(null)
  const reduceMotion = useReducedMotion()

  // A linha é desenhada conforme a página desce; cada selo é carimbado quando
  // a ponta da linha chega nele. Tudo via CSS vars/atributos, sem re-render.
  useEffect(() => {
    const list = listRef.current
    if (!list) return
    const items = Array.from(list.querySelectorAll<HTMLElement>('li[data-stamp]'))
    let frame = 0

    const update = () => {
      frame = 0
      const { top, height } = list.getBoundingClientRect()
      const drawn = reduceMotion
        ? height
        : Math.min(Math.max(window.innerHeight * ANCHOR - top, 0), height)
      list.style.setProperty('--drawn', `${drawn}px`)
      list.style.setProperty('--pen', !reduceMotion && drawn > LINE_TOP && drawn < height ? '1' : '0')
      for (const li of items) li.dataset.stamped = String(drawn >= li.offsetTop + 26)
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      cancelAnimationFrame(frame)
    }
  }, [reduceMotion])

  const lineImage: CSSProperties = {
    backgroundImage: `url(${assets.timelineA}), url(${assets.timelineB})`,
    backgroundSize: '100% 1024px',
    backgroundRepeat: 'repeat-y',
  }

  return (
    <section id="exp" className="pt-[76px] pb-[89px] pl-[var(--gutter)] pr-4 sm:pr-10">
      <div className="grid gap-x-14 gap-y-12 lg:grid-cols-2">
        {/* ------------------------ coluna fixa: título + fotos ----------------------- */}
        <div className="flex max-w-[360px] flex-col gap-[6px] self-start lg:sticky lg:top-24">
          <h2 className="font-hand text-[clamp(44px,6vw,76.8px)] leading-[73.73px] font-bold text-ink">
            <span className="block">{e.titleStart}</span>
            <span className="mark -mt-3 block w-fit py-[11.5px]">{e.titleMark}</span>
          </h2>
          <p className="text-[16.5px] leading-[29.7px] text-muted">{e.intro}</p>
          <div className="flex flex-col items-center gap-2 pt-6">
            <Polaroid
              width={320}
              ratio={295.19 / 368.98}
              rotate={-3}
              hint={e.photoHint}
              caption={e.photoCaption}
              photoStyle={photoGradient(170)}
            />
            <div className="pt-8">
              <Polaroid
                width={350}
                ratio={404 / 252.5}
                rotate={3}
                hint={e.photoHint}
                caption={e.photoCaption}
                photoStyle={photoGradient(175)}
              />
            </div>
          </div>
        </div>

        {/* ------------------------------ linha do tempo ------------------------------ */}
        <ol
          ref={listRef}
          className="relative m-0 flex w-full max-w-[569px] list-none flex-col justify-self-end p-0 pl-[55px]"
        >
          {/* trilho apagado: mostra o caminho que a linha ainda vai percorrer */}
          <span
            aria-hidden
            className="absolute bottom-0 left-3 w-1 opacity-20"
            style={{ top: LINE_TOP, ...lineImage }}
          />
          {/* linha "escrita": cresce com o scroll */}
          <span
            aria-hidden
            className="absolute left-3 w-1 overflow-hidden"
            style={{
              top: LINE_TOP,
              height: `max(0px, calc(var(--drawn, 0px) - ${LINE_TOP}px))`,
              ...lineImage,
            }}
          />
          {/* ponta da caneta, só enquanto a linha está sendo desenhada */}
          <span
            aria-hidden
            className="absolute left-[10px] size-3 rounded-full bg-accent-ink transition-opacity duration-200"
            style={{ top: 'calc(var(--drawn, 0px) - 6px)', opacity: 'var(--pen, 0)' }}
          />
          {e.items.map((item, i) => {
            const tilt = i % 2 === 0 ? -0.8 : 0.8
            return (
              <li key={item.role.join(' ')} data-stamp className="relative pb-[41px]">
                <span
                  aria-hidden
                  className="pin absolute top-[13px] left-[-53px] size-[26px] rounded-[13px]"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle at 35% 30%, #f4c6d3 0, #e8a5b6 11%, #db8499 22%, #cf627c 34%, #c2415f 45%, #9e3350 72%, #7a2440 100%)',
                  }}
                />
                <article
                  className="ruled relative flex flex-col gap-[6px] px-[26px] pt-7 pb-6 shadow-[0_16px_30px_-16px_var(--c-shadow)]"
                  style={{ '--pitch': '32px', transform: `rotate(${tilt}deg)` } as CSSProperties}
                >
                  <Tape
                    mask={assets.tape.exp[i % 3]}
                    className="top-[-16px] right-[23px] rotate-5"
                  />
                  <p className="font-type text-[12px] font-bold tracking-[0.96px] text-accent-ink">{item.period}</p>
                  <h3 className="font-hand text-[36px] leading-9 font-bold text-ink">
                    {item.role.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </h3>
                  <p className="text-[14.5px] text-muted">{item.org}</p>
                  <p className="max-w-[560px] pt-[7px] text-[16px] leading-8 text-ink">{item.text}</p>

                  {item.award && (
                    <p className="my-2 w-fit -rotate-2 rounded-[6px] border-2 border-dashed border-white/65 bg-accent px-4 py-[6px] font-hand text-[24px] font-bold text-on-accent">
                      {item.award}
                    </p>
                  )}

                  <ul className="m-0 mt-2 flex list-none flex-wrap gap-2 p-0">
                    {item.tags.map((tag) => (
                      <li key={tag}>
                        <TagChip>{tag}</TagChip>
                      </li>
                    ))}
                  </ul>
                </article>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
