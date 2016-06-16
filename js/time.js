import h from 'snabbdom/h'
import { curry } from 'ramda'


const init = () => ({
  format: 'HH:MM:ss',
  interval: 1000,
  timestamp: Math.random() * 60 | 0
})

const log = a => { console.log(a); return a }

const view = curry(( action$, model ) => 
	h( 'div', model.timestamp )
)


export default { init, view }