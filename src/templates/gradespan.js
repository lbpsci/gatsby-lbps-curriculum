import * as React from 'react'
import { graphql } from 'gatsby'
import { PrismicRichText } from '@prismicio/react'
import Layout from '../components/Layout'
import Section from '../components/Section'
import Seo from '../components/Seo'
import Heading from '../components/Heading'
import ButtonLink from '../components/ButtonLink'
import Breadcrumb from '../components/Breadcrumb'

const GradeSpan = ({ data, location: { pathname }, path }) => {
  const {
    siteMetadata: {
      data: { district_name, site_title },
    },
    prismicGradeSpan,
    allPrismicCurriculum,
    prismicMainMenu,
    prismicTopMenu,
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

  const allCurricula = allPrismicCurriculum.nodes.map(node => {
    return {
      subjectTitle:
        node.data.content_area.document.data.content_area_title.text,
      subjectUid: node.data.content_area.document.uid,
    }
  })
  const uniqueCurricula = [
    ...new Map(allCurricula.map(item => [item['subjectUid'], item])).values(),
  ]

  React.useEffect(() => {
    document.documentElement.setAttribute('lang', lang)
  })
  return (
    <Layout
      siteTitle={site_title}
      districtName={district_name}
      activeDocMeta={activeDoc}
      path={path}
      sideDrawer={prismicMainMenu.data}
      topMenu={prismicTopMenu.data}
    >
      <Breadcrumb pathname={pathname} activeDoc={activeDoc} />
      <div className="prose prose-emerald md:prose-lg lg:prose-xl xl:prose-2xl dark:prose-invert mx-auto py-4 md:py-6 lg:py-8 xl:py-10">
        <Heading level={2} className="text-center">
          {gradeSpanContent.data.grade_span_page_heading.text}
        </Heading>
        <PrismicRichText
          field={gradeSpanContent.data.grade_span_page_intro.richText}
        />
      </div>
      <Section headerText={gradeSpanContent.data.grade_span_divider_text.text}>
        {uniqueCurricula.length ? (
          <ul className="max-w-screen-lg mx-auto my-4 md:my-6 lg:my-8 xl:my-10 grid md:grid-cols-2 gap-6 text-center mt-2">
            {uniqueCurricula.map(curr => {
              return (
                <li key={curr.subjectUid}>
                  <ButtonLink
                    type="Document"
                    url={`${url}${curr.subjectUid}`}
                    className="w-full"
                  >
                    {curr.subjectTitle}
                  </ButtonLink>
                </li>
              )
            })}
          </ul>
        ) : lang === 'es-es' ? (
          <p className="prose prose-emerald md:prose-lg lg:prose-xl xl:prose-2xl mx-auto">
            Aún no hemos publicado ningún currículo. Por favor, revise luego.
          </p>
        ) : lang === 'pt-br' ? (
          <p className="prose prose-emerald md:prose-lg lg:prose-xl xl:prose-2xl mx-auto">
            Ainda não publicamos nenhum currículo. Por favor, volte em breve.
          </p>
        ) : (
          <p className="prose prose-emerald md:prose-lg lg:prose-xl xl:prose-2xl mx-auto">
            We have yet to publish any curricula. Please check back soon.
          </p>
        )}
      </Section>
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
      filter: {
        lang: { eq: $lang }
        data: { grade_span: { uid: { eq: $uid } } }
      }
    ) {
      nodes {
        data {
          content_area {
            document {
              ... on PrismicContentArea {
                id
                uid
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
    prismicMainMenu(lang: { eq: $lang }) {
      lang
      data {
        side_drawer_menu_logo {
          gatsbyImageData(
            height: 120
            width: 120
            layout: CONSTRAINED
            placeholder: BLURRED
          )
        }
        upper_side_drawer_menu_items {
          upper_side_drawer_menu_item_text
          menu_item {
            id
            url
            type
          }
        }
        lower_side_drawer_menu_items {
          lower_side_drawer_menu_item_text
          lower_menu_items {
            id
            url
            type
          }
        }
        side_drawer_grade_spans {
          side_drawer_grade_span_text
          side_drawer_grade_spans {
            id
            url
            type
          }
        }
      }
    }
    prismicTopMenu(lang: { eq: $lang }) {
      alternate_languages {
        lang
        type
      }
      lang
      data {
        top_menu_light_mode_text
        top_menu_dark_mode
        top_menu_right_side_logo {
          gatsbyImageData(
            height: 48
            width: 48
            placeholder: BLURRED
            layout: FIXED
          )
          alt
        }
        top_menu_logo_link {
          url
        }
      }
    }
  }
`
