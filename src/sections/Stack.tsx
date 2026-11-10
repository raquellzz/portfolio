import { useEffect, useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import type { Announcements, DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { assets } from '../assets/figma'
import { techIcons } from '../assets/techIcons'
import type { TechIcon } from '../assets/techIcons'
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

/** Ícone do Simple Icons ou, quando a marca não tem ícone livre, uma sigla. */
type Glyph = { icon: TechIcon } | { text: string }
type Item = [name: string, glyph: Glyph]

const groups: Array<{
  key: 'languages' | 'frontend' | 'backend' | 'data'
  tilt: number
  items: Item[]
}> = [
  {
    key: 'languages',
    tilt: -1.12,
    items: [
      ['Python', { icon: 'python' }],
      ['TypeScript', { icon: 'typescript' }],
      ['JavaScript', { icon: 'javascript' }],
      ['Java', { icon: 'java' }],
      ['C#', { text: 'C#' }],
      ['Zig', { icon: 'zig' }],
    ],
  },
  {
    key: 'frontend',
    tilt: 1.76,
    items: [
      ['React', { icon: 'react' }],
      ['Next.js', { icon: 'next' }],
      ['Tailwind CSS', { icon: 'tailwind' }],
      ['Zustand', { text: 'Zu' }],
      ['Zod', { icon: 'zod' }],
    ],
  },
  {
    key: 'backend',
    tilt: -2.94,
    items: [
      ['Spring Boot', { icon: 'spring' }],
      ['FastAPI', { icon: 'fastapi' }],
      ['Flask', { icon: 'flask' }],
      ['.NET MAUI', { icon: 'dotnet' }],
      ['APIs REST', { icon: 'rest' }],
    ],
  },
  {
    key: 'data',
    tilt: 2.01,
    items: [
      ['PostgreSQL', { icon: 'postgres' }],
      ['Docker', { icon: 'docker' }],
      ['Git / GitHub', { icon: 'git' }],
      ['JMeter', { icon: 'jmeter' }],
      ['Selenium', { icon: 'selenium' }],
      ['Pandas', { icon: 'pandas' }],
    ],
  },
]

const stickerTilt = [-3, 2, -1.5, 3, -2.5, 1.5]

/* ---------------------------- enfeites de scrapbook ---------------------------- */

/** Borda rasgada na base, para o post-it. */
const tornEdge = (() => {
  const teeth = 14
  const pts = ['0 0', '100% 0']
  for (let i = teeth; i >= 0; i--) {
    pts.push(`${((i / teeth) * 100).toFixed(2)}% calc(100% - ${i % 2 ? 0 : 7}px)`)
  }
  return `polygon(${pts.join(',')})`
})()

function Squiggle() {
  return (
    <svg aria-hidden width="92" height="10" viewBox="0 0 92 10" className="mt-1 text-accent-ink">
      <path
        d="M2 5c5-5 8 5 13 0s8 5 13 0 8 5 13 0 8 5 13 0 8 5 13 0 8 5 13 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

function Sparkle({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={cx('absolute size-5 text-accent-ink', className)}>
      <path d="M12 2c.6 5.4 4.6 9.4 10 10-5.4.6-9.4 4.6-10 10-.6-5.4-4.6-9.4-10-10 5.4-.6 9.4-4.6 10-10z" fill="currentColor" />
    </svg>
  )
}

function Paperclip({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      width="26"
      height="64"
      viewBox="0 0 26 64"
      className={cx('pointer-events-none absolute drop-shadow-[2px_3px_2px_rgba(0,0,0,0.25)]', className)}
    >
      <path
        d="M8 40V15a5 5 0 0110 0v36a8 8 0 01-16 0V18"
        transform="translate(3 2)"
        fill="none"
        stroke="var(--c-ring)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Pushpin({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cx(
        'pointer-events-none absolute size-[22px] rounded-full bg-accent shadow-[3px_5px_0_0_rgb(42_27_46/0.3)]',
        'before:absolute before:top-[4px] before:left-[5px] before:size-[6px] before:rounded-full before:bg-white/55',
        className,
      )}
    />
  )
}

/* -------------------------------- adesivo --------------------------------- */

const stickerClass = 'sticker flex h-11 items-center gap-2 rounded-full bg-pill py-1 pr-[18px] pl-[5px]'

/** Conteúdo do adesivo (usado no item da lista e no que segue o ponteiro). */
function StickerFace({ name, glyph, index }: { name: string; glyph: Glyph; index: number }) {
  return (
    <>
      <span
        className={cx(
          'flex size-8 items-center justify-center text-white',
          index % 2 ? 'rounded-[10px]' : 'rounded-full',
          toneClass[tones[index % 3]],
        )}
      >
        {'icon' in glyph ? (
          <svg aria-hidden viewBox="0 0 24 24" className="size-[18px] fill-current">
            <path d={techIcons[glyph.icon]} />
          </svg>
        ) : (
          <span className="font-type text-[12px] leading-none font-bold">{glyph.text}</span>
        )}
      </span>
      <span className="text-[14px] font-medium whitespace-nowrap text-ink">{name}</span>
    </>
  )
}

const tiltOf = (index: number) => ({ '--r': `${stickerTilt[index % stickerTilt.length]}deg` }) as CSSProperties

interface SortableStickerProps {
  name: string
  glyph: Glyph
  /** posição original: mantém cor do selo e inclinação junto com a tecnologia */
  index: number
  landed: boolean
  onLanded: () => void
}

/**
 * Passar o mouse dobra a ponta; apertar "descola" (e libera o arrasto);
 * soltar em outra posição cola de novo.
 */
function SortableSticker({ name, glyph, index, landed, onLanded }: SortableStickerProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: name })
  const [pressed, setPressed] = useState(false)
  const [pop, setPop] = useState(false)
  const release = () => setPressed(false)

  return (
    <li ref={setNodeRef} style={{ transform: CSS.Translate.toString(transform), transition }}>
      <div
        {...attributes}
        {...listeners}
        className={stickerClass}
        style={tiltOf(index)}
        data-no-ink
        data-pressed={pressed && !isDragging}
        data-pop={pop || landed}
        data-slot={isDragging}
        onPointerDown={() => setPressed(true)}
        onPointerUp={release}
        onPointerLeave={release}
        onPointerCancel={release}
        onClick={() => setPop(true)}
        onAnimationEnd={() => {
          setPop(false)
          onLanded()
        }}
      >
        <StickerFace name={name} glyph={glyph} index={index} />
      </div>
    </li>
  )
}

