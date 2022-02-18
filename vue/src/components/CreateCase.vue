<template>
  <div class="hello">
    <h1>Set-memory application</h1>
    <h3>Add case</h3>
    <div class="create-case-form">
      <form action="javascript:void(0)">
        <div class="case-create-name">
          <div class="case-create-error" v-show="error">{{error}}</div>
          <label for="name">
            <h5>Case name</h5> 
          </label>
          <input type="text" name="name" id="name" v-model="data.name"/>
        </div>
        <hr/>
        <div class="case-create-desc">
          <label for="desc">
            <h5>Case description</h5>
          </label> 
          <textarea id="desc" name="desc" maxlength="500" rows="4" v-model="data.desc"/>
        </div>
        <hr/>
          <h5>Component sets</h5> 
        <ul class="case-create-sets">
          <li>
            <div class="case-create-set case-create-button" @click="addSet">
              +
            </div>
          </li>   
          <li v-for="(item, index) in data.sets" v-bind:key="index">
            {{index}}
              <input type="text" id="set_item" v-model="data.sets[index].name"/>
              <button @click="removeSet(index)">-</button>
          </li>       
        </ul>
        <hr/>
            <h5>Component tests</h5> 
        <ul class="case-create-tests">
          <li>
            <div class="case-create-test case-create-button" @click="addTest">
              +
            </div>
          </li>   
          <li v-for="(item, index) in data.tests" v-bind:key="index" class="case-test-item">
              <input type="number" class="test-component" id="test_from" v-model="data.tests[index][0]"/>
              ➡️
              <input type="number" class="test-component" id="test_to" v-model="data.tests[index][1]"/>
              <button @click="removeTest(index)">-</button>
          </li>       
        </ul>
        <hr/>
            <div class="case-create-submit case-create-button" @click="postCase">
              Submit
            </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'CreateCase',
  data() {
    return {
      data: {
        name: '',
        desc: '',
        tests: [],
        sets: []
      },
      error: ''
    }
  },
  mounted() {
  },
  methods: {
    addSet: function() {
      this.data.sets.push({ name: `set_${this.data.sets.length + 1}` })
    },
    removeSet: function(index) {
      this.data.sets.splice(index, 1)
    },
    addTest: function() {
      this.data.tests.push([0, 0])
    },
    removeTest: function(index) {
      this.data.tests.splice(index, 1)
    },
    formCheck: function() {
      this.error = ''
      const { name, sets, tests } = this.data
      if (!name) return 'Please type case name'
      if (!sets || sets.length < 2) return 'Please add 2 or more sets'
      if (!tests || tests.length === 0) return 'Please add a test'
      for (let i in tests) {
        if (
          tests[i][0] >= sets.length || tests[i][1] >= sets.length ||
          tests[i][0] < 0 || tests[i][1] < 0
        ) return 'There are non existing set included: test index ' + i
        if (tests[i][0] === tests[i][1]) return 'Tests can not be made to identical fields: test ' + i
        for (let j = i + 1; j < tests.length; j++) {
          if (
            tests[i][0] === tests[j][0] && 
            tests[i][1] === tests[j][1]) {
              return `Identical tests are found: test ${i}, ${j}`
          }         
        }
      }
    },
    postCase: async function() {
      this.error = this.formCheck()
      if (this.error) return

      try {
        const r = await axios.post(this.$api_domain + '/api/cases', this.data)
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
h5 {
  margin: 0.8rem 0 auto 0;
}
hr {
  margin:  0 0.9rem 0 0.9rem;
  border: none;
  border-top: 1px solid #444;
}
input, textarea {
  margin: 0.9rem 5%;
  padding: 0.2rem;
  border-radius: 0.4rem;
  border-width: 0.01rem;
}
textarea {
    resize: none;
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

.case-create-error {
  margin: 0.3rem;
  color: #f00;
}

div.create-case-form {
  padding-top: 0.1rem;
  padding-bottom: 0.2rem;
  margin: 0.7rem auto 0 auto;
  max-width: 400px;
  width: 90%;
  background-color: #ccc;
}
.test-component {
  width: 10%
}

.case-create-set, .case-create-test {
  margin: 0 auto 0 auto;
}

.case-create-submit {
  margin: 1rem auto 1rem auto;
  padding: 0.2rem;
}

.case-create-button{
  max-width: 12rem;
  border-radius: 0.4rem;
  border-width: 0.01rem;
  background-color: #999;

}
</style>
