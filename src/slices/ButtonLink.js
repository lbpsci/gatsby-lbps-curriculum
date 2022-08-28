import * as React from 'react'
import { graphql } from 'gatsby'
import Button from '../components/ButtonLink'

export const ButtonLink = ({ slice }) => {
  const {
    primary: {
      button_link_url: { link_type, url },
      button_link_text,
    },
  } = slice
  return (
    <div className="text-center my-4">
      <Button url={url} type={link_type}>
        {button_link_text}
      </Button>
    </div>
  )
}

export const query = graphql`
  fragment HomepageDataBodyButtonlink on PrismicHomepageDataBodyButtonlink {
    id
    slice_type
    primary {
      button_link_text
      button_link_url {
        link_type
        url
      }
    }
  }
`
