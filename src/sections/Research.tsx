import type { CSSProperties } from 'react'
import { TagChip } from '../components/ui'
import { useI18n } from '../i18n/I18nProvider'

/** Altura da faixa de cabeçalho que continua visível quando outro cartão cobre. */
const PEEK = 64
/** Distância do topo da tela onde o primeiro cartão trava (abaixo do header). */
const TOP = 92

const tilts = [-1, 0.8, -0.6, 0.9]
const flagTones = ['bg-tab-home', 'bg-tab-about', 'bg-tab-exp', 'bg-tab-proj', 'bg-tab-contact']
const flagTilts = [-3, 2, -1.5, 3, -2]

/** Ponta de "porta-retrato" que prende o cartão ao caderno pelos cantos. */
const corners: { pos: string; clip: string }[] = [
  { pos: 'top-0 left-0', clip: 'polygon(0 0, 100% 0, 0 100%)' },
  { pos: 'top-0 right-0', clip: 'polygon(0 0, 100% 0, 100% 100%)' },
  { pos: 'bottom-0 left-0', clip: 'polygon(0 0, 0 100%, 100% 100%)' },
  { pos: 'bottom-0 right-0', clip: 'polygon(100% 0, 100% 100%, 0 100%)' },
]

function CornerMounts() {
  return (
    <>
      {corners.map(({ pos, clip }) => (
        <span
          key={pos}
          aria-hidden
          className={`pointer-events-none absolute z-10 size-7 bg-accent drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)] ${pos}`}
          style={{ clipPath: clip }}
        />
      ))}
    </>
  )
}

/** Bandeirinha/marcador de página com rabo de andorinha, como as de post-it. */
function Flag({ label, i }: { label: string; i: number }) {
  return (
    <li
      className={`${flagTones[i % flagTones.length]} py-[7px] pr-7 pl-4 font-hand text-[22px] leading-none font-semibold text-ink shadow-[0_6px_10px_-6px_var(--c-shadow)]`}
      style={{
        transform: `rotate(${flagTilts[i % flagTilts.length]}deg)`,
        clipPath: 'polygon(0 0, 100% 0, calc(100% - 12px) 50%, 100% 100%, 0 100%)',
      }}
    >
      {label}
    </li>
  )
}

/**
 * Seção de pesquisa / currículo acadêmico.
 * Cada item é um cartão postal preso pelas pontas; ao rolar, um cobre o outro
 * (`sticky` escalonado) e só a faixa de cabeçalho do anterior fica visível.
 */
export function Research() {
  const { t } = useI18n()
  const r = t.research

  return (
    <section
      id="pesquisa"
      className="flex flex-col gap-12 pt-[76px] pb-[89px] pl-[var(--gutter)] pr-4 sm:pr-10"
    >
      <header className="flex max-w-[620px] flex-col gap-[6px]">
        <h2 className="font-hand text-[clamp(44px,6vw,76.8px)] leading-[73.73px] font-bold text-ink">
          <span className="mark inline-block py-[11.5px]">{r.title}</span>
        </h2>
        <p className="text-[17px] leading-[30.6px] text-muted">{r.intro}</p>
      </header>

      {/* marcadores com as linhas de pesquisa, antes dos cartões */}
      <div>
        <p className="mb-3 font-type text-[12px] font-bold tracking-[1.2px] text-muted uppercase">
          {r.interestsLabel}
        </p>
        <ul className="m-0 flex list-none flex-wrap gap-x-3 gap-y-4 p-0">
          {r.interests.map((label, i) => (
            <Flag key={label} label={label} i={i} />
          ))}
        </ul>
      </div>

      {/*
        Grade: cada cartão ocupa da sua linha até o fim da grade, então todos ficam
        presos até o fim. A margem inferior decrescente faz a área de cada um terminar
        mais cedo, na mesma medida em que o topo dele é mais baixo; assim a pilha
        inteira se solta junto, sem o último cobrir o cabeçalho dos anteriores.
        A última linha (30vh) é o tempo em que a pilha completa fica parada.
      */}
      <ul
        className="m-0 mx-auto grid w-full max-w-[780px] list-none p-0"
        style={{ gridTemplateColumns: "minmax(0, 1fr)", gridTemplateRows: `repeat(${r.items.length - 1}, 75vh) auto 30vh` }}
      >
        {r.items.map((item, i) => (
          <li
            key={item.title}
            className="sticky self-start"
            style={{
              top: TOP + i * PEEK,
              zIndex: i + 1,
              gridColumn: 1,
              gridRow: `${i + 1} / -1`,
              marginBottom: (r.items.length - 1 - i) * PEEK,
            }}
          >
            <article
              className="relative bg-card shadow-[0_-10px_24px_-14px_var(--c-shadow),0_18px_32px_-16px_var(--c-shadow)]"
              style={{ transform: `rotate(${tilts[i % tilts.length]}deg)` } as CSSProperties}
            >
              <CornerMounts />

              {/* cabeçalho: única parte visível quando o cartão está coberto */}
              <header
                className="flex items-center gap-3 border-b border-dashed border-dash pr-12 pl-10"
                style={{ height: PEEK }}
              >
                <span className="shrink-0 bg-accent px-[10px] py-[3px] font-type text-[11px] font-bold tracking-[1.1px] text-on-accent">
                  {item.kind}
                </span>
                <h3 className="m-0 min-w-0 flex-1 truncate font-hand text-[clamp(22px,2.4vw,29px)] leading-none font-bold text-ink">
                  {item.title}
                </h3>
                <span className="shrink-0 font-type text-[13px] font-bold text-accent-ink">{item.year}</span>
              </header>

              <div className="flex flex-col gap-5 p-6 pt-5 sm:flex-row sm:gap-6">
                {/* frente do cartão: imagem / brasão do evento */}
                <div className="sm:w-[42%] sm:shrink-0">
                  <div className="bg-polaroid p-2 shadow-[0_6px_14px_-8px_var(--c-shadow)]">
                    <div
                      className="flex aspect-[4/3] items-center justify-center text-center"
                      style={{
                        backgroundImage:
                          'linear-gradient(160deg, #7a2440 0%, #55122a 60%, #51364a 100%)',
                      }}
                    >
                      <span className="px-3 font-type text-[11px] text-[#f4c6d3]">{r.imageHint}</span>
                    </div>
                  </div>
                </div>

                {/* verso: texto, com a linha vertical dos cartões postais */}
                <div className="flex min-w-0 flex-1 flex-col sm:border-l sm:border-dashed sm:border-dash sm:pl-6">
                  <p className="m-0 font-type text-[12px] font-bold tracking-[0.8px] text-accent-ink uppercase">
                    {item.venue}
                  </p>
                  <p className="m-0 mt-3 text-[15.5px] leading-[26.35px] text-muted">{item.text}</p>
                  <ul className="m-0 mt-4 flex list-none flex-wrap gap-[7px] p-0">
                    {item.tags.map((tag, k) => (
                      <li key={`${tag}-${k}`}>
                        <TagChip size="sm">{tag}</TagChip>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  )
}
