import Type from 'union-type'
import { lensPath, lensProp, over, inc, map } from 'ramda'

const Action = Type({ UpdateTime: [] })


const timestamp = lensPath([ 'time', 'timestamp' ])
const items = lensProp( 'items' )

const UpdateTime = model => () => over( items, map( over( timestamp, inc )), model )
// const UpdateTime = model => () => (
// { ...model
// ,	items: model.items.map( x => (
// 	{ ...x
// 	, time: {
// 			timestamp: x.time.timestamp + 1
// 		}
// 	}))
// })


const actions = { UpdateTime }
export { actions, Action }