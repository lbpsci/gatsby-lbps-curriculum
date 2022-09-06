import * as React from 'react'

const Seo = ({
  children,
  site_description = 'DESCRIPTION PROP MISSING',
  site_social_image,
  site_title,
  pageTitle,
  site_url,
  pathname,
}) => {
  return (
    <>
      {/* OG TAGS */}
      <meta property="og:url" content={site_url} />
      <meta property="og:type" content={`website`} />
      <meta
        id="og-image"
        property="og:image"
        content={`${site_social_image.url}`}
      />
      <meta
        id="og-title"
        property="og:title"
        content={`${pageTitle} | ${site_title}`}
      />
      <meta name="description" content={site_description} />
      <meta property="og:description" content={site_description} />
      {/* TWITTER TAGS */}
      <meta
        id="twitter-image"
        property="twitter:image"
        content={`${site_social_image.url}`}
      />
      <meta id="twitter-card" property="twitter:card" content="summary" />
      <link rel="canonical" href={site_url + pathname} />
      {children}
    </>
  )
}

export default Seo
