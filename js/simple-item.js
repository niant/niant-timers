import h from 'snabbdom/h'
import { curry } from 'ramda'

import Time from 'time'

const init = () => ({
  name: 'Detailed time'
, time: Time.init()
})

const view = curry(( action$, model ) =>
  h('div', [
    h('div', model.name),
    h('div', [
      h('div', 'Something here'),
      h('div', 'Also here'),
      h('ul', [
        h('li', model.name),
        h('li', [ Time.view( action$, model.time )])
      ])
    ])
  ])
)

export default { init, view }