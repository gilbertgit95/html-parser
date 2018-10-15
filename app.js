const Parser = require('./html-parser')

console.log('app has started...')

// sample html string for development purpose
let htmlText = `
  shit
  <!doctype html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <script type="text/javascript" src="" >
      </script>
    </head>

    <body "app-body">
      <!doctype html>
      <!-- the first child of the body -->
      <div class="container main-page" id="main-page">
        <span>hello</span>
      </div>

      <!-- the second child of the body -->
      <input type="text" class="input" />

      <!-- the third child of the body -->
      <div>
        <label class="label">
          <span>checkbox name</span>
          <input type="checkbox" checked />
        </label>
        <div class="sub-container">
          <div class="block-diplay item">
            <div class="item-content" flex>
              hello there
            </div>
            <span class="item-content" flex>
              hows life?
            </span>
          </div>
          <div class="block-diplay item">
          </div>
        </div>
      </div>

    </body>
  </html>
`

// initialize the library
let parser = new Parser()

// converted html string to json
let jsonHtml = parser.toJson(htmlText)
console.log('converted html: ', JSON.stringify(jsonHtml))

// let nodes = [
//   {
//     name: 'br1-lvl1',
//     nodes: [
//       {
//         name: 'br11-lvl2',
//         nodes: []
//       },
//       {
//         name: 'br12-lvl2',
//         nodes: []
//       }
//     ]
//   },
//   {
//     name: 'br2-lvl1',
//     nodes: [
//       {
//         name: 'br21-lvl2',
//         nodes: [
//           {
//             name: 'br21-lvl3',
//             nodes: []
//           },
//           {
//             name: 'br22-lvl3',
//             nodes: []
//           }
//         ]
//       },
//       {
//         name: 'br22-lvl2',
//         nodes: []
//       }
//     ]
//   }
// ]
//
// let level = 1
// let maxDeep = 3
//
// // inititaite temporary nodes
// let tempNodes = nodes
//
// // loop until the desired deep
// while (level < maxDeep) {
//   let tempCopy = []
//   for (let i = 0; i < tempNodes.length; i++) {
//     tempCopy = tempCopy.concat(tempNodes[i].nodes)
//     console.log('node loop')
//   }
//   tempNodes = tempCopy
//   level++
//   console.log('deep loop')
// }
//
// // overwrite some props and add propertiers
// tempNodes.forEach(node => {
//   node.unparsed = 'shit string'
// })
//
// console.log('nodes: ', JSON.stringify(nodes))
