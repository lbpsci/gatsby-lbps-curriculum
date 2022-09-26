import * as React from 'react'
import { graphql } from 'gatsby'
import { PrismicRichText } from '@prismicio/react'
import Heading from '../components/Heading'

export const SideBySideList = ({ slice }) => {
  const {
    primary: { left_list, right_list, left_list_title, right_list_title },
  } = slice
  return (
    <div className="grid sm:grid-cols-2 prose md:prose-lg lg:prose-xl xl:prose-2xl mx-auto">
      <div>
        <Heading level={3} className="text-center">
          {left_list_title.text}
        </Heading>
        <PrismicRichText field={left_list.richText} />
      </div>
      <div>
        <Heading level={3} className="text-center">
          {right_list_title.text}
        </Heading>
        <PrismicRichText field={right_list.richText} />
      </div>
    </div>
  )
}

export const query = graphql`
  fragment HomepageDataBodySideBySideLists on PrismicHomepageDataBodySideBySideLists {
    id
    slice_type
    primary {
      left_list {
        richText
      }
      left_list_title {
        text
      }
      right_list {
        richText
      }
      right_list_title {
        text
      }
    }
  }
  fragment PageDataBodySideBySideLists on PrismicPageDataBodySideBySideLists {
    id
    slice_type
    primary {
      left_list {
        richText
      }
      left_list_title {
        text
      }
      right_list {
        richText
      }
      right_list_title {
        text
      }
    }
  }
`
