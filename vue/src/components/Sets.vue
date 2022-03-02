<template>
  <div class="sets">
    
    <!--show full set by pagination + interface to edit sets--> 
  
    <h2>Sets</h2>
    <div class="set-var">
        <table>
          <thead>
            <tr>
              <th v-for="(item, index) in setsDesc" v-bind:key="index">
                {{item.name}}
              </th>
              <th>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td v-for="(_, index) in setsDesc" v-bind:key="index">
                <input type="text" v-model="newSet[index]">
              </td>
              <td>
                <button @click="addSet" class="set-add">
                  add
                </button>
              </td>
            </tr>
            <tr v-for="(item, index) in sets" v-bind:key="index">
              <td v-for="(it, id) in item.elements" v-bind:key="id">
                {{it ? it : ""}}
                <!--background color will vary depending on previous test result by class condition.-->
              </td>
              <td>
                <button @click="deleteSet(item.set_id)" class="set-delete">
                  delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Sets',
  data() {
    return {
      sets: [],
      setsDesc: [],
      newSet: []
    }
  },
  mounted() {
    this.$store.setListener('cases', this.onLoad.bind(this))
    this.onLoad()
  },
  watch: {
    $route(to, from) {
      this.onLoad()
    }
  },
  methods: {
    onLoad: async function() {
      const caseId = Number(this.$route.params.caseId)
      const c = this.$store.getCase(caseId)
      if (c) {
        this.setsDesc = JSON.parse(c.set_json)
        try {
          const r = await axios.get(this.$api_domain + `/api/cases/${caseId}/sets`)
          const { result } = r.data
          this.sets = result
          this.newSet = new Array(this.setsDesc.length).fill('')
        }
        catch (e) {
          console.log(e)
        }    
      }
    },
    addSet: async function() {
      const caseId = Number(this.$route.params.caseId)
      try {
        await axios.post(
          `${this.$api_domain}/api/cases/${caseId}/sets`, 
          { elements: this.newSet })
        this.newSet = new Array(this.setsDesc.length).fill('')
      }
      catch(e) {
        console.log(e) // show error above table
      }
      finally {
        this.onLoad()
      }
    },
    deleteSet: async function(setId) {
      const caseId = Number(this.$route.params.caseId)
      try {
        await axios.delete(`${this.$api_domain}/api/cases/${caseId}/sets/${setId}`)
      }
      catch(e) {
        console.log(e) // show error above table
      }
      finally {
        this.onLoad()
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h2 {
  margin: 40px 0 0;
}
table {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}
a {
  color: #42b983;
}


  button {
    margin: 0.9rem;
    font-weight: bold;
    color: white;
  }
  
  .set-add {
    background-color: seagreen;      
  }
  .set-delete {
    background-color: crimson;
  }
</style>
