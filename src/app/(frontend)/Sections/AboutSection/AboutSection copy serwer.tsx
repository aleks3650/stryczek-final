import Link from 'next/link'
import Overlay from '../../Components/Overlay' 
import BubbleText from '../../contact/components/BubbleText'
import BakingSVG from '../../Components/BakingSVG'

const AboutSection = async () => {
  return (
    <section className="relative pt-12 pb-24 md:pt-16 md:pb-32 rounded-lg bg-white ">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">

          <div className="lg:w-1/2 text-center lg:text-left">
            <div className="max-w-xl mx-auto lg:mx-0">
              <Overlay delay={0.2}>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  <BubbleText text="Każdy wypiek to osobna historia — opowiedziana w warstwach ciasta, kremu i dekoracji." />
                </h2>
              </Overlay>
              <Overlay delay={0.3}>
                <p className="text-lg text-gray-600 mb-10">
                  Wierzymy, że dobre ciasto potrafi poprawić humor, przywołać wspomnienia i sprawić, że zwykły dzień stanie się wyjątkowy. Dlatego w naszej cukierni nie ma miejsca na kompromisy — tylko prawdziwe masło, świeże owoce i sprawdzone receptury
                </p>
              </Overlay>
              <div className="flex flex-col lg:flex-row items-center lg:justify-start gap-8">
                <Overlay delay={0.5}>
                  <Link
                    href="/galery"
                    className="px-6 py-3 bg-amber-600 text-white font-semibold rounded-full hover:bg-amber-700 transition-all duration-300 transform hover:scale-105"
                  >
                    Sprawdź nasze wypieki
                  </Link>
                </Overlay>
                <Overlay delay={0.5} >
                  <Link
                    href="/contact"
                    className="px-6 py-3 border-2 border-amber-600 text-amber-600 font-semibold rounded-full hover:bg-amber-50 transition-all duration-300 transform hover:scale-105"
                  >
                    Zadaj mi pytanie
                  </Link>
                </Overlay>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 w-full max-w-md">
            <Overlay delay={0.4} >
              <div className="bg-amber-50/70 rounded-2xl p-8 shadow-lg border border-amber-100/80 transform transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-[106%] hover:-translate-y-2">
                <div className="flex items-start gap-6">
                  <div className="text-amber-600 flex-shrink-0 pt-1">
                    <BakingSVG className="w-24 h-auto" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Filozofia Słodkości</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start">
                        <span className="text-amber-600 font-bold mr-2 mt-1">✓</span>
                        <span>Tylko <strong>naturalne</strong> składniki</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-amber-600 font-bold mr-2 mt-1">✓</span>
                        <span><strong>Zero kompromisów</strong> w smaku i jakości</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-amber-600 font-bold mr-2 mt-1">✓</span>
                        <span>Rzemieślnicza <strong>precyzja</strong> w każdym detalu</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </Overlay>
          </div>
        </div>
      </div>

      <div className="absolute top-0 right-0 w-72 h-72 bg-amber-300 rounded-full blur-3xl opacity-20 z-10 pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-64 h-64 bg-amber-200 rounded-full blur-3xl opacity-30 z-10 pointer-events-none" />
    </section>
  )
}

export default AboutSection
