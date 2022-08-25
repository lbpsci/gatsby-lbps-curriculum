import * as React from 'react'
import { graphql } from 'gatsby'
import { PrismicRichText } from '@prismicio/react'

const SectionHeading = ({ slice }) => {
  const {
    primary: { section_heading_text },
  } = slice
  return (
    <div
      className={`bg-gradient-to-bl from-emerald-700 via-emerald-900 to-emerald-800 py-4 md:py-2`}
    >
      <h2>
        <PrismicRichText field={section_heading_text} />
      </h2>
    </div>
  )
}

export const query = graphql`
  fragment HomepageDataBodySectionHeading on PrismicHomepageDataBodySectionHeading {
    primary {
      section_heading_text {
        richText
      }
    }
  }
`
