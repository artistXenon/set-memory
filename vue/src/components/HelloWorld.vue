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
          <input type="text" name="name" id="name" v-model="name"/>
        </div>
        <hr/>
        <div class="case-create-desc">
          <label for="desc">
            <h5>Case description</h5>
          </label> 
          <textarea id="desc" name="desc" maxlength="500" rows="4" v-model="desc"/>
        </div>
        <hr/>
          <h5>Component sets</h5> 
        <ul class="case-create-sets">
          <li>
            <div class="case-create-set case-create-button" @click="addSet">
              +
            </div>
          </li>   
          <li v-for="(item, index) in sets" v-bind:key="index">
            {{index}}
              <input type="text" id="set_item" v-model="sets[index].name"/>
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
          <li v-for="(item, index) in tests" v-bind:key="index" class="case-test-item">
              <input type="number" class="test-component" id="test_from" v-model="tests[index][0]"/>
              ➡️
              <input type="number" class="test-component" id="test_to" v-model="tests[index][1]"/>
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
  name: 'HelloWorld',
  data() {
    return {
      name: '',
      desc: '',
      tests: [],
      sets: [],
      error: ''
    }
  },
  mounted() {
  },
  methods: {
    addSet: function() {
      this.sets.push({ name: `set_${this.sets.length + 1}` })
    },
    removeSet: function(index) {
      this.sets.splice(index, 1)
    },
    addTest: function() {
      this.tests.push([0, 0])
    },
    removeTest: function(index) {
      this.tests.splice(index, 1)
    },
    formCheck: function() {
      this.error = ''
      if (!this.name) return 'Please type case name'
      if (!this.sets || this.sets.length < 2) return 'Please add 2 or more sets'
      if (!this.tests || this.tests.length === 0) return 'Please add a test'
      for (let i in this.tests) {
        if (this.tests[i][0] >= this.sets.length || this.tests[i][1] >= this.sets.length) return 'There are non existing set included: test index ' + i
        if (this.tests[i][0] === this.tests[i][1]) return 'Tests can not be made to identical fields: test ' + i
        for (let j = i + 1; j < this.tests.length; j++) {
          if (
            this.tests[i][0] === this.tests[j][0] && 
            this.tests[i][1] === this.tests[j][1]) {
              return `Identical tests are found: test ${i}, ${j}`
          }         
        }
      }
    },
    postCase: async function() {
      this.error = this.formCheck()
      if (this.error) return

      try {
        const r = await axios.post(
          this.$api_domain + '/api/cases', 
          {
            name: this.name,
            desc: this.desc,
            sets: this.sets,
            tests: this.tests
          }
        )
        console.log(r)
        this.$router.push('/')
        this.reset()
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

div.case-create-name * {
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
