import { useMemo, useState } from 'react'
import type { CSSProperties } from 'react'
import { assets } from '../assets/figma'
import { Tape } from '../components/ui'
import { useI18n } from '../i18n/I18nProvider'
import { cx } from '../lib/styles'

type Material = 'watercolor' | 'graphite' | 'digital' | 'acrylic'
type Filter = 'all' | Material

const filters: Material[] = ['watercolor', 'graphite', 'digital', 'acrylic']

/** Ordem das obras em "Todas": 3 de cada material (grafite, aquarela, digital, ... acrílica). */
const works: Material[] = [
  'graphite', 'watercolor', 'digital',
  'graphite', 'watercolor', 'digital',
  'graphite', 'watercolor', 'digital',
  'acrylic', 'acrylic', 'acrylic',
]

interface Spec {
  landscape: boolean
  rotate: number
  tape: number
  photo: CSSProperties
}

/* Fotos de exemplo (placeholders) no estilo de cada material. */
const specs: Record<Material, Spec> = {
  graphite: {
    landscape: false,
    rotate: 3.74,
    tape: 0,
    photo: {
      backgroundColor: '#f1ecf3',
      backgroundImage:
        'repeating-linear-gradient(133.5deg, rgb(42 27 46 / 0.32) 0 0.6px, transparent 0.6px 3.2px), repeating-linear-gradient(206deg, rgb(42 27 46 / 0.14) 0 0.6px, transparent 0.6px 4.3px)',
    },
  },
  watercolor: {
    landscape: false,
    rotate: -6.23,
    tape: 0,
    photo: {
      backgroundColor: '#fbf7f9',
      backgroundImage:
        'radial-gradient(ellipse 60% 50% at 30% 30%, rgb(232 137 165 / 0.8), transparent 72%), radial-gradient(ellipse 55% 60% at 70% 65%, rgb(157 176 198 / 0.8), transparent 72%), radial-gradient(ellipse 42% 42% at 55% 20%, rgb(201 117 143 / 0.667), transparent 72%)',
    },
  },
  digital: {
    landscape: true,
    rotate: 4.01,
    tape: 1,
    photo: {
      backgroundImage:
        'conic-gradient(from 100deg at 30% 70%, #7a2440 0%, #963d59 6.25%, #b15773 12.5%, #cd708c 18.75%, #e889a5 25%, #c17d96 31.25%, #9a7288 37.5%, #736679 43.75%, #4c5a6a 50%, #3b3b4c 62.5%, #2a1b2e 75%, #522037 87.5%, #7a2440 100%)',
    },
  },
  // Não existe no Figma (só há 9 das 12 obras desenhadas): placeholder próprio.
  acrylic: {
    landscape: false,
    rotate: -3,
    tape: 0,
    photo: {
      backgroundColor: '#7a2440',
      backgroundImage:
        'linear-gradient(70deg, #55122a 0 34%, transparent 34%), linear-gradient(120deg, #d8d2de 0 22%, transparent 22%), radial-gradient(circle at 30% 65%, #e889a5 0 17%, transparent 18%)',
    },
  },
}

/** Agrupa em linhas: duas fotos verticais lado a lado; horizontais sozinhas. */
function toRows(items: Material[]): Material[][] {
  const rows: Material[][] = []
  for (let i = 0; i < items.length; i++) {
    const current = items[i]
    const next = items[i + 1]
    if (!specs[current].landscape && next && !specs[next].landscape) {
      rows.push([current, next])
      i++
    } else {
      rows.push([current])
    }
  }
  return rows
}

function Print({ material }: { material: Material }) {
  const { t } = useI18n()
  const g = t.art.gallery
  const spec = specs[material]

  return (
    <figure
      className="relative m-0 flex flex-col gap-[10px] bg-polaroid px-3 pt-3 pb-[14px] shadow-[0_18px_30px_-16px_var(--c-shadow)]"
      style={
        spec.landscape
          ? { width: '100%', maxWidth: 548, aspectRatio: '548 / 375', transform: `rotate(${spec.rotate}deg)` }
          : { width: 262, height: 383, transform: `rotate(${spec.rotate}deg)` }
      }
    >
      <Tape
        mask={assets.tape.gallery[spec.tape]}
        width={88}
        height={26}
        className="top-[-14px] left-1/2 -translate-x-1/2"
      />
      <div className="min-h-0 w-full flex-1" style={spec.photo} role="img" aria-label={g.photoAlt} />
      <figcaption className="font-type text-[11.5px] whitespace-nowrap text-muted">
        {g.materials[material]} · {g.captionMeta}
      </figcaption>
    </figure>
  )
}

export function Gallery() {
  const { t } = useI18n()
  const g = t.art.gallery
  const [filter, setFilter] = useState<Filter>('all')

  const visible = useMemo(
    () => (filter === 'all' ? works : works.filter((m) => m === filter)),
    [filter],
  )
  const rows = useMemo(() => toRows(visible), [visible])
  const count = (f: Filter) => (f === 'all' ? works.length : works.filter((m) => m === f).length)

  return (
    <section id="obras" className="pt-[76px] pb-[89px] pl-[var(--gutter)] pr-4 sm:pr-10">
      <div className="grid gap-x-10 gap-y-12 lg:grid-cols-[340px_1fr]">
        {/* ------------------------ coluna fixa: título + filtro ----------------------- */}
        <div className="flex max-w-[340px] flex-col gap-[17px] self-start lg:sticky lg:top-24">
          <h2 className="font-hand text-[clamp(48px,6vw,71.7px)] leading-[68.81px] font-bold text-ink">
            {g.titleStart} <span className="mark">{g.titleMark}</span>
          </h2>

          <div role="group" aria-label={g.filterLabel} className="flex flex-col pt-[9px]">
            {(['all', ...filters] as Filter[]).map((f) => {
              const active = filter === f
              return (
                <button
                  key={f}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(f)}
                  className="flex min-h-[52px] w-fit cursor-pointer items-center py-0.5 text-left"
                >
                  <span
                    className={cx(
                      'px-1.5 py-[2.5px] font-hand text-[clamp(36px,4.5vw,50px)] leading-[57.5px] font-bold whitespace-nowrap',
                      active ? 'mark text-accent-ink' : 'text-muted',
                    )}
                  >
                    {f === 'all' ? g.all : g.materials[f]}
                  </span>
                  <span
                    className={cx(
                      'mb-3 ml-1 font-type text-[12px] leading-[13.8px]',
                      active ? 'text-accent-ink' : 'text-muted',
                    )}
                  >
                    {count(f)}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* ------------------------------ galeria ------------------------------ */}
        <div className="flex w-full flex-col items-center gap-[22px] justify-self-end px-0 pt-7 pb-6 sm:px-[50px] lg:w-[649px]">
          {rows.map((row, i) => (
            <div
              key={`${filter}-${i}`}
              className={cx(
                'flex w-full max-w-[548px] items-center justify-center gap-6',
                specs[row[0]].landscape ? 'py-2' : 'min-h-[383px] flex-wrap',
              )}
            >
              {row.map((material, j) => (
                <Print key={`${material}-${j}`} material={material} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
