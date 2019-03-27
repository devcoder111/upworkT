<template>
<div class="modal-site-info">
    <!--<div class="site-info">-->
        <!--<div>modalView: {{ modalView }}</div>-->
        <!--<div class="site-name">site name: {{ $store.state.site.name }}</div>-->
        <!--<div class="site-players">players: {{ $store.state.site.players }}</div>-->
    <!--</div>-->
    <div class="user-name-display"><h4>{{ user_name }}</h4></div>
    <div class="user-balance-display" v-if="$store.state.runtime.logged_in">
        <div>{{ account_balance }}</div>
        <button class="btn btn-success" @click="logout()">Log Out</button>
    </div>
    <div class="user-wrap" v-else>
        <button class="btn btn-success" @click="signup">sign-up</button>
        <button class="btn btn-success" @click="login">login</button>
    </div>
    <div style="clear: both;"></div>
</div>


</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    export default {
        computed: {
            modalView: function(){
                return this.$store.state.home.modalView;
            },
            account_balance: function(){
                return this.$store.state.account.client_balances ? 'Account Balance: '+this.$store.state.account.client_balances[0].balance_text : '';
                //return this.$store.getters['account/account_balance']
            },
            user_name: function(){
                return this.$store.state.account ? 'Welcome '+this.$store.state.account.client[0].user_name : '';
                //this.$store.getters['login/UserName'];
            }
        },
        methods: {
            logout: function(){
                this.$store.dispatch('logout');  
            },
            login: function () {
                this.$store.dispatch('dialog_login')
            },
            signup: function () {
                this.$store.dispatch('dialog_signup')
            }
        }
    }
</script>


<style scoped>

</style>
