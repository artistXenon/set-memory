import { reactive } from 'vue'

const store = {
    _subscriber: [
      {
        event: 'undefined',
        cb: _ => {}
      }
    ],

    state: reactive({
      cases: []
    }),
  
    setCases(newCases) {  
      this.state.cases = newCases
      this._subscriber.filter(({ event }) => evemt === 'cases').forEach(({ cb }) => cb())
    },

    setListener(event, callback) {
      if (typeof event !== 'string' || typeof callback !== 'function') throw new Error('Illegal subscriber')
      this._subscriber.push({
        event,
        cb: callback
      })
    }
  }


export default store