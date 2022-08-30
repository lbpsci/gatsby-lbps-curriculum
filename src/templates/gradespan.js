import React from 'react'
import { graphql, Link } from 'gatsby'
import { PrismicRichText } from '@prismicio/react'
import Layout from '../components/Layout'
import Section from '../components/Section'
import Seo from '../components/Seo'
import Heading from '../components/Heading'
import ButtonLink from '../components/ButtonLink'

const GradeSpan = ({ data, path }) => {
  return (
    <Layout>
      <p>MAIN CONTENT</p>
    </Layout>
  )
}

export default GradeSpan

export const query = graphql`
  query GradeSpanQuery($lang: String!) {
    prismicGradeSpan(lang: { eq: $lang }) {
      id
    }
  }
`
