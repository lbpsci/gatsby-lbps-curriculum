import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Seo from '../components/Seo'
import Hero from '../components/Hero'
import { SliceZone } from '@prismicio/react'
import { components } from '../slices'

const HomepageTemplate = ({ data, path }) => {
  const {
    site: {
      siteMetadata: { siteTitle },
    },
    prismicHomepage,
  } = data
  const document = prismicHomepage.data

  return (
    <>
      <Layout siteTitle={siteTitle} path={path}>
        <Hero {...document} />
        <SliceZone slices={document.body} components={components} />
      </Layout>
    </>
  )
}

export function Head({
  data: {
    site: { siteMetadata },
  },
  location,
}) {
  const { siteTitle } = siteMetadata
  const { pathname } = location

  return (
    <Seo {...siteMetadata} pageTitle={'Home'} pathname={pathname}>
      <title>{`Home | ${siteTitle}`}</title>
    </Seo>
  )
}

// EXPORTS
export default HomepageTemplate

export const query = graphql`
  query HomepageTemplateQuery($lang: String) {
    site {
      siteMetadata {
        siteTitle
        siteDescription
        siteUrl
        siteImage
      }
    }
    prismicHomepage(lang: { eq: $lang }) {
      type
      lang
      alternate_languages {
        uid
        type
        lang
      }
      data {
        hero_admin {
          text
        }
        hero_admin_title {
          text
        }
        hero_image {
          gatsbyImageData(
            width: 300
            height: 300
            placeholder: BLURRED
            layout: CONSTRAINED
          )
        }
        hero_introductory_paragraph {
          richText
        }
        hero_office_address {
          richText
        }
        hero_office_information_title {
          text
        }
        hero_office_phone {
          text
        }
        hero_office_secretary {
          text
        }
        hero_secretary_title {
          text
        }
        hero_title {
          text
        }
        body {
          ...HomepageDataBodySectionheading
          ...HomepageDataBodyProse
          ...HomepageDataBodyDepartmentList
          ...HomepageDataBodyButtonlink
          ...HomepageDataBodyQuote
          ...HomepageDataBodySideBySideLists
        }
      }
    }
  }
`
