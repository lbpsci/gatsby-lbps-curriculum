const path = require('path')

exports.createPages = async ({ graphql, actions, reporter }) => {
  const slugify = text => {
    return text
      .toString() // Cast to string (optional)
      .normalize('NFKD') // The normalize() using NFKD method returns the Unicode Normalization Form of a given string.
      .toLowerCase() // Convert the string to lowercase letters
      .trim() // Remove whitespace from both sides of a string (optional)
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[^\w\-]+/g, '') // Remove all non-word chars
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
  }
  const { createPage } = actions

  const queryData = await graphql(`
    {
      allPrismicHomepage {
        nodes {
          id
          lang
          url
        }
      }
      allPrismicCurriculaPage {
        nodes {
          id
          lang
          url
        }
      }
      allPrismicPage {
        nodes {
          id
          lang
          url
        }
      }
      allPrismicGradeSpan {
        nodes {
          id
          lang
          uid
          url
        }
      }
    }
  `)
  if (queryData.errors) {
    reporter.panicOnBuild(`ERROR WHILE RUNNING GRAPHQL QUERY`)
  }

  queryData.data.allPrismicHomepage.nodes.forEach(homepage => {
    createPage({
      path: homepage.url,
      component: path.resolve(__dirname, 'src/templates/homepage.js'),
      context: {
        id: homepage.id,
        lang: homepage.lang,
      },
    })
  })
  queryData.data.allPrismicCurriculaPage.nodes.forEach(page => {
    createPage({
      path: page.url,
      component: path.resolve(__dirname, 'src/templates/curricula.js'),
      context: {
        id: page.id,
        lang: page.lang,
      },
    })
  })
  queryData.data.allPrismicPage.nodes.forEach(page => {
    createPage({
      path: page.url,
      component: path.resolve(__dirname, 'src/templates/page.js'),
      context: {
        id: page.id,
        lang: page.lang,
      },
    })
  })
  // queryData.data.allPrismicGradeSpan.nodes.forEach(page => {
  //   createPage({
  //     path: page.url,
  //     component: path.resolve(__dirname, 'src/templates/page.js'),
  //     context: {
  //       id: page.id,
  //       lang: page.lang,
  //     },
  //   })
  // })
}
