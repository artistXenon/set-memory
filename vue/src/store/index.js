import { reactive } from 'vue'

const store = {
    state: reactive({
      cases: []
    }),
  
    setCases(newCases) {  
      this.state.cases = newCases
    }
  }


export default store