<template>
    <modal class="main-login" name="my-loginmodal" :adaptive="true" width="40%" height="auto" :scrollable="true">

        <div v-if="signUpOrLogin == 'signup'" id="sign-up-form-wrap" class="user-form-wrap">
            <h3>Sign Up</h3>
            <p class="rewards-info">Please <span class="warn">DO NOT</span> sign-up more than once. Multiple sign-ups will result in the forfeiture for all accounts. A valid E-mail address is required to participate in our rewards program. An E-mail validation PIN will be sent, if an E-mail is supplied.</p>
            <form class="signup-form" v-on:submit="doSignup();">
                <div>
                    <label for="name">User name:</label>
                    <input v-focus type="text" id="name" v-model="signupUsername">
                </div>
                <div>
                    <label for="password">Password:</label>
                    <input type="password" id="password" v-model="signupPassword">
                </div>
                <div>
                    <label for="password-confirm">Confirm Password:</label>
                    <input type="password" id="password-confirm" v-model="signupConfirm">
                </div>
                <div>
                    <label for="email">E-mail:</label>
                    <input type="email" id="email" v-model="signupEmail">
                </div>
                <button @click="doSignup()">Sign Up</button>
            </form>
            <div class="login-toggle"><p>Already a User?<br><span @click="signup2('login')">Log In</span></p></div>
        </div>

        <div v-else id="login-form-wrap" class="user-form-wrap">
            <h3>Login</h3>
            <form class="login-form" onsubmit="return false;">
                <div>
                    <label for="name-login">User name:</label>
                    <input v-focus type="text" id="name-login" v-model="loginUsername">
                </div>
                <div>
                    <label for="name">Password:</label>
                    <input type="password" id="password-login" v-model="loginPassword">
                </div>
                <div>
                    <label for="2facode">2FA Code:</label>
                    <input type="text" id="2facode" v-model="login2FA">
                </div>
                <button @click="doLogin()" class="primaryButton lightBackground">Log In</button>
            </form>
            <div class="login-toggle"><p>Don't have an account?<br><span @click="signup2('signup')">Sign Up</span></p></div>
        </div>
    </modal>
</template>

<script>
    export default {
        data: function() {
            return {
                signupPassword: '',
                signupUsername: '',
                signupConfirm: '',
                signupEmail: '',
                loginUsername: '',
                loginPassword: '',
                login2FA: '',
            }
        },
        name: 'modal-login-container',
        computed: {
            modalView: function () {
                return this.$store.state.home.modalView;
            },
            signUpOrLogin: function () {
                return this.$store.state.login.signUpOrLogin;
//                return "signUp";
            },
            user_name: function(){
                return this.$store.state.account ? 'Welcome '+this.$store.state.account.client[0].user_name : '';
                //this.$store.getters['login/UserName'];
            }
        },
        watch: {
            //Here we want to make the user go to Deposit after signing up or:
            user_name: function(){
                if(this.signUpOrLogin == 'signup'){
                    this.$store.state.home.modalView = 'cashier-deposit';
                } else if(!this.$store.state.home.modalView){
                    //TODO: load up last modalView
                    this.$store.state.home.modalView = 'cashier-deposit';
                }
                this.$modal.show('my-mainmodal');
                this.$modal.hide('my-loginmodal');
            }
        },
        methods: {
            doSignup: function(){
                if(!this.signupUsername) {
                    alert('Please enter a username.');
                } else if(!this.signupPassword) {
                    alert('Please enter a password.');
                } else if(!this.signupConfirm) {
                    alert('Please confirm your password.');
                } else if(this.signupPassword != this.signupConfirm){
                    alert('Your passwords do not match.')
                } else {
                    this.$store.dispatch('signup', {name: this.signupUsername, password: this.signupPassword, email: this.signupEmail});
                }
                return false;
            },
            doLogin: function(){
                if(!this.loginUsername) {
                    alert('Please enter a username.');
                } else if(!this.loginPassword) {
                    alert('Please enter a password.');
                } else {
                    this.$store.state.runtime.username = this.loginUsername;
                    this.$store.state.runtime.password = this.loginPassword;
                    this.$store.state.runtime.code = this.login2FA;
                    this.$store.dispatch('login')
                }
                return false;
            },
            showModal: function(view){
                this.$store.state.home.modalView = view;
                this.$modal.hide('my-loginmodal');
                this.$modal.show('my-loginmodal');
            },
            signup2: function(view) {
                console.log("view: " + view);
                this.$store.state.login.signUpOrLogin = view;
                this.$modal.show('my-loginmodal');
            }
        }
    }
</script>

<style scoped>

</style>
