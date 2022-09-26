import * as React from 'react'
import { graphql } from 'gatsby'
import Blockquote from '../components/Blockquote'

export const Quote = ({ slice }) => {
  const {
    primary: {
      quote_author_name,
      quote_avatar: { alt, gatsbyImageData },
      quote_link: { url },
      quote_text,
    },
  } = slice
  return (
    <div>
      <Blockquote
        quote={quote_text}
        author={quote_author_name}
        image={gatsbyImageData}
        imageAlt={alt}
        url={url}
      />
    </div>
  )
}

export const query = graphql`
  fragment HomepageDataBodyQuote on PrismicHomepageDataBodyQuote {
    id
    slice_type
    primary {
      quote_author_name
      quote_link {
        link_type
        url
      }
      quote_text {
        richText
        text
      }
      quote_avatar {
        alt
        gatsbyImageData(
          placeholder: BLURRED
          height: 35
          width: 35
          layout: FIXED
        )
      }
    }
  }
  fragment PageDataBodyQuote on PrismicPageDataBodyQuote {
    id
    slice_type
    primary {
      quote_author_name
      quote_link {
        link_type
        url
      }
      quote_text {
        richText
        text
      }
      quote_avatar {
        alt
        gatsbyImageData(
          placeholder: BLURRED
          height: 35
          width: 35
          layout: FIXED
        )
      }
    }
  }
`
