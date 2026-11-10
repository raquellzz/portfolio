import type { CSSProperties, ReactNode } from 'react'
import { assets } from '../assets/figma'
import { Button, Polaroid, Ribbon, Tape } from '../components/ui'
import { photoGradient } from '../lib/styles'
import { useI18n } from '../i18n/I18nProvider'

const stripes =
  'repeating-linear-gradient(135deg, var(--c-accent) 0 16px, var(--c-page) 16px 32px, var(--c-muted) 32px 48px, var(--c-page) 48px 64px)'

export function About() {
  const { t } = useI18n()
  const a = t.about

  return (
    <section id="sobre" className="pt-[76px] pb-[89px] pl-[var(--gutter)] pr-4 sm:pr-10">
      <div className="grid gap-x-14 gap-y-12 lg:grid-cols-[320px_1fr]">
        {/* ------------------------ coluna fixa: fotos ----------------------- */}
        <div className="flex flex-col items-center gap-4 self-start pt-[14px] lg:sticky lg:top-24 lg:max-w-[320px]">
          <h2 className="w-full font-hand text-[clamp(48px,6vw,71.7px)] leading-[71.68px] font-bold text-ink">
            {a.title}
          </h2>
          <div className="py-4">
            <Polaroid
              width={320}
              ratio={295.19 / 368.98}
              rotate={-3}
              hint={a.photoHint}
              caption={a.photoCaption}
              photoStyle={photoGradient(170)}
            />
          </div>
          <div className="py-4">
            <Polaroid
              width={350}
              ratio={404 / 252.5}
              rotate={3}
              hint={a.photoHint}
              caption={a.photoCaption}
              photoStyle={photoGradient(175)}
            />
          </div>
        </div>

        {/* ------------------------------ texto ------------------------------ */}
        <div className="flex w-full max-w-[605px] flex-col gap-10 justify-self-end">
          <div className="flex flex-col gap-[11px]">
            <p className="font-hand text-[clamp(34px,4.4vw,53.8px)] leading-[1.05] font-bold text-ink">
              {a.statementStart} <span className="mark">{a.statementMark}</span>
            </p>
            {a.paragraphs.map((text) => (
              <p key={text} className="max-w-[600px] text-[16.5px] leading-[31.35px] text-muted">
                {text}
              </p>
            ))}
          </div>

          <div className="flex flex-col gap-[18px]">
            {a.highlights.map((item) => (
              <div
                key={item.title}
                className="flex flex-col gap-[5px] rounded-[10px] border-[3px] border-dashed border-accent-ink bg-card px-5 py-[18px]"
              >
                <p className="font-hand text-[46px] leading-[46px] font-bold text-accent-ink">{item.title}</p>
                <p className="text-[15px] leading-[23.25px] text-muted">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-5">
            <Notepad title={a.educationTitle} pitch={30}>
              <ul className="m-0 flex list-none flex-col gap-4 p-0">
                {a.education.map((item) => (
                  <li key={item.name} className="flex flex-col gap-[3px]">
                    <span className="font-hand text-[26px] leading-[27.3px] font-bold text-ink">{item.name}</span>
                    <span className="text-[14px] leading-[21px] text-muted">{item.meta}</span>
                  </li>
                ))}
              </ul>
            </Notepad>

            <Notepad title={a.languagesTitle} pitch={28}>
              <ul className="m-0 flex list-none flex-col p-0">
                {a.languages.map((item) => (
                  <li key={item.name} className="flex min-h-[28px] items-baseline justify-between">
                    <span className="font-hand text-[25px] leading-[27.5px] font-semibold text-ink">{item.name}</span>
                    <span className="text-[15px] text-muted">{item.level}</span>
                  </li>
                ))}
              </ul>
            </Notepad>
          </div>

          <ul className="m-0 flex list-none flex-wrap gap-x-[10px] gap-y-[10px] p-0">
            {a.softSkills.map((skill, i) => (
              <li key={skill}>
                <Ribbon mask={assets.labelLilac[i]} tone="lilac">
                  {skill}
                </Ribbon>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ArtEnvelope />
    </section>
  )
}

function Notepad({ title, pitch, children }: { title: string; pitch: number; children: ReactNode }) {
  return (
    <div
      className="ruled relative flex flex-col gap-2 border-t-[6px] border-accent px-[22px] pt-[26px] pb-[22px] shadow-[0_14px_26px_-14px_var(--c-shadow)]"
      style={{ '--pitch': `${pitch}px` } as CSSProperties}
    >
      <p className="font-type text-[12px] font-bold tracking-[0.96px] text-accent-ink">{title}</p>
      {children}
    </div>
  )
}

/* ----------------------- envelope "Quando não estou programando" ----------------------- */
function ArtEnvelope() {
  const { t } = useI18n()
  const a = t.about

  return (
    <div className="mt-[90px] p-[10px] shadow-[0_24px_40px_-22px_var(--c-shadow)]" style={{ backgroundImage: stripes }}>
      <div className="flex flex-col items-center gap-9 bg-card p-6 sm:p-12 md:flex-row">
        <div className="flex flex-1 flex-col gap-[6.4px]">
          <h3 className="pt-[3px] font-hand text-[clamp(40px,5vw,64px)] leading-[62.72px] font-bold text-ink">
            {a.artStart} <span className="mark">{a.artMark}</span>
          </h3>
          <p className="max-w-[460px] pb-[17.6px] text-[16.5px] leading-[29.7px] text-muted">{a.artText}</p>
          <div>
            <Button href="/arte" size="md" className="!text-[25px]">
              {a.artCta}
            </Button>
          </div>
        </div>

        {/* três fotos soltas, coladas com fita */}
        <div className="relative h-[290px] w-full flex-1" aria-hidden>
          <div
            className="absolute top-[25px] left-[-1%] w-[38%] -rotate-[8deg] bg-polaroid px-2 pt-2 pb-[30px] shadow-[0_16px_26px_-12px_var(--c-shadow)]"
          >
            <div
              style={{
                aspectRatio: '134 / 178.6',
                backgroundImage:
                  'radial-gradient(circle at 30% 30%, rgb(232 137 165 / 0.8), transparent 72%), radial-gradient(circle at 70% 65%, rgb(157 176 198 / 0.8), transparent 72%)',
              }}
            />
          </div>

          <div className="absolute top-[-4px] left-[30.5%] w-[41%] rotate-3 bg-polaroid px-2 pt-2 pb-[34px] shadow-[0_16px_26px_-12px_var(--c-shadow)]">
            <div
              style={{
                aspectRatio: '152 / 202.7',
                backgroundColor: '#7a2440',
                backgroundImage:
                  'linear-gradient(115deg, #55122a 0 34%, transparent 34%), linear-gradient(65deg, #d8d2de 0 22%, transparent 22%), radial-gradient(circle at 70% 30%, #e889a5 0 17%, transparent 18%)',
              }}
            />
            <Tape mask={assets.tape.b} width={80} height={24} className="top-[-12px] left-1/2 -translate-x-1/2" />
          </div>

          <div className="absolute top-10 left-[58.6%] w-[39%] rotate-[9deg] bg-polaroid px-2 pt-2 pb-7 shadow-[0_16px_26px_-12px_var(--c-shadow)]">
            <div
              style={{
                aspectRatio: '124 / 165.3',
                backgroundImage:
                  'conic-gradient(from 90deg at 30% 70%, #7a2440 0%, #963d59 6.25%, #b15773 12.5%, #cd708c 18.75%, #e889a5 25%, #c17d96 31.25%, #9a7288 37.5%, #736679 43.75%, #4c5a6a 50%, #3b3b4c 62.5%, #2a1b2e 75%, #522037 87.5%, #7a2440 100%)',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
