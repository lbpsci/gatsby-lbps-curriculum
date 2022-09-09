const path = require('path')
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})
module.exports = {
  /* Your site config here */
  flags: {
    // DEV_SSR: true,
  },
  trailingSlash: 'always',
  siteMetadata: {
    siteTitle: 'Curriculum & Instruction',
    siteDescription:
      'The Long Branch Public Schools Curriculum & Instruction office is dedicated to helping all stakeholder receive helpful resources related to what we teach and how we teach it.',
    siteUrl: 'https://www.lb-ci.org',
    siteImage: 'defaultSiteImage.png',
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-postcss`,
    `gatsby-plugin-netlify`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-gdpr-cookies`,
      options: {
        googleTagManager: {
          trackingId: process.env.GATSBY_GOOGLE_ANALYTICS_TRACKING_ID, // leave empty if you want to disable the tracker
          cookieName: 'gatsby-gdpr-google-tagmanager', // default
          dataLayerName: 'dataLayer',
        },
        environments: ['production'],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Curriculm & Instruction`,
        short_name: `LBPSC&I`,
        start_url: `/`,
        background_color: `#064E3B`,
        theme_color: `#D1FAE5`,
        display: `standalone`,
        icon: `src/images/lbps_logo.png`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'images',
        path: path.join(__dirname, `src`, `images`),
      },
      __key: 'images',
    },
    {
      resolve: `gatsby-source-prismic`,
      options: {
        repositoryName: process.env.GATSBY_PRISMIC_REPO_NAME,
        customTypesApiToken: process.env.PRISMIC_CUSTOM_TYPES_API_TOKEN,
        linkResolver: require('./src/utils/linkResolver').linkResolver,
      },
    },
    `gatsby-transformer-sharp`,
  ],
}
