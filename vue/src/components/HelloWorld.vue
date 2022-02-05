<template>
  <div class="hello">
    <h1>Set-memory application</h1>
    <h3>Add case</h3>
    <div class="create-case-form">
      <form action="javascript:void(0)">
        <div class="case-create-name">
          <h5>Case name</h5> <input type="text" name="name" id="name"/>
        </div>
        <hr/>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
h5 {
  margin: 0.8rem auto;
}
hr {
  border: none;
  border-top: 1px solid #444;
  margin: 0.9rem 5%;
}
input {
  margin: 0;
  padding: 0.2rem;
  border-radius: 0.4rem;
  border-width: 0.01rem;
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

div.create-case-form {
  padding-top: 0.1rem;
  padding-bottom: 0.2rem;
  margin: 0.7rem auto 0 auto;
  max-width: 400px;
  width: 90%;
  background-color: #f00;
}

div.case-create-name * {
}
</style>
