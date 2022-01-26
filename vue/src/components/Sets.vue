<template>
  <div class="sets">
    
    <!--show full set by pagination + interface to edit sets--> 
    
    <h3>Sets</h3>
    <div class="test-var">
      {{tests}}
      <ul>
        <li v-for="(item, index) in tests">
        <!--{{sets[item[0]] + ' => ' + sets[item[1]]}}-->
        {{item}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sets',
  data() {
    return {
      sets: [],
      tests: []
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
    onLoad: function() {
      this.caseId = Number(this.$route.params.caseId)
      const c = this.$store.getCase(this.caseId)
      if (c) {
        this.tests = JSON.parse(c.test_json)
        this.sets = JSON.parse(c.set_json)
        console.log(this.tests)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
