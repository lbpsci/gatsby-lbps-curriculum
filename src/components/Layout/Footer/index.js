import * as React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import { Link } from 'gatsby'

const Footer = ({ districtName }) => {
  return (
    <footer className="bg-gray-900 dark:bg-gray-800 min-h-[100px] mt-auto flex place-items-center py-6">
      <div className="max-w-sm mx-auto flex flex-col items-center">
        <StaticImage
          src="../../../images/lbps_logo.png"
          alt=""
          placeholder="blurred"
          width={100}
          height={100}
          layout="fixed"
        />
        <p className="text-xs text-slate-100 text-center mt-4">
          {districtName} <br /> Together We Can, Juntos Nós Podemos, Juntos
          Podemos
        </p>
        <address className="text-slate-200 text-xs not-italic font-thin tracking-wide mt-2">
          540 Broadway Long Branch, NJ 07740
        </address>
        <Link
          to="/privacy"
          className="text-slate-200 text-xs not-italic font-thin tracking-wide mt-2"
        >
          Privacy Policy
        </Link>
      </div>
    </footer>
  )
}

export default Footer
