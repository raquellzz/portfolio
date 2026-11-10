import type { CSSProperties } from 'react'

/** Junta classes ignorando valores falsos. */
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

/** Foto "placeholder": degradê azul → vinho no ângulo informado. */
export const photoGradient = (angle: number): CSSProperties => ({
  backgroundImage: `linear-gradient(${angle}deg, #4c5a6a 0%, #55122a 70%, #681b35 100%)`,
})
