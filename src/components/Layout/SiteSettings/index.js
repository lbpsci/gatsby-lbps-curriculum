import * as React from 'react'
import { Link } from 'gatsby'
import { linkResolver } from '../../../utils/linkResolver'
import { HiAdjustments } from 'react-icons/hi'
import { FcCheckmark } from 'react-icons/fc'
import DarkMode from './DarkMode'

const SiteSettings = React.forwardRef(
  (
    {
      altLangs,
      className,
      lang,
      path,
      settingsOpen,
      setSettingsOpen,
      siteWrapper,
    },
    ref
  ) => {
    console.log('linkResolver says ... ', linkResolver('es-es'))

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
          ref={ref}
          onClick={() => {
            setSettingsOpen(!settingsOpen)
            ref.current.focus()
          }}
        >
          <HiAdjustments className="w-8 h-8" />
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
                />
              </li>
              <li className="p-4 relative hover:bg-gray-50 dark:hover:bg-gray-900 grid grid-cols-2 items-center">
                <Link to={`${path}`}>
                  {lang === 'en-us'
                    ? 'English'
                    : lang === 'es-es'
                    ? 'Español'
                    : 'Português'}
                </Link>
              </li>
              {altLangs.map(lng => {
                return (
                  <li
                    key={lng.id}
                    className="p-4 relative hover:bg-gray-50 dark:hover:bg-gray-900 grid grid-cols-2 items-center"
                  >
                    {lng.lang === 'en-us'
                      ? 'English'
                      : lng.lang === 'es-es'
                      ? 'Español'
                      : 'Português'}
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
