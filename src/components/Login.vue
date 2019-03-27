<!--not used-->
<template>
  <div class="login">
    <h1>{{ message }} : {{ user_name }}</h1>
    username <input @input="set_user($event.target.value)" ><br>
    password <input type="password" @input="set_pass($event.target.value)" ><br>
    <button class="btn btn-success">submit</button>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'login',
    computed: mapGetters({
      message: 'login/LoginMessage',
      user_name: 'login/UserName'
    }),
    methods: mapActions({
      set_user: 'login/SetUser',
      set_pass: 'login/SetPass'
    })
  }

</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
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
