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
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in sets" v-bind:key="index">
              <td v-for="(it, id) in item.elements" v-bind:key="id">
                {{it ? it : ""}}
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
      setsDesc: []
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
        }
        catch (e) {
          console.log(e)
        }    
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
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
