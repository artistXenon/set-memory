<template>
  <div class="test">
      <!--test w/ config for test size & test form-->
    <h3>Test</h3>
    <ul>
      
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Tests',
  data() {
    return {
      tests: [],
      testNow: -1
    }
  },
  mounted() {

  },
  watch: {
    $route(to, from) {
      this.onLoad()
    }
  },
  methods: {
    onLoad: async function() {},
    updateResult: async function() {}
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
