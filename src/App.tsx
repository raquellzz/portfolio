import { Header } from './components/Header'
import { PageDivider } from './components/PageDivider'
import { Sheet } from './components/Sheet'
import { I18nProvider } from './i18n/I18nProvider'
import { About } from './sections/About'
import { Contact } from './sections/Contact'
import { Experience } from './sections/Experience'
import { Hero } from './sections/Hero'
import { Projects } from './sections/Projects'
import { Stack } from './sections/Stack'
import { ThemeProvider } from './theme/ThemeProvider'

export default function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <div className="px-4 sm:px-[50px]">
          <Header />
          <Sheet>
            <Hero />
            <PageDivider />
            <About />
            <PageDivider />
            <Stack />
            <PageDivider />
            <Experience />
            <PageDivider />
            <Projects />
            <PageDivider />
            <Contact />
          </Sheet>
        </div>
      </I18nProvider>
    </ThemeProvider>
  )
}
