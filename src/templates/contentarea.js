import * as React from 'react'
import { graphql, navigate } from 'gatsby'
import Layout from '../components/Layout'
import Section from '../components/Section'
import Seo from '../components/Seo'
import Heading from '../components/Heading'
import { HiChevronRight } from 'react-icons/hi'
import { FaCalendarAlt, FaFilePdf, FaPaperclip } from 'react-icons/fa'
import { translateText } from '../../utils'
import Breadcrumb from '../components/Breadcrumb'

const ContentArea = ({
  data,
  location: { pathname },
  path,
  pageContext: { span },
}) => {
  const {
    siteMetadata: {
      data: { district_name, site_title },
    },
    prismicContentArea,
    allPrismicCurriculum,
    prismicMainMenu,
    prismicTopMenu,
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

  React.useEffect(() => {
    document.documentElement.setAttribute('lang', lang)
    const langPref = localStorage.getItem('lang')
    if (langPref && langPref !== 'en-us' && path.indexOf(langPref) === -1) {
      navigate(`/${langPref}${path.substring(6)}`)
    } else {
      localStorage.setItem('lang', lang)
    }
  }, [lang, path])
  return (
    <Layout
      siteTitle={site_title}
      districtName={district_name}
      activeDocMeta={activeDoc}
      path={path}
      sideDrawer={prismicMainMenu.data}
      topMenu={prismicTopMenu.data}
    >
      <Breadcrumb
        pathname={pathname}
        contentArea={areaContent.data.content_area_title.text}
        activeDoc={activeDoc}
      />
      <Section id="curricula">
        <Heading
          level={2}
          className="text-center capitalize border-b py-4 md:py-6 lg:py-8 xl:py-10"
        >
          {span} {areaContent.data.content_area_title.text}
        </Heading>
        <div className="max-w-md mx-auto">
          {!allPrismicCurriculum.nodes.length && <p>No Curricula Available</p>}
          {allPrismicCurriculum.nodes.map(node => {
            const {
              id,
              data: {
                curriculum_guide,
                curriculum_title,
                esl_appendix,
                pacing_calendar,
              },
            } = node
            return (
              <details key={id}>
                <summary>
                  <HiChevronRight className="inline w-6 h-6" />
                  {curriculum_title.text}
                </summary>
                {curriculum_guide.url ||
                pacing_calendar.url ||
                esl_appendix.url ? (
                  <ul>
                    {curriculum_guide.url && (
                      <li>
                        <a href={curriculum_guide.url}>
                          <FaFilePdf className="curriculum-icon w-8 h-8" />
                          <span className="capitalize">
                            {translateText(
                              'curriculum guide',
                              areaContent.lang
                            )}
                          </span>
                        </a>
                      </li>
                    )}
                    {pacing_calendar.url && (
                      <li>
                        <a href={pacing_calendar.url}>
                          <FaCalendarAlt className="curriculum-icon w-8 h-8" />
                          <span className="capitalize">
                            {translateText('pacing calendar', areaContent.lang)}
                          </span>
                        </a>
                      </li>
                    )}
                    {esl_appendix.url && (
                      <li>
                        <a href={esl_appendix.url}>
                          <FaPaperclip className="curriculum-icon w-8 h-8" />
                          <span className="capitalize">
                            {translateText('esl appendix', areaContent.lang)}
                          </span>
                        </a>
                      </li>
                    )}
                  </ul>
                ) : (
                  <p>No Documents</p>
                )}
              </details>
            )
          })}
        </div>
      </Section>
    </Layout>
  )
}

export default ContentArea

export function Head({
  data: {
    siteMetadata: { data },
    prismicContentArea,
  },
  location,
  pageContext: { span },
}) {
  const { pathname } = location
  return (
    <Seo
      {...data}
      pageTitle={prismicContentArea.data.content_area_title.text}
      pathname={pathname}
    >
      <title>{`${span.toUpperCase()} ${
        prismicContentArea.data.content_area_title.text
      } | ${
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
  query ContentAreaQuery(
    $lang: String!
    $id: String!
    $uid: String!
    $span: String!
  ) {
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
        lang: { eq: $lang }
        data: {
          grade_span: { uid: { eq: $span } }
          content_area: { uid: { eq: $uid } }
        }
      }
      sort: { order: ASC, fields: data___content_area_order }
    ) {
      nodes {
        id
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
          curriculum_guide {
            url
          }
          curriculum_title {
            text
          }
          esl_appendix {
            url
          }
          grade_span {
            uid
          }
          pacing_calendar {
            url
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
