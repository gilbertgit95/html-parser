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

  // tag rules
  const tagTypes = {
    typeA: 0, // <!doctype blabla "bla">
    typeB: 1, // <tag blabbla="bla" blaba >
    typeC: 2, // </tag>
    typeD: 3, // <tag blabbla="bla" blaba />
    typeE: 4 // <tag blabbla="bla" blaba >typed</tag> (text node)
  }

  // property rules
  const propType = {
    propValue: 0, // <tag prop="value">
    prop: 1, // <tag prop>
    value: 2, // <tag "value" />
  }

  // the parser factory
  // regex character detector
  const LINE_BREAK_REGEX = /\r?\n|\r/g
  const MULTIPLE_SPACE_REGEX = /( {2})+/g
  const HTML_COMMENT_REGEX = /<\!-+.*-+>/g

  // element types detectors regex
  const FIRST_TAG = /<[^<>]+>/
  const GLOBAL_TAG = /<[^<>]+>/g

  const TYPEA_TAG = /<\!+[^-<>]+>/g
  const TYPEB_TAG = /<[^!<>\/][^<>]+[^\/]>/g
  const TYPEC_TAG = /<\/[^<>]+>/g
  const TYPED_TAG = /<[^<>]+\/>/g

  const TYPEA_ATTRIBUTE = / [^<>"= ]+[ |>|\/]/g
  const TYPEB_ATTRIBUTE = / [^<> ]+="[^<>"]+"/g
  const TYPEC_ATTRIBUTE = / "[^<>" ]+"/g
  // match a tag specific tag for dinamic tag matching
  const matchTypeBCTags = (tag, htmlString) => {
    let reg = new RegExp(`(<${ tag }|<\/${ tag })(>| [^<>]+>)`, 'g')
    return htmlString.match(reg)
  }
  // get the tagname from html tag
  const getTagName = (tag) => {
    let reg = /<[^<>\/\!=" ]+/
    let match = tag.match(reg)

    return match? match[0].substr(1, match[0].length): null
  }

  // the local function global to the main class
  // reusable functions
  let tagType = tag => {
    // tag on 3 types of identification
    if (tag.match(TYPEB_TAG)) {
      return 1
    } else if (tag.match(TYPEC_TAG)) {
      return 2
    } else if (tag.match(TYPED_TAG)) {
      return 3
    } else if (tag.match(TYPEA_TAG)) {
      return 0
    } else {
      return 4
    }
  }

  let extractHtmlBlock = (tag, htmlString) => {
    // let matches = matchTypeBCTags(tag, htmlString)
    let tagName = getTagName(tag)
    let matches = matchTypeBCTags(tagName, htmlString)
    let result = {
      remainder: '',
      carry: ''
    }

    if (matches) {
      let type = null
      let closingTag = null
      let closingIndex = -1
      let blockDiff = 1

      // get the closing tag
      for (let i = 0; i < matches.length; i++) {
        if (tagType(matches[i]) === 2) {
          closingTag = matches[i]
          break
        }
      }

      // find the closing tag index
      for (let i = 1; i < matches.length; i++) {
        if (blockDiff !== 0) {
          if (tagType(matches[i]) === 1) {
            blockDiff++
          } else if (tagType(matches[i]) === 2) {
            blockDiff--
            closingIndex++
          }
        } else {
          break
        }
      }

      // extraction
      if (!blockDiff && closingIndex > -1) {
        let startPos = 0
        let carryLength = 0
        let closingMatches = htmlString.split(closingTag)

        startPos = tag.length
        carryLength -= tag.length
        // console.log(closingMatches)
        for (let i = 0; i <= closingIndex; i++) {
          // console.log('loop: ', closingMatches[i])
          carryLength += closingMatches[i].length + closingTag.length
        }
        carryLength -= closingTag.length

        result.carry = htmlString.substr(startPos, carryLength)
        result.remainder = htmlString.substr(
          carryLength + startPos,
          htmlString.length - (carryLength + startPos + closingTag.length)
        )

      } else {
        result = null
      }
    } else {
      result = null
    }

    return result
  }

  // parse the surface layer of the input html htmlString
  let extractSurface = htmlString => {
    let result = []
    let remainedString = htmlString
    let count = 0

    while (remainedString.length) {
      // the extraction process of the first layer
      // loop until all the surface layer done parsing
      let match = remainedString.match(FIRST_TAG)
      // check if there are tag present on the string
      if (match) {
        let tag = match[0]
        let type = tagType(tag)

        // proccess the string bfore the first match tag
        if (match.index) {
          let text = remainedString.substr(0, match.index)

          remainedString = remainedString.substr(match.index, remainedString.length)
          result.push({
            stringTag: text,
            tagType: 4
          })
        }

        // check type for extraction strategy
        if (type == tagTypes.typeB) {
          // console.log('proccess for the block of tag')
          let htmlBlockData = extractHtmlBlock(tag, remainedString)

          remainedString = htmlBlockData.remainder
          result.push({
            stringTag: tag,
            tagType: type,
            unparsed: htmlBlockData.carry
          })

        } else {
          // proccess for inline tag extraction

          remainedString = remainedString.substr(tag.length, remainedString.length)
          result.push({
            stringTag: tag,
            tagType: type
          })
        }

        count++
      } else {
        // push as test node or type 4 tag
        result.push({
          stringTag: remainedString,
          tagType: 4
        })
      }
    }
    return result
  }

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
    let parsed = null

    // check if the parameter is really a string
    // then start the process of parsing
    if (typeof htmlString == 'string') {
      // remove unwanted codes
      let nodes = [{
        nodes: [],
        unparsed: cleanHtmlString(htmlString)
      }]

      // initiate first loop
      // nodes[0].nodes = extractSurface(nodes[0].unparsed)
      // delete nodes[0].unparsed

      let tempNodes = nodes
      // the infinit parsing loop until all are parsed
      let deep = 2
      let hasUnparsed = true

      // loop by deep until all are parsed
      // while (hasUnparsed || deep < 2) {
        let level = 1
        while (level < deep) {
          let tempNodesCopy = []
          for (let i = 0; i < tempNodes.length; i++) {
            // proccess only those unparsed
            if (tempNodes[i].unparsed) {
              tempNodes[i].nodes = extractSurface(tempNodes[i].unparsed)
              delete tempNodes[i].unparsed
            }
            tempNodesCopy = tempNodesCopy.concat(tempNodes[i].nodes)
          }
          hasUnparsed = tempNodesCopy.length? true: false
          tempNodes = tempNodesCopy
          level++
        }
      //   deep++
      // }

      parsed = nodes
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
