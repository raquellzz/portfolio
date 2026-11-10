import type { CSSProperties, ReactNode } from 'react'
import { assets } from '../assets/figma'
import { cx } from '../lib/styles'


/* -------------------------------------------------------------------- *
 * Fita adesiva: forma recortada (SVG do Figma) usada como máscara.
 * O drop-shadow fica no wrapper, porque sombra no elemento mascarado é cortada.
 * -------------------------------------------------------------------- */
interface TapeProps {
  mask: string
  /** lilás (padrão) ou rosa */
  tone?: 'lilac' | 'pink'
  className?: string
  style?: CSSProperties
  width?: number
  height?: number
}

export function Tape({ mask, tone = 'lilac', className, style, width = 96, height = 28 }: TapeProps) {
  return (
    <span
      aria-hidden
      className={cx('pointer-events-none absolute block drop-shadow-[0_1px_2px_rgba(0,0,0,0.18)]', className)}
      style={{ width, height, ...style }}
    >
      <span
        className={cx('mask-asset block size-full', tone === 'lilac' ? 'bg-tape-lilac' : 'bg-tape-pink')}
        style={{ '--mask': `url("${mask}")` } as CSSProperties}
      />
    </span>
  )
}

/* Etiqueta recortada (rótulos de soft skills / conceitos) */
interface RibbonProps {
  mask: string
  tone: 'lilac' | 'pink'
  children: ReactNode
}

export function Ribbon({ mask, tone, children }: RibbonProps) {
  return (
    <span
      className={cx(
        'mask-asset inline-flex min-h-10 items-center px-5 font-hand font-semibold whitespace-nowrap text-ink',
        tone === 'lilac' ? 'bg-tape-lilac text-[23px]' : 'bg-tape-pink text-[22px]',
      )}
      style={{ '--mask': `url("${mask}")` } as CSSProperties}
    >
      {children}
    </span>
  )
}

/* -------------------------------------------------------------------- *
 * Polaroid: moldura clara com foto (placeholder em degradê) e legenda.
 * -------------------------------------------------------------------- */
interface PolaroidProps {
  /** largura total do cartão em px */
  width: number
  /** proporção da área da foto (largura / altura) */
  ratio: number
  /** degradê/estilo da foto */
  photoStyle: CSSProperties
  hint?: string
  /** conteúdo extra dentro da foto, acima da dica (ex.: iniciais) */
  children?: ReactNode
  caption?: string
  rotate: number
  padding?: string
  className?: string
  captionClass?: string
  /** fita personalizada (padrão: fita grande, girada 3°) */
  tape?: { mask: string; rotate: number; width: number; height: number }
}

export function Polaroid({
  width,
  ratio,
  photoStyle,
  hint,
  children,
  caption,
  rotate,
  padding = '12px 12px 48px',
  className,
  captionClass = 'text-[26px]',
  tape = { mask: assets.tape.a, rotate: 3, width: 96, height: 28 },
}: PolaroidProps) {
  return (
    <figure
      className={cx('relative m-0 bg-polaroid shadow-[0_22px_36px_-16px_var(--c-shadow)]', className)}
      style={{ width, padding, transform: `rotate(${rotate}deg)` }}
    >
      <div
        className="flex w-full flex-col items-center justify-center gap-[6px]"
        style={{ aspectRatio: String(ratio), ...photoStyle }}
      >
        {children}
        {hint && <span className="font-type text-[11px] text-[#f4c6d3]">{hint}</span>}
      </div>
      <Tape
        mask={tape.mask}
        width={tape.width}
        height={tape.height}
        className="top-[-16px] left-1/2 -translate-x-1/2"
        style={{ rotate: `${tape.rotate}deg` }}
      />
      {caption && (
        <figcaption
          className={cx(
            'absolute inset-x-0 bottom-[10px] text-center font-hand font-semibold text-ink',
            captionClass,
          )}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

/* -------------------------------------------------------------------- *
 * Botões "costurados" (borda tracejada) — primário e secundário.
 * -------------------------------------------------------------------- */
interface ButtonProps {
  href: string
  children: ReactNode
  variant?: 'solid' | 'outline'
  size?: 'md' | 'lg'
  external?: boolean
  className?: string
}

export function Button({ href, children, variant = 'solid', size = 'md', external, className }: ButtonProps) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
      className={cx(
        'inline-flex items-center justify-center rounded-[6px] border-2 border-dashed px-[26px] font-hand font-bold whitespace-nowrap transition-transform hover:-translate-y-0.5',
        size === 'lg' ? 'min-h-[54px] text-[26px]' : 'min-h-[52px] text-[26px]',
        variant === 'solid'
          ? 'border-accent bg-accent text-on-accent shadow-[0_10px_18px_-8px_var(--c-shadow)]'
          : 'border-ink text-ink',
        className,
      )}
    >
      {children}
    </a>
  )
}

/* Chip tracejado (tags de tecnologia) */
export function TagChip({ children, size = 'md' }: { children: ReactNode; size?: 'sm' | 'md' }) {
  return (
    <span
      className={cx(
        'inline-flex items-center rounded-[6px] border-2 border-dashed border-dash font-type text-ink',
        size === 'sm' ? 'min-h-[28px] px-2.5 text-[12px]' : 'min-h-[30px] px-3 text-[12.5px]',
      )}
    >
      {children}
    </span>
  )
}

