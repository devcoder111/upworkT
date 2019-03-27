<template>
    <header id="header">
        <div id="stuck_container">
            <nav>
                <div class="container">
                    <div class="row">
                        <div v-if="$store.state.runtime.logged_in">
                            <div class="grid_12">
                                <ul class="sf-menu">
                                    <li><span><router-link to="/">Home</router-link></span></li>
                                    <li @click="$modal.show('my-mainmodal')"><span>My Account</span></li>
                                    <li @click="$modal.show('my-mainmodal')"><span>Games</span></li>
                                </ul>
                            </div>
                        </div>

                        <div v-else>
                            <ul class="sf-menu">
                                <li><span><router-link to="/">Home</router-link></span></li>

                            </ul>
                            <div class="topLoginMenu">
                                <button class="btn btn-success primaryButton" @click="signup2('login')">Login</button>
                                <button class="btn btn-success primaryButton" @click="signup2('signup')">Sign Up</button>
                            </div>
                            <div class="user-input">
                              <button class="btn btn-success" @click="signup">sign-up</button>
                              <button class="btn btn-success" @click="login">login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    </header>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    export default {
        name: 'header',
        created: function () {
          this.$store.state.runtime.code = ''
        },
        computed: mapGetters({}),
        methods:{
          login:function () {
            this.$store.dispatch('dialog_login')
          },
          signup:function () {
            this.$store.dispatch('dialog_signup')
          },
          signup2: function(view) {
              console.log("view: " + view);
              this.$store.state.login.signUpOrLogin = view;
              this.$modal.show('my-loginmodal');
          }
        }
    }
</script>
