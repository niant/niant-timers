const snabbdom = require('snabbdom');
const h = require('snabbdom/h');
const patch = snabbdom.init([
  require('snabbdom/modules/class'),
  require('snabbdom/modules/props'),
  require('snabbdom/modules/style'),
  require('snabbdom/modules/eventlisteners')
]);
const dateFormat = require('dateformat')
const thunk = require('snabbdom/thunk')
import { compose, map, range } from 'ramda'


const UPDATE_TIME = 'UPDATE_TIME'

const generateContent = compose( map( i => ({ ...SimpleItem.init(), id: i })), range( 0 ))

setInterval(() => {}, 1000 )



var App = {}

App.init = () => ({
  items: generateContent(50)
})

App.view = (state, update) =>
  h('div', [
    h('h2', 'Test nested views with async updates' ),
    h('div', state.items.map( item => SimpleItem.view( item, update )))
  ])

App.update = (state, action) =>
  action.type === UPDATE_TIME
  ? { ...state
    , items: state.items.map( item =>
        item.id === action.id
        ? SimpleItem.update( item, action.data )
        : item
      )
    }
  : state






var SimpleItem = {};

SimpleItem.init = () => ({
  name: 'Detailed time'
, time: Time.init()
})

SimpleItem.view = (state, update) =>
  h('div', [
    h('div', state.name),
    h('div', [
      h('div', 'Something here'),
      h('div', 'Also here'),
      h('ul', [
        h('li', state.name),
        h('li', [ Time.view(state.time, action => update({ type: UPDATE_TIME, id: state.id, data: action })) ])
      ])
    ])
  ])


SimpleItem.update = (state, action) => 
  action.type === UPDATE_TIME
  ? { ...state, time: Time.update( state.time, action )}
  : state






var Time = {}

Time.init = () => ({
  format: 'HH:MM:ss',
  interval: 1000,
  timestamp: Date.now()
})

Time.view = (state, update) =>
  h('div', [
    h( 'div', state.timestamp )
  ])

Time.update = (state, action) =>
  action.type === UPDATE_TIME
  ? { ...state, timestamp: action.data.timestamp }
  : state






const main = ( initState, oldVnode, { view, update }) => {
  const newVnode = view(initState, event => {
    // console.log(initState)
    const newState = update(initState, event);
    main(newState, newVnode, {view, update});
  });
  patch(oldVnode, newVnode);
};

main(
  App.init(),
  document.body,
  { view: App.view, update: App.update }
)
