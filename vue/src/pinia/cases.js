import { defineStore } from 'pinia'
import axios from 'axios'
import global from '@/global'

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useStore = defineStore('cases', {

    state: () => {
        return {
            cases: []            
        }
    },
    
    getters: {
        getCase: (state) => 
            (id) => {
                for (const c of state.cases) 
                    if (c.id === id) return c
                return undefined
            }   
    },

    actions: {
        setCases(newCases) {  
            this.cases = newCases
            this._subscriber.filter(({ event }) => event === 'cases').forEach(({ cb }) => cb())
        },
      
        async resetCases() {
            try {
                const r = await axios.get(global.$api_domain + '/api/cases')
                const { result } = r.data
                this.setCases(result)
            }
            catch (e) {
                console.log(e)
                this.setCases([])
            }    
        }
    }
})