const tagTypes = {
  typeA: 0, // <!doctype blabla "bla">
  typeB: 1, // <tag blabbla="bla" blaba ></tag>
  typeC: 2 // <tag blabbla="bla" blaba />
}

const displayType = {
  inlined: 0, // <tag /> || <!tag>
  block: 1 // <tag></tag>
}

const propType = {
  hasValue: ''
}

let doc = [
  {
    tag: 'tagname',
    type: 'block'
    props: {
      
    }
  }
]
