// develop by Mr. Gilbert Defante Cuerbo
// started on Oct 3, 2018
// develop using ES6

// generate the intire html parser process
((factory) => {
  // check if the application is running
  //  on the browser or in node
  if (
    typeof exports === 'object' &&
    typeof module !== 'undefined' &&
    typeof require === 'function'
  ) {
    // the app is running on the node
    module.exports = factory()
  } else {
    // the app is runniong on the browser
    // append the library to the window or global world
    window.HtmlParser = factory()
  }

})(() => {
  'use strict'
  // the parser factory
  // regex character detector
  const LINE_BREAK_REGEX = /\r?\n|\r/g
  const MULTIPLE_SPACE_REGEX = /( {2})+/g
  const HTML_COMMENT_REGEX = /(<!--)+(.*)+(-->)/g

  // the local function global to the main class
  // reusable functions

  // clean all unwanted codes or characters
  let cleanHtmlString = htmlString => {
    // remove all html comments
    // multiple spaces and line Breaks
    return htmlString
              .replace(HTML_COMMENT_REGEX, '')
              .replace(MULTIPLE_SPACE_REGEX, '')
              .replace(LINE_BREAK_REGEX, '')
  }

  let toJsonParser = htmlString => {
    let parsed = {}

    // check if the parameter is really a string
    // then start the process of parsing
    if (typeof htmlString == 'string') {
      // remove unwanted codes
      let cleanHtml = cleanHtmlString(htmlString)

      console.log('original:', htmlString)
      console.log('cleaned:', cleanHtml)
    }

    return parsed
  }

  // the main codes of the parser
  class Main {
    constructor() {
      this.test = 'tesing property'
    }

    toHtml(json) {
      console.log('parsing html to json:', json)
    }

    // the main call for html string convertion to json data
    toJson(htmlString) {
      let parsed = {}

      parsed = toJsonParser(htmlString)

      return parsed
    }
  }

  return Main
})
