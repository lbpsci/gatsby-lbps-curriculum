import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import * as React from 'react'
import { withPrismicUnpublishedPreview } from 'gatsby-plugin-prismic-previews'
import ButtonLink from '../components/ButtonLink'

const NotFoundPage = ({
  data: {
    file: {
      childImageSharp: { gatsbyImageData },
    },
  },
  location: { pathname },
}) => {
  return (
    <div className="text-white min-h-screen bg-emerald-900 flex flex-col justify-center items-center">
      <GatsbyImage
        image={getImage(gatsbyImageData)}
        alt="LBPS Curriculum & Instruction logo"
      />
      <h1 className="text-5xl md:text-6xl lg:text-7xl mb-4 md:mb-6 lg:mb-8">
        404 Error: Oops!
      </h1>
      <div className="border rounded max-w-screen-sm prose prose-emerald md:prose-lg lg:prose-xl xl:prose-2xl text-white p-4 md:p-6">
        <p>
          It appears you have found a page that does not exist. Let's get you
          back to one that does...
        </p>
        <ButtonLink type="internal" url="/" className="invert">
          Return Home
        </ButtonLink>
      </div>
    </div>
  )
}

export default withPrismicUnpublishedPreview(NotFoundPage)

export const NotFoundQuery = graphql`
  {
    file(name: { eq: "curriculum_logo" }) {
      childImageSharp {
        gatsbyImageData(height: 300, width: 300, layout: CONSTRAINED)
      }
    }
    siteMetadata: prismicSitemetadata {
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
    prismicMainMenu {
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
      }
    }
    prismicTopMenu {
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
