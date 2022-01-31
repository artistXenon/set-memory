<template>
  <div class="sets">
    
    <!--show full set by pagination + interface to edit sets--> 
  
    <h2>Sets</h2>
    <div class="set-var">
      <ul>
        <li v-for="(item, index) in sets">
        {{item.elements}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Sets',
  data() {
    return {
      sets: []
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
