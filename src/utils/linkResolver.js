exports.linkResolver = doc => {
  switch (doc.type) {
    case 'grade_span': {
      console.log('grade_span linkResolver says...', doc)
      return doc.lang === 'en-us'
        ? `/curricula/${doc.uid}/`
        : `/${doc.lang}/curricula/${doc.uid}/`
    }
    case 'content_area': {
      console.log('linkResolver says ===> ', doc.data)
      break
    }
    case 'homepage': {
      console.log('homepage linkResolver says...', doc)
      return doc.lang === 'en-us' ? '/' : `/${doc.lang}/`
    }
    case 'curricula_page': {
      console.log('curricula_page linkResolver says...', doc)
      return doc.lang === 'en-us' ? '/curricula' : `/${doc.lang}/curricula/`
    }
    case 'page': {
      console.log('page linkResolver says...', doc)
      return doc.lang === 'en-us' ? `/${doc.uid}` : `/${doc.lang}/${doc.uid}/`
    }
    default:
      console.log('default linkResolver says...', doc)
      return '/'
  }
}
