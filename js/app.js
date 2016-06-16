
import { curry, compose, map, range } from 'ramda'
import h from 'snabbdom/h'

import SimpleItem from 'simple-item'
import { Action } from 'actions'


// Initialise state
const generateContent = compose( map( i => ({ ...SimpleItem.init(), id: i })), range( 0 ))

const init = () => ({
  items: generateContent( 50 )
})


// View
const view = curry(( action$, model ) =>
  h('div', [
    h('h2', 'Test nested views with async updates' ),
    h('div', model.items.map( SimpleItem.view( action$ )))
  ])
)


export { init, view }