import type { ReactNode } from 'react'

/**
 * Folha de caderno: pauta, margem vinho, furos e argolas metálicas.
 * Tudo é decorativo e desenhado em CSS/SVG (o Figma tem ~900 camadas para isso).
 */
function PaperDecoration() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {/* pauta: 1px a cada 32px, começando em y=31 */}
      <div
        className="absolute inset-y-0 right-[18px] left-[30px]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(to bottom, transparent 0 31px, var(--c-rule) 31px 32px)',
        }}
      />
      {/* margem vinho */}
      <div className="absolute inset-y-0 left-[87px] w-[1.5px] bg-[var(--c-margin)]" />
      {/* furos + argolas: passo de 44px, saindo 16px para fora da folha */}
      <svg className="absolute top-0 -left-4 h-full w-11" width="44" height="100%">
        <defs>
          <pattern id="rings" width="44" height="44" patternUnits="userSpaceOnUse">
            <circle cx="32" cy="28" r="5.5" fill="var(--c-hole-fill)" stroke="var(--c-hole-stroke)" />
            <rect x="1.5" y="25.5" width="41" height="6" rx="3" fill="none" stroke="var(--c-ring)" strokeWidth="3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#rings)" />
      </svg>
    </div>
  )
}

export function Sheet({ children }: { children: ReactNode }) {
  return (
    <main className="relative mx-auto mt-0 w-full max-w-[1180px] rounded-t-[14px] bg-page shadow-[0_30px_60px_-30px_var(--c-shadow)] [--gutter:56px] sm:[--gutter:116px]">
      <PaperDecoration />
      <div className="relative">{children}</div>
    </main>
  )
}
