import * as React from 'react'
import Navbar from './Navbar'
import { handleToTop, toggleVisible } from '../../../utils'
import { HiChevronUp } from 'react-icons/hi'
import { BsArrowReturnLeft } from 'react-icons/bs'
import Footer from './Footer'
import { Link } from 'gatsby'

const Layout = ({
  children,
  districtName,
  // lang,
  path,
  siteTitle,
  activeDocMeta,
  sideDrawer,
  topMenu,
}) => {
  const [isScrolled, setIsScrolled] = React.useState(false)
  React.useEffect(() => {
    window.addEventListener('scroll', toggleToTop)
    return () => {
      window.removeEventListener('scroll', toggleToTop)
    }
  }, [isScrolled])
  const toggleToTop = () => {
    toggleVisible(setIsScrolled)
  }
  const siteWrapper = React.useRef(null)
  return (
    <div ref={siteWrapper} className="site-wrapper">
      <div className="flex flex-col min-h-screen space-between dark:bg-gray-900">
        <ul id="nav-access" className="relative">
          <li>
            <button
              onClick={e => {
                e.preventDefault()
                const mainContent = document.querySelector('#main-content')
                if (mainContent) {
                  mainContent.tabIndex = -1
                  mainContent.focus()
                  setTimeout(
                    () => mainContent.removeAttribute('tabindex'),
                    1000
                  )
                }
              }}
              className="h-10 flex justify-center items-center absolute z-50 -top-20 sm:left-1/4 text-xl text-white w-full sm:w-1/2 text-center bg-emerald-700 bg-opacity-95 transform focus:translate-y-20 transition-all duration-500 ease-in-out"
            >
              Skip to main content
              <span className="text-white px-3 py-0 bg-emerald-900 rounded-sm ml-3">
                Return
                <BsArrowReturnLeft className="w-3 h-3 inline text-white ml-1" />
              </span>
            </button>
          </li>
        </ul>
        <Navbar
          siteWrapper={siteWrapper}
          activeDocMeta={activeDocMeta}
          siteTitle={siteTitle}
          districtName={districtName}
          path={path}
          sideDrawer={sideDrawer}
          topMenu={topMenu}
        />
        <main id="main-content" className="bg-inherit">
          {children}
        </main>
        {process.env.NODE_ENV !== 'development' && (
          <div
            id="tracking-consent"
            className="fixed bottom-0 bg-slate-200 w-full min-h-[80px] animate-fade-up grid grid-cols-6 z-10"
          >
            <p className="col-span-4 md:col-span-5 prose-sm prose-emerald p-4 md:p-6 lg:p-8">
              <span className="hidden md:inline">
                {activeDocMeta.lang === 'en-us'
                  ? `Long Branch Public Schools would like to know how users are
              finding and interacting with this site. In order to do that, it
              uses cookies. We do not collect personally identifying information
              and no data is sold to any parties.`
                  : activeDocMeta.lang === 'es-es'
                  ? `Las Escuelas Públicas de Long Branch quisieran saber cómo los usuarios encuentran e interactúan con este sitio. Para ello utiliza cookies. No recopilamos información de identificación personal y no se vende ningún dato a ninguna parte.`
                  : `As Escolas Públicas Long Branch gostariam de saber como os usuários estão encontrando e interagindo com este site. Para isso, utiliza cookies. Não coletamos informações de identificação pessoal e nenhum dado é vendido a terceiros.`}
              </span>{' '}
              {activeDocMeta.lang === 'en-us'
                ? `If you click accept, we will be able to measure how our site is
            being used. See our`
                : activeDocMeta.lang === 'es-es'
                ? `Si hace clic en aceptar, podremos medir cómo se utiliza nuestro sitio. Vea nuestro`
                : `Se você clicar em aceitar, poderemos medir como nosso site está sendo usado. Veja nosso`}{' '}
              <Link to="privacy" className="text-emerald-900 font-semibold">
                {activeDocMeta.lang === 'en-us'
                  ? `privacy policy`
                  : activeDocMeta.lang === 'es-es'
                  ? `política de privacidad`
                  : `política de Privacidade`}
              </Link>{' '}
              {activeDocMeta.lang === 'en-us'
                ? `for more information`
                : activeDocMeta.lang === 'es-es'
                ? `para más información`
                : `Para maiores informações`}
              .
            </p>
            <button
              id="tracking-accepted"
              className="col-span-2 md:col-span-1 bg-gray-100 hover:bg-slate-400 p-4 md:p-6 lg:p-8"
            >
              {activeDocMeta.lang === 'en-us'
                ? `Accept`
                : activeDocMeta.lang === 'es-es'
                ? `aceptar`
                : `aceitar`}
            </button>
          </div>
        )}
        <Footer districtName={districtName} />
        <button onClick={handleToTop}>
          <HiChevronUp
            className={`w-8 h-8 bg-emerald-900 bg-opacity-60 text-white rounded-full fixed bottom-6 right-6 motion-safe:transition motion-safe:duration-500 motion-safe:ease-in-out ${
              isScrolled ? `visible` : ` translate-y-[100px]`
            }`}
          />
          <span className="sr-only">Scroll to the top of the page</span>
        </button>
      </div>
    </div>
  )
}

export default Layout
