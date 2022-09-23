import * as React from 'react'
import {
  PrismicPreviewProvider,
  componentResolverFromMap,
} from 'gatsby-plugin-prismic-previews'
import { linkResolver } from './src/utils/linkResolver'
import PageTemplate from './src/templates/page'
import ContentAreaTemplate from './src/templates/contentarea'
import CurriculaTemplate from './src/templates/curricula'
import GradeSpanTemplate from './src/templates/gradespan'
import HomePageTemplate from './src/templates/homepage'

export const wrapRootElement = ({ element }) => (
  <PrismicPreviewProvider
    repositoryConfigs={[
      {
        repositoryName: process.env.GATSBY_PRISMIC_REPO_NAME,
        linkResolver,
        componentResolver: componentResolverFromMap({
          page: PageTemplate,
          contentarea: ContentAreaTemplate,
          curricula: CurriculaTemplate,
          gradespan: GradeSpanTemplate,
          homepage: HomePageTemplate,
        }),
      },
    ]}
  >
    {element}
  </PrismicPreviewProvider>
)
export const onRenderBody = ({ setHtmlAttributes }) => {
  setHtmlAttributes({ lang: 'en-us' })
}
