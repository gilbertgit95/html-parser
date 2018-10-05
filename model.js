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

// html string
// json below when converted to html
let htmlText = `
  <!doctype html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <script type="text/javascript" src="" >
      </script>
    </head>

    <body "app-body">

      <!-- the first child of the body -->
      <div class="container main-page" id="main-page">
        <span>hello</span>
      </div>

      <!-- the second child of the body -->
      <input type="text" class="input" />

      <!-- the third child of the body -->
      <div>
      </div>

    </body>
  </html>
`

// sample html json document
// html string above when converted to json
let htmlJson = [
  {
    tag: 'doctype',
    tagType: 0,
    props: [
      {
        prop: 'html',
        value: null,
        proptype: 1
      }
    ]
  },
  {
    tag: 'html',
    tagType: 1,
    props: [
      {
        prop: 'lang',
        value: 'en',
        proptype: 0
      }
    ],
    nodes: [
      {
        tag: 'head',
        tagType: 1,
        props: [],
        nodes: [
          {
            tag: 'meta',
            tagType: 2,
            props: [
              {
                prop: 'charset',
                value: 'utf-8',
                proptype: 0
              }
            ],
            nodes: []
          },
          {
            tag: 'script',
            tagType: 1,
            props: [
              {
                prop: 'type',
                value: 'text/javascript',
                proptype: 0
              },
              {
                prop: 'src',
                value: '',
                proptype: 0
              }
            ],
            nodes: []
          }
        ]
      },
      {
        tag: 'body',
        tagType: 1,
        props: [
          {
            prop: null,
            value: 'app-body',
            proptype: 2
          }
        ],
        nodes: [
          {
            tag: 'div',
            tagType: 1,
            props: [
              {
                prop: 'class',
                value: 'container main-page',
                proptype: 0
              },
              {
                prop: 'id',
                value: 'main-page',
                proptype: 0
              }
            ],
            nodes: [
              {
                tag: 'span',
                tagType: 1,
                props: [],
                nodes: [
                  {
                    tag: 'hello',
                    tagType: 3,
                    props: [],
                    nodes: []
                  }
                ]
              }
            ]
          },
          {
            tag: 'input',
            tagType: 2,
            props: [
              {
                prop: 'type',
                value: 'text',
                proptype: 0
              },
              {
                prop: 'class',
                value: 'input',
                proptype: 0
              }
            ],
            nodes: []
          },
          {
            tag: 'div',
            tagType: 2,
            props: [],
            nodes: []
          }
        ]
      }
    ]
  }
]

let proccessJson = {
  doc: `html string`,
  nodes: []
}
