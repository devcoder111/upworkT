<!-- header for all pages -->
<template>

    <div class="page-banner">
        <pageheader></pageheader>
        <div class="clearfix"></div>

        <modal-container></modal-container>
        <modal-login></modal-login>
    </div>

</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    export default {
        name: 'cbm-header',
        computed: {
            jackpotName: function () {
                return this.$store.getters['jackpots/curName']
            },
            jackpotAmt: function () {
                return this.$store.getters['jackpots/curAmt']
            },
            siteName: function () {
                return this.$store.getters['site/getName']
            },
            sitePlayers: function () {
                return this.$store.getters['site/getPlayers']
            },
            userName: function () {
                return this.$store.getters['account/name']
            },
            modalView: function () {
                return this.$store.state.home.modalView;
            }
        },
        methods: mapActions([
            'login'
        ])
    }
</script>


<style scoped>
    .page-banner {
        /*background-image: url('../assets/quinto-images/QuintoBanner Images/BCpp1.png');*/
        /*background-size: cover;*/
        /*background-repeat: no-repeat;*/
        /*background-position: top right;*/

    }
</style>

