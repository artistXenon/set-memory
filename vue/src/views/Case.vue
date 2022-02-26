<template>
  <div class="cases">
    <!--title. show details of case. w/ desc etc-->
    <div class="case-title">
      <div class="case-title-name">
        <h1>{{caseName}}</h1>
        <button @click="removeCase">delete</button>
      </div>
      <div class="case-title-body">
        <p>
          {{caseDesc}}
        </p>
      </div>      
      <h2>Tests</h2>
      <div class="test-var">
        <ul>
          <li v-for="(item, index) in tests" v-bind:key="index">
          <router-link :to="`/cases/${caseId}/test/${index}`">
            {{setsDesc[item[0]].name + ' ➡️ ' + setsDesc[item[1]].name}}
          </router-link>
          </li>
        </ul>
      </div>
    </div>
    <router-view></router-view>
    <!--sub route. w/ components following-->
      <!--show full set by pagination + interface to edit sets--> 
      <!--test w/ config for test size & test form-->
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Case',
  components: {},
  data() {
    return {
      caseId: -1,
      caseName: undefined,
      caseDesc: undefined,
      tests: [],
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
    onLoad: function() {
      this.caseId = Number(this.$route.params.caseId)
      const c = this.$store.getCase(this.caseId)
      if (c) {
        this.caseName = c.name
        this.caseDesc = c.description
        this.setsDesc = JSON.parse(c.set_json)
        this.tests = JSON.parse(c.test_json)
      }  
    },
    removeCase: async function() {
      try {
        await axios.delete(this.$api_domain + `/api/cases/${this.caseId}`)
        this.$router.push('/')
        this.$store.resetCases()
      }
      catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped lang="scss">
h2 {
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

.case-title-name {
  * {
    display: inline-block;
  }

  button {
    margin: 0.9rem;
    background-color: crimson;
    font-weight: bold;
    color: white;
  }
  
}

a {
  text-decoration: none;
  margin-left: 0.3rem;
  margin-right: 0.3rem;
  font-weight: bold;
  color: #2c3e50;
  &.router-link-exact-active {
    color: #42b983;
  }
}
</style>