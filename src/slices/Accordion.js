import * as React from 'react'
import { graphql, Link } from 'gatsby'
import { PrismicRichText } from '@prismicio/react'
import { linkResolver } from '../utils/linkResolver'
import Section from '../components/Section'
import Heading from '../components/Heading'
import { HiChevronRight } from 'react-icons/hi'

export const Accordion = ({ slice }) => {
  const components = {
    heading2: ({ node, children }) => {
      return (
        <Heading level={2} className="text-center my-4 md:my-5 lg:my-6">
          {children}
        </Heading>
      )
    },
    heading3: ({ node, children }) => {
      return (
        <Heading level={3} className="text-center my-4 md:my-5 lg:my-6">
          {children}
        </Heading>
      )
    },
    heading4: ({ node, children }) => {
      return (
        <Heading level={4} className="text-center my-4 md:my-5 lg:my-6">
          {children}
        </Heading>
      )
    },
    heading5: ({ node, children }) => {
      return (
        <Heading level={5} className="text-center my-4 md:my-5 lg:my-6">
          {children}
        </Heading>
      )
    },
    heading6: ({ node, children }) => {
      return (
        <Heading level={6} className="text-center my-4 md:my-5 lg:my-6">
          {children}
        </Heading>
      )
    },
    paragraph: ({ node, children }) => {
      return (
        <p
          className={`prose prose-emerald md:prose-lg lg:prose-xl xl:prose-2xl dark:prose-invert mx-auto my-4`}
        >
          {children}
        </p>
      )
    },
    hyperlink: ({ node, children }) => {
      const { data } = node
      if (data.link_type === 'Document') {
        return <Link to={linkResolver(data)}>{children}</Link>
      } else {
        return <a href={data.url}>{children}</a>
      }
    },
    list: ({ node, children }) => {
      return (
        <ul className="prose prose-emerald md:prose-lg lg:prose-xl xl:prose-2xl dark:prose-invert mx-auto">
          {children}
        </ul>
      )
    },
    oList: ({ node, children }) => {
      return (
        <ol className="prose prose-emerald md:prose-lg lg:prose-xl xl:prose-2xl dark:prose-invert mx-auto">
          {children}
        </ol>
      )
    },
    listItem: ({ node, children }) => {
      return <li className="list-disc ml-8">{children}</li>
    },
    oListItem: ({ node, children }) => {
      return <li className="list-decimal ml-8">{children}</li>
    },
    embed: ({ node }) => {
      if (node.oembed.provider_name === 'YouTube') {
        return (
          <div
            dangerouslySetInnerHTML={{
              __html: node.oembed.html.replace(
                'width="200" height="113"',
                'width="640" height="480"'
              ),
            }}
            data-oembed={node.oembed.embed_url}
            data-oembed-type={node.oembed.type}
            data-oembed-provider={node.oembed.provider_name}
            className="max-w-screen-sm mx-auto my-4 md:my-6 lg:my-8 xl:my-10"
          />
        )
      }
    },
    image: ({ node }) => (
      <a href={node.url}>
        <img
          src={node.url}
          alt={node.alt || ''}
          className="max-w-screen-sm mx-auto"
          style={{ width: '100%' }}
        />
      </a>
    ),
  }
  const {
    primary: { accordion_description },
    items,
  } = slice
  return (
    <Section>
      <div className="max-w-screen-md mx-auto">
        {accordion_description && (
          <PrismicRichText
            field={accordion_description.richText}
            components={components}
          />
        )}
      </div>
      <div className="grid grid-col-1 gap-y-4 divide-y-2 divide-dotted">
        {items.length &&
          items.map((item, i) => (
            <details key={item.accordion_topic} className="pt-4">
              <summary className="text-2xl flex items-center p-4 bg-emerald-900 text-white list-none rounded cursor-pointer max-w-screen-lg mx-auto">
                <HiChevronRight className="inline w-6 h-6" />
                {item.accordion_topic}
              </summary>
              <div className="py-4">
                <PrismicRichText
                  field={item.accordion_explanation.richText}
                  components={components}
                />
              </div>
            </details>
          ))}
      </div>
    </Section>
  )
}

export const query = graphql`
  fragment PageDataBodyAccordion on PrismicPageDataBodyAccordion {
    id
    slice_type
    primary {
      accordion_description {
        richText
      }
    }
    items {
      accordion_explanation {
        richText
      }
      accordion_topic
    }
  }
`
