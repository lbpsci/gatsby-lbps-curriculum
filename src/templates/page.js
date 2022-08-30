import * as React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Seo from '../components/Seo'
import { SliceZone } from '@prismicio/react'
import { components } from '../slices'

const PageTemplate = ({ data, path }) => {
  const {
    siteMetadata: {
      data: { district_name, site_title },
    },
    prismicPage,
  } = data
  const pageContent = prismicPage
  const alternateLanguages = pageContent.alternate_languages || []
  const { lang, type, url } = pageContent
  const activeDoc = {
    lang,
    type,
    url,
    alternateLanguages,
  }
  const document = prismicPage.data
  return (
    <Layout
      siteTitle={site_title}
      path={path}
      districtName={district_name}
      activeDocMeta={activeDoc}
    >
      <SliceZone slices={document.body} components={components} />
    </Layout>
  )
}

export function Head({
  data: {
    siteMetadata: { data },
    prismicPage,
  },
  location,
}) {
  const { pathname } = location
  return (
    <Seo
      {...data}
      pageTitle={prismicPage.data.page_title.text}
      pathname={pathname}
    >
      <title>{`${prismicPage.data.page_title.text} | ${
        prismicPage.lang === 'en-us'
          ? 'Curriculum & Instruction'
          : prismicPage.lang === 'es-es'
          ? 'Currículo e Instrucción'
          : 'Currículo e Instrução'
      }`}</title>
    </Seo>
  )
}

export default PageTemplate

export const query = graphql`
  query PageTemplateQuery($lang: String!) {
    siteMetadata: prismicSitemetadata(lang: { eq: $lang }) {
      data {
        district_name
        site_description
        site_social_image {
          url
        }
        site_title
        site_url
      }
    }
    prismicPage(lang: { eq: $lang }) {
      type
      lang
      url
      alternate_languages {
        id
        uid
        type
        lang
      }
      data {
        page_title {
          text
        }
        page_meta_image {
          url
        }
        page_meta_description
        body {
          ...PageDataBodyProse
          ...PageDataBodySectionheading
        }
      }
    }
  }
`
