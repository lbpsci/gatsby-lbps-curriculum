exports.linkResolver = doc => {
  switch (doc.type) {
    case 'homepage': {
      return doc.lang === 'en-us' ? '/' : `/${doc.lang}/`
    }
    default:
      return '/'
  }
}
