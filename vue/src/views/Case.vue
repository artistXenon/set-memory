<template>
  <div class="cases">
    <!--title. show details of case. w/ desc etc-->
    <div class="case-title">
      <div class="case-title-name">
        <h1>{{caseName}}</h1>
      </div>
      <div class="case-title-body">
        <p>
          {{caseDesc}}
        </p>
      </div>
    </div>
    <router-view></router-view>
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
      caseName: undefined,
      caseDesc: undefined,
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
      }
      else console.log('err no case found ??')      
    }
  }
}
</script>
