<!--not used-->
<template>
    <div class="home">
        <div class="homepagecontent-wrapper game-browser">
            <div class="container">
                <div class="row">
                    <div class="grid_12">
                        <h2>All Games</h2>

                        <div class="row gm-choices">
                            <router-link :key="lottery.def_id" v-for="lottery in lotteries" :to="getRoute(lottery.tab_descr)">
                                <div class="lottery-row picks grid_3">
                                    <div class="game-choice">
                                      <div class="game-choice-info">
                                          <img v-if="isGame(lottery, 'Quinto')" src='../assets/quinto-images/graphics-1/lottery-main.png'>
                                          <img v-else-if="isGame(lottery, '5:55')" src='../assets/quinto-images/graphics-1/lotto-faucet.png'>
                                          <img v-else-if="isGame(lottery, 'Faucet')" src='../assets/quinto-images/graphics-1/lotto-555.png'>
                                      </div>
                                      <div class="game-choice-overlay"></div>
                                    </div>
                                </div>
                            </router-link>

                            <div @click="showModal('game-bingo')" class="picks grid_3">
                                <div class="game-choice">
                                    <div class="game-choice-info"><img
                                            src='../assets/quinto-images/graphics-1/bingo-main.png'></div>
                                    <div class="game-choice-overlay"></div>
                                </div>
                            </div>
                            <div @click="showScratcherModal('game-scratchers', 'CC')" class="picks grid_3">
                                <div class="game-choice">
                                    <div class="game-choice-info scratcher"><img
                                            src='../assets/quinto-images/scratcher_images/cc/CCbanner.png'></div>
                                    <div class="game-choice-overlay"></div>
                                </div>
                            </div>
                            <div @click="showScratcherModal('game-scratchers', 'AS')" class="picks grid_3">
                                <div class="game-choice">
                                    <div class="game-choice-info scratcher"><img
                                            src='../assets/quinto-images/scratcher_images/as/ASbanner.png'></div>
                                    <div class="game-choice-overlay"></div>
                                </div>
                            </div>
                            <div @click="showScratcherModal('game-scratchers', 'HR')" class="picks grid_3">
                                <div class="game-choice">
                                    <div class="game-choice-info scratcher"><img
                                            src='../assets/quinto-images/scratcher_images/hr/HRbanner.png'></div>
                                    <div class="game-choice-overlay"></div>
                                </div>
                            </div>
                            <div @click="showScratcherModal('game-scratchers', 'KB')" class="picks grid_3">
                                <div class="game-choice">
                                    <div class="game-choice-info scratcher"><img
                                            src='../assets/quinto-images/scratcher_images/kb/KBbanner.png'></div>
                                    <div class="game-choice-overlay"></div>
                                </div>
                            </div>
                            <div @click="showScratcherModal('game-scratchers', 'SC')" class="picks grid_3">
                                <div class="game-choice">
                                    <div class="game-choice-info scratcher"><img
                                            src='../assets/quinto-images/scratcher_images/sc/SCbanner.png'></div>
                                    <div class="game-choice-overlay"></div>
                                </div>
                            </div>
                            <div @click="showScratcherModal('game-scratchers', 'SM')" class="picks grid_3">
                                <div class="game-choice">
                                    <div class="game-choice-info scratcher"><img
                                            src='../assets/quinto-images/scratcher_images/sm/SMbanner.png'></div>
                                    <div class="game-choice-overlay"></div>
                                </div>
                            </div>
                            <div @click="showModal('game-pokerbd')" class="picks grid_3">
                                <div class="game-choice">
                                    <div class="game-choice-info">
                                        <img src='../assets/quinto-images/graphics-1/video-poker-main.png'>
                                        <p>Bonus Deluxe</p>
                                    </div>
                                    <div class="game-choice-overlay"></div>
                                </div>
                            </div>
                            <div @click="showModal('game-pokerdb')" class="picks grid_3">
                                <div class="game-choice">
                                    <div class="game-choice-info">
                                        <img src='../assets/quinto-images/graphics-1/video-poker-main.png'>
                                        <p>Double Bonus</p>
                                    </div>
                                    <div class="game-choice-overlay"></div>
                                </div>
                            </div>
                            <div @click="showModal('game-pokerjb')" class="picks grid_3">
                                <div class="game-choice">
                                    <div class="game-choice-info">
                                        <img src='../assets/quinto-images/graphics-1/video-poker-main.png'>
                                        <p>Jacks or Better</p>
                                    </div>
                                    <div class="game-choice-overlay"></div>
                                </div>
                            </div>
                            <div @click="showModal('game-pokernb')" class="picks grid_3">
                                <div class="game-choice">
                                    <div class="game-choice-info">
                                        <img src='../assets/quinto-images/graphics-1/video-poker-main.png'>
                                        <p>Nevada Bonus</p>
                                    </div>
                                    <div class="game-choice-overlay"></div>
                                </div>
                            </div>
                            <div @click="showModal('game-pokertdb')" class="picks grid_3">
                                <div class="game-choice">
                                    <div class="game-choice-info">
                                        <img src='../assets/quinto-images/graphics-1/video-poker-main.png'>
                                        <p>Triple Double Bonus</p>
                                    </div>
                                    <div class="game-choice-overlay"></div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        computed: {
            lotteries: function () {
                return this.$store.getters['lottery/getLotteries'];
            }
        },
        methods: {
            getRoute: function(tab_descr){
                return '/'+tab_descr.toLowerCase().replace(' ','-').replace(':','');  
            },
            isGame: function(lottery, game){
                if(lottery.game_name)
                return lottery.game_name.indexOf(game) != -1;
            },
            showModal: function (view) {
                this.$store.state.home.modalView = view;
                this.$modal.show('my-mainmodal');
            },
            showScratcherModal: function (view, scratcher_type) {
                this.$store.dispatch('account/write_local_param', {
                    section: 'scratchers',
                    ident: 'scratcher_type',
                    value: scratcher_type
                })
                this.$store.state.home.modalView = view;
                this.$modal.show('my-mainmodal');
            },

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    /*#app .homepagecontent-wrapper {*/
        /*padding-top: 40px;*/
        /*padding-bottom: 60px;*/
        /*text-align: left;*/
        /*!*background-color: #C3B091;*!*/
    /*}*/

    /*.grid_4 .game-card {*/
        /*max-width: 300px;*/
        /*margin: 20px auto;*/
        /*background-color: #FFFFFF;*/
    /*}*/

    /*.grid_6 .game-card .game-image {*/
        /*background-repeat: no-repeat;*/
        /*background-position: center center;*/
        /*-webkit-background-size: cover;*/
        /*background-size: cover;*/
        /*min-height: 221px;*/
    /*}*/

    /*.grid_6 .game-card .bingo {*/
        /*background-image: url('../assets/images/page3_img1.jpg');*/
    /*}*/

    /*.grid_6 .game-card .poker {*/
        /*background-image: url('../assets/images/chips.jpg');*/
    /*}*/

    /*.grid_6 .game-card .scratchers {*/
        /*background-image: url('../assets/images/page3_img3.jpg');*/
    /*}*/

    /*.grid_6 .game-card .lottery {*/
        /*background-image: url('../assets/images/page3_img6.jpg');*/
    /*}*/

    /*.image-overlay {*/
        /*background-color: rgba(0, 0, 0, 0.2);*/
        /*min-height: 221px;*/
        /*text-align: center;*/
    /*}*/

    /*.image-overlay img {*/
        /*padding-top: 20%;*/
    /*}*/

    /*.game-info {*/
        /*padding: 15px 5px 20px 10px;*/
    /*}*/

    /*.game-leadline {*/
        /*color: #000;*/
        /*text-transform: uppercase;*/
        /*margin-bottom: 10px;*/
    /*}*/

    /*.game-card:hover .image-overlay {*/
        /*background-color: rgba(0, 0, 0, 0.7);*/
    /*}*/

    /*.game-link {*/
        /*margin-top: 20px;*/
    /*}*/

    /*new style*/


</style>

