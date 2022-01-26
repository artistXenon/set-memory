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

    getCase(id) {
      for (const c of this.state.cases) 
        if (c.id === id) return c
      return undefined
    },
  
    setCases(newCases) {  
      this.state.cases = newCases
      this._subscriber.filter(({ event }) => event === 'cases').forEach(({ cb }) => cb())
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