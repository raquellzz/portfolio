import { Header } from './components/Header'
import { PageDivider } from './components/PageDivider'
import { Sheet } from './components/Sheet'
import { I18nProvider } from './i18n/I18nProvider'
import { isArtRoute } from './lib/route'
import { About } from './sections/About'
import { ArtHero } from './sections/ArtHero'
import { Contact } from './sections/Contact'
import { Experience } from './sections/Experience'
import { Gallery } from './sections/Gallery'
import { Hero } from './sections/Hero'
import { Projects } from './sections/Projects'
import { Stack } from './sections/Stack'
import { ThemeProvider } from './theme/ThemeProvider'

function Home() {
  return (
    <>
      <Header page="home" />
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
    </>
  )
}

function Art() {
  return (
    <>
      <Header page="art" />
      <Sheet>
        <ArtHero />
        <PageDivider />
        <Gallery />
        <PageDivider />
        <Contact />
      </Sheet>
    </>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <div className="px-4 sm:px-[50px]">{isArtRoute() ? <Art /> : <Home />}</div>
      </I18nProvider>
    </ThemeProvider>
  )
}
