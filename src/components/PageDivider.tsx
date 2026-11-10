import { useI18n } from '../i18n/I18nProvider'

/** Linha de picote entre seções, com o aviso "vire a página →". */
export function PageDivider() {
  const { t } = useI18n()
  return (
    <div
      aria-hidden
      className="relative ml-[var(--gutter)] h-[3px] border-t-[3px] border-dashed border-dash"
    >
      <span className="absolute top-[-14px] right-6 bg-page px-3 font-hand text-[22px] whitespace-nowrap text-muted sm:right-10">
        {t.divider}
      </span>
    </div>
  )
}
