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

  // the local function global to the main class
  // reusable functions
  let toJsonParser = (htmlString) => {
    let parsed = {}

    // check if the parameter is really a string
    // then start the process of parsing
    if (typeof htmlString == 'string') {
      
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