/** Um bloco de adesivos: cada grupo tem o seu DndContext, então só reordena dentro dele. */
function StickerList({ items }: { items: Item[] }) {
  const { t } = useI18n()
  const sort = t.stack.sort
  const [order, setOrder] = useState(() => items.map(([name]) => name))
  const [activeId, setActiveId] = useState<string | null>(null)
  const [landedId, setLandedId] = useState<string | null>(null)

  const byName = new Map(items.map(([name, glyph], i) => [name, { glyph, index: i }]))

  // mouse: arrasta depois de mover 4px (um clique parado continua sendo clique);
  // toque: segurar um instante, para a rolagem da página continuar funcionando
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 4 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 180, tolerance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )

  const say = (template: string, id: string | number, over?: string | number | null) => {
    const pos = over == null ? order.indexOf(String(id)) : order.indexOf(String(over))
    return template
      .replace('{name}', String(id))
      .replace('{pos}', String(pos + 1))
      .replace('{total}', String(order.length))
  }
  const announcements: Announcements = {
    onDragStart: ({ active }) => say(sort.picked, active.id),
    onDragOver: ({ active, over }) => (over ? say(sort.moved, active.id, over.id) : undefined),
    onDragEnd: ({ active, over }) => say(sort.dropped, active.id, over?.id ?? active.id),
    onDragCancel: ({ active }) => say(sort.cancelled, active.id),
  }

  // mão fechada na tela toda enquanto arrasta (classe no <html>, ver index.css)
  const setDragCursor = (on: boolean) => {
    document.documentElement.classList.toggle('dragging-sticker', on)
  }
  useEffect(
    () => () => {
      document.documentElement.classList.remove('dragging-sticker')
    },
    [],
  )

  const onDragStart = ({ active }: DragStartEvent) => {
    setDragCursor(true)
    setActiveId(String(active.id))
  }
  const onDragCancel = () => {
    setDragCursor(false)
    setActiveId(null)
  }
  const onDragEnd = ({ active, over }: DragEndEvent) => {
    setDragCursor(false)
    setActiveId(null)
    setLandedId(String(active.id))
    if (over && active.id !== over.id) {
      setOrder((cur) => arrayMove(cur, cur.indexOf(String(active.id)), cur.indexOf(String(over.id))))
    }
  }

  const active = activeId ? byName.get(activeId) : undefined

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragCancel={onDragCancel}
      accessibility={{ announcements, screenReaderInstructions: { draggable: sort.instructions } }}
    >
      <SortableContext items={order} strategy={rectSortingStrategy}>
        <ul className="m-0 mt-[16px] flex list-none flex-wrap gap-x-2 gap-y-[14px] p-0">
          {order.map((name) => {
            const { glyph, index } = byName.get(name)!
            return (
              <SortableSticker
                key={name}
                name={name}
                glyph={glyph}
                index={index}
                landed={landedId === name}
                onLanded={() => setLandedId(null)}
              />
            )
          })}
        </ul>
      </SortableContext>
      {/* portal: dentro do cartão, o filter/clip-path deslocaria e cortaria o adesivo em arrasto */}
      {createPortal(
        <DragOverlay dropAnimation={{ duration: 220, easing: 'cubic-bezier(0.3, 0.8, 0.3, 1.2)' }}>
          {activeId && active ? (
            <div className={stickerClass} style={tiltOf(active.index)} data-lifted data-no-ink>
              <StickerFace name={activeId} glyph={active.glyph} index={active.index} />
            </div>
          ) : null}
        </DragOverlay>,
        document.body,
      )}
    </DndContext>
  )
}

