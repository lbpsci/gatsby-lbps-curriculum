import * as React from 'react'
import { Link } from 'gatsby'
import { linkResolver } from '../../../utils/linkResolver'
import { HiAdjustments } from 'react-icons/hi'
import { FcCheckmark } from 'react-icons/fc'
import DarkMode from './DarkMode'

const SiteSettings = React.forwardRef(
  (
    {
      activeDocMeta,
      className,
      path,
      settingsOpen,
      setSettingsOpen,
      siteWrapper,
      lightMode,
      darkMode,
    },
    ref
  ) => {
    const currentLang = activeDocMeta.lang
    const [mode, setMode] = React.useState(null)
    React.useEffect(() => {
      const storedTheme = localStorage.getItem('theme')
      if (
        storedTheme === 'dark' ||
        (!('theme' in localStorage) &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)
      ) {
        siteWrapper.current.classList.add('dark')
        setMode('dark')
        if (!storedTheme) {
          localStorage.setItem('theme', 'dark')
        }
      } else {
        localStorage.setItem('theme', 'light')
        setMode('light')
      }
    }, [mode, siteWrapper])

    const handleBlur = e => {
      const currentTarget = e.currentTarget
      requestAnimationFrame(() => {
        if (!currentTarget.contains(document.activeElement)) {
          setSettingsOpen(false)
        }
      })
    }
    return (
      <div
        className="relative"
        id="settingsMenu"
        onBlur={handleBlur}
        role="button"
      >
        <button
          id="settingsBtn"
          className="text-center"
          ref={ref}
          onClick={() => {
            setSettingsOpen(!settingsOpen)
            ref.current.focus()
          }}
        >
          {activeDocMeta.lang === 'es-es'
            ? 'Español'
            : activeDocMeta.lang === 'pt-br'
            ? 'Português'
            : 'English'}
          <HiAdjustments className="w-8 h-8 mx-auto" />
          <span className="sr-only">Activate Settings Menu</span>
        </button>
        {settingsOpen && (
          <div
            className={`z-10 bg-white dark:bg-gray-800 shadow dark:shadow-emerald-900 absolute top-6 right-0 border dark:border-emerald-700 rounded mt-2 w-56 ${
              settingsOpen ? ` animate-fade-in` : ``
            } ${className}`}
            role="menu"
            aria-labelledby="settingsBtn"
          >
            <ul className="divide-y dark:divide-gray-500">
              <li className="p-4 relative hover:bg-gray-50 dark:hover:bg-gray-900 rounded-t">
                <DarkMode
                  siteWrapper={siteWrapper}
                  mode={mode}
                  setMode={setMode}
                  lightMode={lightMode}
                  darkMode={darkMode}
                />
              </li>
              <li className="p-4 relative hover:bg-gray-50 dark:hover:bg-gray-900 grid grid-cols-3 items-center">
                <FcCheckmark className=" place-self-center col-span-1" />
                <span className="col-span-2 text-right">
                  {currentLang === 'en-us'
                    ? 'English'
                    : currentLang === 'es-es'
                    ? 'Español'
                    : 'Português'}
                </span>
              </li>
              {activeDocMeta.alternateLanguages.map(altLang => {
                return (
                  <li
                    key={altLang.id}
                    className="relative hover:bg-gray-50 dark:hover:bg-gray-900 grid grid-cols-1 items-center"
                  >
                    <Link
                      to={
                        activeDocMeta.type !== 'content_area'
                          ? linkResolver(altLang)
                          : currentLang === 'en-us'
                          ? `/${altLang.lang}${path}`
                          : altLang.lang === 'en-us'
                          ? `/${path.substring(7)}`
                          : `/${altLang.lang}${path.substring(6)}`
                      }
                      onClick={() => {
                        localStorage.setItem('lang', altLang.lang)
                      }}
                      className="grid grid-cols-3 p-4"
                    >
                      <span className="col-span-1" />
                      <span className="text-right col-span-2">
                        {altLang.lang === 'en-us'
                          ? 'English'
                          : altLang.lang === 'es-es'
                          ? 'Español'
                          : 'Português'}
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </div>
    )
  }
)

export default SiteSettings
