exports.linkResolver = doc => {
  switch (doc.type) {
    case 'homepage': {
      return doc.lang === 'en-us' ? '/' : `/${doc.lang}/`
    }
    case 'page': {
      return doc.lang === 'en-us' ? `/${doc.uid}` : `/${doc.lang}/${doc.uid}/`
    }
    default:
      return '/'
  }
}