/* ------------------------------ papéis por grupo ------------------------------ */

type GroupKey = (typeof groups)[number]['key']

const paper: Record<GroupKey, { className: string; style?: CSSProperties; deco: ReactNode }> = {
  /* caderno pautado + fita lilás */
  languages: {
    className: 'ruled',
    deco: (
      <Tape mask={assets.tape.stack} width={78} height={24} className="top-[-14px] left-[19px] -rotate-4" />
    ),
  },
  /* papel quadriculado + fita rosa na quina */
  frontend: {
    className: 'graph-paper',
    deco: (
      <>
        <Tape
          mask={assets.tape.b}
          tone="pink"
          width={84}
          height={24}
          className="top-[-8px] right-[-26px] rotate-[38deg]"
        />
        <Sparkle className="right-[22px] bottom-[18px] rotate-12 opacity-70" />
      </>
    ),
  },
  /* papel pontilhado + clipe */
  backend: {
    className: 'dot-paper',
    deco: <Paperclip className="top-[-20px] left-[26px] rotate-[-8deg]" />,
  },
  /* post-it rasgado + percevejo */
  data: {
    className: 'bg-blush',
    style: { clipPath: tornEdge },
    deco: null,
  },
}

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

      <div className="grid gap-x-[30px] gap-y-[40px] pt-[10px] md:grid-cols-2 lg:grid-cols-3">
        {groups.map((group) => {
          const p = paper[group.key]
          return (
            <article
              key={group.key}
              className="relative self-start drop-shadow-[0_14px_14px_var(--c-shadow)]"
              style={{ transform: `rotate(${group.tilt}deg)` }}
            >
              {/* o clip-path (borda rasgada) fica só na folha; fita, clipe e pino ficam de fora */}
              <div
                className={cx('px-5 pt-7 pb-[26px]', p.className)}
                style={{ '--pitch': '28px', ...p.style } as CSSProperties}
              >
                <h3 className="font-hand text-[30px] leading-[30px] font-bold text-accent-ink">
                  {s.groups[group.key]}
                </h3>
                <Squiggle />
                <StickerList items={group.items} />
              </div>
              {p.deco}
              {group.key === 'data' && <Pushpin className="top-[-9px] left-[calc(50%-11px)]" />}
            </article>
          )
        })}
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
