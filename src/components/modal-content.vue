<template>
    <div class="modal-all-content-wrapper">
        <game-lottery v-if="modalView == 'game-lottery'"></game-lottery>
        <game-bingo v-else-if="modalView == 'game-bingo'"></game-bingo>
        <game-scratchers v-else-if="modalView == 'game-scratchers'"></game-scratchers>
        <game-poker-jb v-else-if="modalView == 'game-pokerjb'"></game-poker-jb>
        <game-poker-nb v-else-if="modalView == 'game-pokernb'"></game-poker-nb>
        <game-poker-db v-else-if="modalView == 'game-pokerdb'"></game-poker-db>
        <game-poker-bd v-else-if="modalView == 'game-pokerbd'"></game-poker-bd>
        <game-poker-tdb v-else-if="modalView == 'game-pokertdb'"></game-poker-tdb>

        <account-btc-emergency-address v-else-if="modalView == 'account-btc-emergency-address'"></account-btc-emergency-address>
        <account-email v-else-if="modalView == 'account-email'"></account-email>
        <account-password v-else-if="modalView == 'account-password'"></account-password>
        <account-provably-fair v-else-if="modalView == 'account-provably-fair'"></account-provably-fair>
        <account-two-factor-authentication v-else-if="modalView == 'account-two-factor-authentication'"></account-two-factor-authentication>
        
        <cashier-deposit v-else-if="modalView == 'cashier-deposit'"></cashier-deposit>
        <cashier-history v-else-if="modalView == 'cashier-history'"></cashier-history>
        <cashier-transfer v-else-if="modalView == 'cashier-transfer'"></cashier-transfer>
        <cashier-withdraw v-else-if="modalView == 'cashier-withdraw'"></cashier-withdraw>
        

        <gamelottoresults v-else-if="modalView == 'gamelottoresults'" v-bind:lottery="lottery"></gamelottoresults>
        <myoverviewmodal v-else></myoverviewmodal>
    </div>
</template>

<script>
    export default {
        computed: {
            modalView: function () {
                return this.$store.state.home.modalView;
            },
            lotteries: function() {
                return this.$store.getters['lottery/getLotteries'];
            }
        }
    }
</script>