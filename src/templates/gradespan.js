import React from 'react'
import { graphql, Link } from 'gatsby'
import { PrismicRichText } from '@prismicio/react'
import Layout from '../components/Layout'
import Section from '../components/Section'
import Seo from '../components/Seo'
import Heading from '../components/Heading'
import ButtonLink from '../components/ButtonLink'

const GradeSpan = ({ data, path }) => {
  const {
    siteMetadata: {
      data: { district_name, site_title },
    },
    prismicGradeSpan,
    allPrismicCurriculum,
  } = data
  const gradeSpanContent = prismicGradeSpan
  const alternateLanguages = gradeSpanContent.alternate_languages || []
  const { lang, type, url } = gradeSpanContent
  const activeDoc = {
    lang,
    type,
    url,
    alternateLanguages,
  }
  const allCurricula = allPrismicCurriculum.nodes.map(
    node => node.data.content_area.document.data.content_area_title.text
  )
  const uniqueCurricula = [...new Set(allCurricula)]
  console.log(uniqueCurricula)

  // console.log('gradespan data ===> ', data)
  return (
    <Layout
      siteTitle={site_title}
      districtName={district_name}
      activeDocMeta={activeDoc}
      path={path}
    >
      <p>MAIN CONTENT</p>
    </Layout>
  )
}

export default GradeSpan

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
      pageTitle={prismicGradeSpan.data.grade_span_page_heading.text}
      pathname={pathname}
    >
      <title>{`${prismicGradeSpan.data.grade_span_page_heading.text} | ${
        prismicGradeSpan.lang === 'en-us'
          ? 'Curriculum & Instruction'
          : prismicGradeSpan.lang === 'es-es'
          ? 'Currículo e Instrucción'
          : 'Currículo e Instrução'
      }`}</title>
    </Seo>
  )
}

export const query = graphql`
  query GradeSpanQuery($lang: String!, $id: String!, $uid: String!) {
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
    prismicGradeSpan(id: { eq: $id }, lang: { eq: $lang }) {
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
        grade_span {
          text
        }
        grade_span_description_heading {
          text
          richText
        }
        grade_span_divider_text {
          text
          richText
        }
        grade_span_page_heading {
          richText
          text
        }
        grade_span_page_intro {
          richText
        }
      }
    }
    allPrismicCurriculum(
      filter: { data: { grade_span: { uid: { eq: $uid } } } }
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
