<template>
  <div class="home">
    <CreateCase/>
  </div>
</template>

<script>
// @ is an alias to /src
import CreateCase from '@/components/CreateCase.vue'

export default {
  name: 'Home',
  components: {
    CreateCase
  }
}
</script>
