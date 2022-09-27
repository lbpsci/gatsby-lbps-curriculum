import * as React from 'react'
import { graphql, navigate } from 'gatsby'
import { withPrismicPreview } from 'gatsby-plugin-prismic-previews'
import Layout from '../components/Layout'
import Seo from '../components/Seo'
import Hero from '../components/Hero'
import { SliceZone } from '@prismicio/react'
import { components } from '../slices'

const HomepageTemplate = ({ data, path }) => {
  const {
    siteMetadata: {
      data: { district_name, site_title },
    },
    prismicHomepage,
    prismicMainMenu,
    prismicTopMenu,
  } = data
  const doc = prismicHomepage.data
  const alternateLanguages = prismicHomepage.alternate_languages || []
  const { lang, type, url } = prismicHomepage
  const activeDoc = {
    lang,
    type,
    url,
    alternateLanguages,
  }

  React.useEffect(() => {
    document.documentElement.setAttribute('lang', lang)
    const langPref = localStorage.getItem('lang')
    if (langPref && langPref !== 'en-us' && url.indexOf(langPref) === -1) {
      navigate(`/${langPref}${url}`)
    } else {
      localStorage.setItem('lang', lang)
    }
  }, [lang, url])

  return (
    <>
      <Layout
        siteTitle={site_title}
        path={path}
        districtName={district_name}
        activeDocMeta={activeDoc}
        sideDrawer={prismicMainMenu.data}
        topMenu={prismicTopMenu.data}
      >
        <Hero {...doc} />
        <SliceZone slices={doc.body} components={components} />
      </Layout>
    </>
  )
}

export function Head({
  data: {
    siteMetadata: { data },
    prismicHomepage,
  },
  location,
}) {
  const { pathname } = location
  return (
    <Seo
      {...data}
      pageTitle={prismicHomepage.data.homepage_title.text}
      pathname={pathname}
    >
      <title>{`${prismicHomepage.data.homepage_title.text} | ${
        prismicHomepage.lang === 'en-us'
          ? 'Curriculum & Instruction'
          : prismicHomepage.lang === 'es-es'
          ? 'Currículo e Instrucción'
          : 'Currículo e Instrução'
      }`}</title>
    </Seo>
  )
}

// EXPORTS
export default withPrismicPreview(HomepageTemplate)

export const query = graphql`
  query HomepageTemplateQuery($lang: String) {
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
    prismicHomepage(lang: { eq: $lang }) {
      _previewable
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
        homepage_title {
          text
        }
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
    prismicMainMenu(lang: { eq: $lang }) {
      lang
      type
      data {
        side_drawer_menu_logo {
          alt
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
        lower_side_drawer_sub_items {
          lower_side_drawer_sub_item_text
          lower_menu_sub_item {
            id
            url
            type
          }
        }
        bottom_side_drawer_menu_items {
          bottom_menu_item_text
          bottom_menu_item {
            id
            type
            url
          }
        }
        close_menu_button
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
          alt
          gatsbyImageData(
            height: 48
            width: 48
            placeholder: BLURRED
            layout: FIXED
          )
        }
        top_menu_logo_link {
          url
        }
      }
    }
  }
`
