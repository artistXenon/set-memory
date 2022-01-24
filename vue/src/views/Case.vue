<template>
  <div class="cases">
    {{caseDetail}}

    <!--title. show details of case. w/ desc etc-->
    <!--sub route. w/ components following-->
      <!--show full set by pagination + interface to edit sets--> 
      <!--test w/ config for test size & test form-->
  </div>
</template>

<script>

export default {
  name: 'Case',
  components: {},
  data() {
    return {
      caseId: -1,
      caseDetail: undefined
    }
  },
  mounted() {
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
      const cases = this.$state.cases
      for (const c of cases) 
        if (c.id === this.caseId) 
          return this.caseDetail = c
      console.log('err no case found ??')      
    }
  }
}
</script>
