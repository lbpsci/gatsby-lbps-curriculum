import * as React from 'react'
import { Link } from 'gatsby'
import { HiChevronRight } from 'react-icons/hi'
import { getBreadcrumbs, translateText } from '../../../utils'

const Breadcrumb = ({ pathname, contentArea, activeDoc }) => {
  const { crumbs, pieces } = getBreadcrumbs(pathname)
  if (activeDoc.lang !== 'en-us') {
    crumbs.shift()
    pieces.shift()
  }
  // crumbs.unshift('')
  // pieces.unshift('')
  return (
    <>
      <nav className="max-w-screen-2xl px-3 sm:px-6 lg:px-10 xl:px-12 py-3 sm:py-4 md:py-5 lg:py-6 mx-auto">
        <ul className="flex flex-wrap my-4 text-xs md:text-lg lg:text-xl text-emerald-900 dark:text-emerald-200 font-light gap-y-4">
          <li
            key="home"
            className="hover:text-emerald-700 dark:hover:text-emerald-100"
          >
            <Link
              to={activeDoc.lang === 'en-us' ? '/' : `/${activeDoc.lang}`}
              className="capitalize"
            >
              {translateText('home', activeDoc.lang)}
            </Link>
            <HiChevronRight className="inline mx-1 sm:mx-4 w-4 h-4 text-emerald-900 dark:text-emerald-200" />
          </li>
          {crumbs.map((crumb, i) => {
            return (
              <li
                key={crumb}
                className="hover:text-emerald-700 dark:hover:text-emerald-100"
              >
                <Link to={`/${crumb}/`} className="capitalize">
                  {i + 1 === crumbs.length && contentArea
                    ? contentArea
                    : translateText(pieces[i], activeDoc.lang)}
                </Link>
                {i < crumbs.length - 1 && (
                  <HiChevronRight className="inline mx-1 sm:mx-4 w-4 h-4 text-emerald-900 dark:text-emerald-200" />
                )}
              </li>
            )
          })}
        </ul>
      </nav>
    </>
  )
}

export default Breadcrumb
