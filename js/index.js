import { map, flip, apply } from 'ramda'
import flyd, { stream } from 'flyd'
const patch = require('snabbdom').init([
  require('snabbdom/modules/class'),
  require('snabbdom/modules/props'),
  require('snabbdom/modules/eventlisteners'),
  require('snabbdom/modules/style'),
])

import { init, view } from 'app'
import { Action, actions } from 'actions'


const update =
( model, action ) => Action.case( map( flip(apply)([ model, action ]), actions ), action )

setInterval( () => action$( Action.UpdateTime() ), 1000 )

// Streams
const action$ = stream() // All modifications to the state originate here
const model$ = flyd.scan( update, init(), action$ ) // Contains the entire state of the application
const vnode$ = flyd.map( view( action$ ), model$ ) // Stream of virtual nodes to render

// flyd.map( console.log.bind(console), model$ )  // Uncomment to log state on every update

// setInterval( () => action$( Action.UpdateTime() ), 1000 )
flyd.scan( patch, document.body, vnode$ )


