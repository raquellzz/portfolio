import type { CSSProperties, ReactNode } from 'react'
import { useI18n } from '../i18n/I18nProvider'

interface StampCardProps {
  title: string
  children: ReactNode
  /** inclinação em graus (cada selo "colado" um pouco torto) */
  rotate?: number
}

/**
 * Bloco de conquista em formato de selo postal: borda picotada (transparente),
 * moldura tracejada interna e um carimbo do correio sobreposto no canto.
 * A sombra fica num wrapper porque `mask` cortaria um box-shadow.
 */
export function StampCard({ title, children, rotate = 0 }: StampCardProps) {
  const { t } = useI18n()
  const [city, state] = t.contact.stamp

  return (
    <div
      className="relative drop-shadow-[0_10px_14px_var(--c-shadow)]"
      style={{ transform: `rotate(${rotate}deg)` } as CSSProperties}
    >
      <div className="stamp-edge bg-card p-3.5">
        <div className="flex flex-col gap-[5px] border-[3px] border-dashed border-accent-ink px-5 py-[18px] pr-[88px] sm:pr-24">
          <p className="font-hand text-[46px] leading-[46px] font-bold text-accent-ink">{title}</p>
          <p className="text-[15px] leading-[23.25px] text-muted">{children}</p>
        </div>
      </div>

      {/* carimbo do correio, meio por cima do selo */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-3 right-5 flex size-[72px] -rotate-12 flex-col items-center justify-center rounded-full border-[3px] border-accent-ink font-type text-[9px] leading-[11px] font-bold tracking-[1px] text-accent-ink opacity-50"
      >
        <span>{city}</span>
        <span>{state}</span>
      </div>
    </div>
  )
}
