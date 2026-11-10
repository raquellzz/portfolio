import { useEffect, useState } from 'react'

interface Options {
  typeMs?: number
  eraseMs?: number
  /** tempo com a frase completa na tela, para dar tempo de ler */
  holdMs?: number
  /** pausa com a linha vazia antes da próxima frase */
  gapMs?: number
  enabled?: boolean
}

/** Digita cada frase, espera, apaga e passa para a próxima, em loop. */
export function useTypewriter(
  words: string[],
  { typeMs = 80, eraseMs = 40, holdMs = 2600, gapMs = 500, enabled = true }: Options = {},
): string {
  const [text, setText] = useState('')

  useEffect(() => {
    if (!enabled || words.length === 0) return
    let index = 0
    let length = 0
    let erasing = false
    let timer: ReturnType<typeof setTimeout>

    const tick = () => {
      const word = words[index]
      if (!erasing) {
        length += 1
        setText(word.slice(0, length))
        if (length === word.length) {
          erasing = true
          timer = setTimeout(tick, holdMs)
        } else {
          timer = setTimeout(tick, typeMs)
        }
      } else {
        length -= 1
        setText(word.slice(0, length))
        if (length === 0) {
          erasing = false
          index = (index + 1) % words.length
          timer = setTimeout(tick, gapMs)
        } else {
          timer = setTimeout(tick, eraseMs)
        }
      }
    }

    timer = setTimeout(tick, typeMs)
    return () => clearTimeout(timer)
  }, [words, typeMs, eraseMs, holdMs, gapMs, enabled])

  return text
}
