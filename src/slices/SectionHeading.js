import * as React from 'react'
import { graphql } from 'gatsby'
import { PrismicRichText } from '@prismicio/react'

export const SectionHeading = ({ slice }) => {
  const {
    primary: { heading_text },
  } = slice

  const components = {
    heading2: ({ node, children }) => (
      <h2 className="text-center text-white text-xl md:text-2xl lg:text-3xl md:py-2 lg:py-3 tracking-wide font-semibold capitalize">
        {children}
      </h2>
    ),
  }
  return (
    <div
      className={`bg-gradient-to-bl from-emerald-700 via-emerald-900 to-emerald-800 py-4 md:py-2`}
    >
      <PrismicRichText components={components} field={heading_text.richText} />
    </div>
  )
}

export const query = graphql`
  fragment HomepageDataBodySectionheading on PrismicHomepageDataBodySectionheading {
    id
    slice_type
    primary {
      heading_text {
        richText
      }
    }
  }
`
