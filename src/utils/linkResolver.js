exports.linkResolver = doc => {
  switch (doc.type) {
    case 'grade_span': {
      return doc.lang === 'en-us'
        ? `/curricula/${doc.uid}/`
        : `/${doc.lang}/curricula/${doc.uid}/`
    }
    case 'homepage': {
      return doc.lang === 'en-us' ? '/' : `/${doc.lang}/`
    }
    case 'curricula_page': {
      return doc.lang === 'en-us' ? '/curricula' : `/${doc.lang}/curricula/`
    }
    case 'page': {
      return doc.lang === 'en-us' ? `/${doc.uid}` : `/${doc.lang}/${doc.uid}/`
    }
    default:
      return '/'
  }
}
