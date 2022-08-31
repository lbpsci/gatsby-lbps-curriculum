import React from 'react'
import { graphql, Link } from 'gatsby'
import { PrismicRichText } from '@prismicio/react'
import Layout from '../components/Layout'
import Section from '../components/Section'
import Seo from '../components/Seo'
import Heading from '../components/Heading'
import ButtonLink from '../components/ButtonLink'

const ContentArea = ({ data, path }) => {
  const {
    siteMetadata: {
      data: { district_name, site_title },
    },
    prismicContentArea,
    allPrismicCurriculum,
  } = data
  const areaContent = prismicContentArea
  const alternateLanguages = areaContent.alternate_languages || []
  const { lang, type, url } = areaContent
  const activeDoc = {
    lang,
    type,
    url,
    alternateLanguages,
  }
  //   const allCurricula = allPrismicCurriculum.nodes.map(
  //     node => node.data.content_area.document.data.content_area_title.text
  //   )
  //   const uniqueCurricula = [...new Set(allCurricula)]
  //   console.log(uniqueCurricula)

  // console.log('gradespan data ===> ', data)
  return (
    <Layout activeDocMeta={activeDoc}>
      <p>MAIN CONTENT</p>
    </Layout>
  )
}

export default ContentArea

export function Head({
  data: {
    siteMetadata: { data },
    prismicGradeSpan,
  },
  location,
}) {
  const { pathname } = location
  return (
    <Seo
      {...data}
      pageTitle={prismicContentArea.data.content_area_title.text}
      pathname={pathname}
    >
      <title>{`${prismicContentArea.data.content_area_title.text} | ${
        prismicContentArea.lang === 'en-us'
          ? 'Curriculum & Instruction'
          : prismicContentArea.lang === 'es-es'
          ? 'Currículo e Instrucción'
          : 'Currículo e Instrução'
      }`}</title>
    </Seo>
  )
}

export const query = graphql`
  query ContentAreaQuery($lang: String!, $id: String!, $uid: String!) {
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
    prismicContentArea(id: { eq: $id }, lang: { eq: $lang }) {
      id
      type
      lang
      url
      uid
      alternate_languages {
        id
        uid
        type
        lang
      }
      data {
        content_area_title {
          richText
          text
        }
      }
    }
    allPrismicCurriculum(
      filter: {
        data: {
          grade_span: { uid: { eq: $uid } }
          content_area: { uid: { eq: "english-language-arts" } }
        }
      }
    ) {
      nodes {
        data {
          content_area {
            document {
              ... on PrismicContentArea {
                id
                data {
                  content_area_title {
                    text
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
