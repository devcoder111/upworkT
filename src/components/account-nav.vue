<template>
    <div class="account-nav">
        <div class="account-nav-inner">
            <ul>
                <li @click="showModal('cashier-deposit', $event)">Deposit</li>
                <li @click="showModal('cashier-withdraw', $event)">Withdraw</li>
                <li @click="showModal('cashier-transfer', $event)">Transfer</li>
                <li @click="showModal('cashier-history', $event)">Transaction History</li>
            </ul>
            <ul>
                <li @click="showModal('account-two-factor-authentication', $event)">Two-Factor Authentication</li>
                <li @click="showModal('account-password', $event)">Change Password</li>
                <li @click="showModal('account-email', $event)">Opt-Out / Change Email</li>
                <li @click="showModal('account-btc-emergency-address', $event)">BTC Emergency Address</li>
                <li @click="showModal('account-provably-fair', $event)">Provably Fair</li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            showModal: function (view) {
                //this.$store.commit('home/changeModalView', 'lottery');
                this.$store.state.home.modalView = view;
                this.$modal.show('my-mainmodal');
            },
        }
    }
</script>

<style>
    #account-content {
        float: left;
        width: calc(100% - 375px);
        background: rgba(0, 0, 0, 0.4);
        margin-top: 15px;
        margin-bottom: 15px;
        padding: 15px;
    }
    .account-nav ul {
        margin-bottom: 30px;
    }
    .account-nav {
        float: left;
        margin-top: 15px;
        margin-left: 15px;
        margin-right: 15px;
        background: rgba(0, 0, 0, 0.4);
        width: 300px;
    }
    .account-nav-inner{
        padding: 15px;
    }

    .account-nav li {
      display: block;
        padding: 2px;
    }
    .account-nav li:hover {
        background: darkgrey;
        cursor: pointer;
    }
</style>