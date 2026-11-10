import { Button } from '../components/ui'
import { useI18n } from '../i18n/I18nProvider'

const EMAIL = 'raquelcfapoio24@gmail.com'

const stripes =
  'repeating-linear-gradient(135deg, var(--c-accent) 0 16px, var(--c-page) 16px 32px, var(--c-muted) 32px 48px, var(--c-page) 48px 64px)'

export function Contact() {
  const { t } = useI18n()
  const c = t.contact

  return (
    <section
      id="contato"
      className="flex flex-col gap-11 pt-[76px] pb-[51px] pl-[var(--gutter)] pr-4 sm:pr-10"
    >
      <div className="p-3 shadow-[0_30px_50px_-26px_var(--c-shadow)]" style={{ backgroundImage: stripes }}>
        <div className="flex flex-col items-stretch gap-10 bg-card p-8 sm:px-[51px] sm:pt-[50px] sm:pb-[51px] md:flex-row md:items-end">
          {/* frente: chamada + botão */}
          <div className="flex flex-1 flex-col gap-[92px]">
            <h2 className="font-hand text-[clamp(52px,7vw,89.6px)] leading-[82.43px] font-bold text-ink">
              <span className="block">{c.titleStart}</span>
              <span className="mark -mt-4 block w-fit py-[15px]">{c.titleMark}</span>
            </h2>
            <div>
              <Button href={`mailto:${EMAIL}`} size="lg">
                {c.cta}
              </Button>
            </div>
          </div>

          {/* verso: linhas de endereço, selo e carimbo */}
          <div
            aria-hidden
            className="relative flex min-h-[260px] flex-1 flex-col justify-end gap-[6px] border-l-[3px] border-dashed border-dash pt-[170px] pl-7"
          >
            {[0, 1, 2].map((n) => (
              <div key={n} className="h-12 min-h-[44px] border-b-2 border-dash" />
            ))}

            {/* selo postal */}
            <div className="absolute top-[-2px] right-[-2px] h-[112px] w-24 rotate-3 bg-polaroid p-2 shadow-[0_8px_14px_-8px_var(--c-shadow)]">
              <div className="flex size-full items-center justify-center bg-[linear-gradient(160deg,#7a2440,#55122a)]">
                <span className="font-hand text-[44px] font-bold text-[#d8d2de]">RF</span>
              </div>
              <div className="absolute inset-[5.7px] border-[3px] border-dashed border-stamp-edge" />
            </div>

            {/* carimbo do correio */}
            <div className="absolute top-[20px] right-[61px] flex size-[111px] items-center justify-center">
              <div className="flex size-[92px] -rotate-14 flex-col items-center justify-center rounded-full border-[3px] border-accent-ink font-type text-[10px] leading-[13px] font-bold tracking-[1px] text-accent-ink opacity-70">
                <span>{c.stamp[0]}</span>
                <span>{c.stamp[1]}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="flex flex-wrap justify-between gap-x-6 gap-y-2 font-type text-[12px] text-muted">
        <span>{c.footerLeft}</span>
        <span>{c.footerRight}</span>
      </footer>
    </section>
  )
}
