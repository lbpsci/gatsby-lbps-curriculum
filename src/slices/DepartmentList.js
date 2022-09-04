import * as React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { PrismicRichText } from '@prismicio/react'
import Heading from '../components/Heading'
import ButtonLink from '../components/ButtonLink'

export const DepartmentList = ({ slice }) => {
  const { items } = slice
  const components = {
    paragraph: ({ node, children }) => {
      return (
        <p className="prose prose-emerald md:prose-lg lg:prose-xl xl:prose-2xl dark:prose-invert mx-auto">
          {children}
        </p>
      )
    },
  }
  return (
    <div className="department-list">
      <ul className="divide-y">
        {items.length &&
          items.map(dept => {
            const {
              departments: {
                document: {
                  data: {
                    department_description,
                    department_site_url,
                    department_site_button_text,
                    department_title,
                    logo,
                  },
                  id,
                },
              },
            } = dept
            return (
              <li key={id}>
                <GatsbyImage
                  image={getImage(logo)}
                  alt={logo.alt || ''}
                  className="department-logo"
                />
                <div>
                  <Heading
                    level={4}
                    className="text-xl md:text-2xl lg:text-3xl font-light text-center my-4 md:my-6 lg:my-8"
                  >
                    {department_title.text}
                  </Heading>

                  <PrismicRichText
                    components={components}
                    field={department_description.richText}
                  />

                  <ButtonLink url={department_site_url.url}>
                    {department_site_button_text}
                  </ButtonLink>
                </div>
              </li>
            )
          })}
      </ul>
    </div>
  )
}

export const query = graphql`
  fragment HomepageDataBodyDepartmentList on PrismicHomepageDataBodyDepartmentList {
    id
    slice_type
    items {
      departments {
        document {
          ... on PrismicDepartment {
            id
            data {
              department_description {
                richText
              }
              department_site_url {
                link_type
                lang
                url
              }
              department_title {
                text
              }
              logo {
                alt
                gatsbyImageData(
                  width: 180
                  height: 180
                  placeholder: BLURRED
                  layout: FIXED
                )
              }
              department_site_button_text
            }
          }
        }
      }
    }
  }
`
