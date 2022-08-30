import React from 'react'
import { graphql, Link } from 'gatsby'
import { PrismicRichText } from '@prismicio/react'
import Layout from '../components/Layout'
import Section from '../components/Section'
import Seo from '../components/Seo'
import Heading from '../components/Heading'
import ButtonLink from '../components/ButtonLink'
import { HiBookOpen } from 'react-icons/hi'

const CurriculaTemplate = ({ data, path }) => {
  const {
    siteMetadata: {
      data: { district_name, site_title },
    },
    prismicCurriculaPage,
  } = data
  const document = prismicCurriculaPage.data
  const alternateLanguages = prismicCurriculaPage.alternate_languages || []
  const { lang, type, url } = prismicCurriculaPage
  const activeDoc = {
    lang,
    type,
    url,
    alternateLanguages,
  }
  const components = {
    heading2: ({ node, children }) => {
      return (
        <Heading level={2} className="text-center">
          {children}
        </Heading>
      )
    },
    paragraph: ({ node, children }) => {
      return (
        <p
          className={`prose prose-emerald md:prose-lg lg:prose-xl xl:prose-2xl dark:prose-invert mx-auto text-left`}
        >
          {children}
        </p>
      )
    },
  }
  console.log('curricula_page ====> ', document)
  return (
    <>
      <Layout
        siteTitle={site_title}
        path={path}
        districtName={district_name}
        activeDocMeta={activeDoc}
      >
        <Section>
          <div className="prose prose-emerald md:prose-lg lg:prose-xl xl:prose-2xl  dark:prose-invert mx-auto my-4 md:my-6 lg:my-8">
            <PrismicRichText
              components={components}
              field={document.curricula_page_intro.richText}
            />
          </div>
        </Section>
        {document.curricula_grade_spans.map((span, i) => {
          const {
            curricula_grade_span: {
              document: {
                id,
                data: {
                  grade_span_description,
                  grade_span_description_heading,
                },
              },
              url,
            },
            curricula_grade_span_sectionheading,
            curricula_grade_span_button_text,
          } = span
          return (
            <Section key={id} headerText={curricula_grade_span_sectionheading}>
              <div
                className={`my-4 md:my-6 max-w-screen-2xl mx-auto flex flex-col justify-center items-center ${
                  i % 2 === 0 ? ` md:flex-row-reverse` : `md:flex-row`
                }`}
              >
                <div className="flex-1 prose prose-emerald md:prose-lg lg:prose-xl xl:prose-2xl dark:prose-invert text-center">
                  <Heading level={3}>
                    {grade_span_description_heading.text}
                  </Heading>
                  <PrismicRichText
                    components={components}
                    field={grade_span_description.richText}
                  />
                  <ButtonLink type="Document" url={url}>
                    {curricula_grade_span_button_text}
                  </ButtonLink>
                </div>
                <div className="flex-1 mx-auto text-center text-emerald-900 dark:text-emerald-200 p-4 my-4 md:my-6 hover:text-emerald-800">
                  <Link
                    to={url}
                    className="inline-block rounded border border-emerald-900 dark:border-emerald-200 p-4 transform transition duration-200 ease-in-out hover:bg-emerald-900 hover:text-white hover:shadow-md hover:shadow-slate-900 dark:hover:shadow-black"
                  >
                    <span className="sr-only">
                      {curricula_grade_span_button_text}
                    </span>
                    <HiBookOpen className="w-32 h-32" />
                  </Link>
                </div>
              </div>
            </Section>
          )
        })}
      </Layout>
    </>
  )
}

export function Head({
  data: {
    siteMetadata: { data },
    prismicCurriculaPage,
  },
  location,
}) {
  const { pathname } = location
  return (
    <Seo
      {...data}
      pageTitle={prismicCurriculaPage.data.curricula_page_title.text}
      pathname={pathname}
    >
      <title>{`${prismicCurriculaPage.data.curricula_page_title.text} | ${
        prismicCurriculaPage.lang === 'en-us'
          ? 'Curriculum & Instruction'
          : prismicCurriculaPage.lang === 'es-es'
          ? 'Currículo e Instrucción'
          : 'Currículo e Instrução'
      }`}</title>
    </Seo>
  )
}

// EXPORTS
export default CurriculaTemplate

export const query = graphql`
  query CurriculaTemplateQuery($lang: String) {
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
    prismicCurriculaPage(lang: { eq: $lang }) {
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
        curricula_page_title {
          text
        }
        curricula_page_intro {
          richText
        }
        curricula_grade_spans {
          curricula_grade_span_sectionheading
          curricula_grade_span_button_text
          curricula_grade_span {
            url
            document {
              ... on PrismicGradeSpan {
                id
                data {
                  grade_span_description {
                    richText
                  }
                  grade_span {
                    text
                  }
                  grade_span_description_heading {
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
