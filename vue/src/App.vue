<template>
  <div id="nav">
    <a class="do-reset" @click="reset">Home</a>    
    <router-link v-for="(item, index) in $state.cases" :to="'/cases/' + item.id">
      {{ item.name }}
    </router-link>
  </div>
  <router-view/>
</template>

<script>
import axios from 'axios'

export default {
  name: 'App',
  data() {
    return {}
  },
  async mounted() {
    this.reset()
  },
  methods: {
    reset: async function() {
      try {
        const r = await axios.get(this.$api_domain + '/api/cases')
        const { result } = r.data
        this.$store.setCases(result)
      }
      catch (e) {
        console.log(e)
        this.$store.setCases([])
      }    
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

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
}
</style>
