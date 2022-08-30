import * as React from 'react'
import { Link } from 'gatsby'

const ButtonLink = ({ children, type, url, className }) => {
  if (type === 'Document') {
    return (
      <Link
        to={url}
        className={`px-4 md:px-6 py-2 md:py-3 lg:px-8 lg:py-4 md:text-xl lg:text-2xl text-white bg-emerald-900 rounded border transition duration-300 ease-in-out hover:bg-transparent dark:hover:bg-emerald-800 hover:border border-emerald-900 hover:text-emerald-900 dark:hover:text-emerald-100 text-center inline-block no-underline ${className}`}
      >
        {children}
      </Link>
    )
  } else {
    return (
      <a
        href={url}
        className={`px-4 md:px-6 py-2 md:py-3 lg:px-8 lg:py-4 md:text-xl lg:text-2xl text-white bg-emerald-900 rounded border transition duration-300 ease-in-out hover:bg-transparent dark:hover:bg-emerald-800 hover:border border-emerald-900 hover:text-emerald-900 dark:hover:text-emerald-100 text-center inline-block ${className}`}
      >
        {children}
      </a>
    )
  }
}

export default ButtonLink
