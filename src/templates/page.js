import * as React from 'react'
import { graphql, navigate } from 'gatsby'
import Layout from '../components/Layout'
import Seo from '../components/Seo'
import { SliceZone } from '@prismicio/react'
import { components } from '../slices'
import { withPrismicPreview } from 'gatsby-plugin-prismic-previews'

const PageTemplate = ({ data, path }) => {
  const {
    siteMetadata: {
      data: { district_name, site_title },
    },
    prismicPage,
    prismicMainMenu,
    prismicTopMenu,
  } = data
  console.log(prismicMainMenu)
  const pageContent = prismicPage
  const alternateLanguages = pageContent.alternate_languages || []
  const { lang, type, url } = pageContent
  const activeDoc = {
    lang,
    type,
    url,
    alternateLanguages,
  }
  const doc = prismicPage.data

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
    <Layout
      siteTitle={site_title}
      path={path}
      districtName={district_name}
      activeDocMeta={activeDoc}
      sideDrawer={prismicMainMenu.data}
      topMenu={prismicTopMenu.data}
    >
      <SliceZone slices={doc.body} components={components} />
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

export default withPrismicPreview(PageTemplate)

export const query = graphql`
  query PageTemplateQuery($lang: String!, $id: String!) {
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
    prismicPage(id: { eq: $id }, lang: { eq: $lang }) {
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
          ...PageDataBodyAccordion
          ...PageDataBodyQuote
          ...PageDataBodyButtonlink
          ...PageDataBodySideBySideLists
        }
      }
    }
    prismicMainMenu(lang: { eq: $lang }) {
      _previewable
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
      _previewable
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
