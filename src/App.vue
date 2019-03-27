<template>
  <div id="app">
      <website-topmenu></website-topmenu>
      <cbm-header></cbm-header>
      <website-gamemenu></website-gamemenu>
      <!--<gmenu></gmenu>-->
      <div class="main-content-wrap">
            <router-view></router-view>
      </div>
      <cbm-footer></cbm-footer>
  </div>
</template>

<script>
export default {
  name: 'app',
    mounted: function(){
        for ( var i = 0, len = localStorage.length; i < len; ++i ) {
            var name = localStorage.key( i ).split('/');
            var section = name[0];
            var ident = name[1];
            this.$store.dispatch('account/write_local_param', {
                section: section,
                ident: ident,
                value: localStorage.getItem( localStorage.key( i ) )
            })
        }
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
}
</style>
