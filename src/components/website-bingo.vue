<!-- This page is for Bingo -->
<template>
    <div class="bingo-browser game-browser">
        <div class="container">
            <div class="row">
                <div class="grid_12">
                    <h2>Bingo Games</h2>
                    <div class="row gm-choices">
                        <div @click="showModal('game-bingo')" class="picks grid_3">
                    <div class="game-choice">
                        <div class="game-choice-info"><img
                                src='../assets/quinto-images/graphics-1/bingo-main.png'></div>
                        <div class="game-choice-overlay"></div>
                    </div>
                </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
   <!-- <div class="col grid_8">
    <div class="gm-landing-page-info-wrap">
    <h1 class="gm-landing-info-title">Three Up Bingo Rules</h1>
    <div class="gm-info-general">
    <p>Three Up Bingo is a fast-paced poker style bing. Players receive three poker chips above each bingo card. The first player to cover one of their bingo cards with their chips wins the game.</p>
    <p>The major difference in Three Up Bingo is the payout. The total payout will be determined by the number of chips not on a bingo card. Every time someone covers a number on their card, the payout amount drops by that chip amount. The faster you bingo the more you win.</p>
    <p>Three Up Bingo is speed driven, with a number being called every few seconds. A new game starts every two minutes or about one minute after previous game finishes. </p>
    <p>Buy-in amount reflects the chip unit used to cover your card, plus the fee used for the Jackpot Pools, Bonus Ball, adn house's take. Player may purchase up to 9 bingo cards.</p>
    <p><span class="caps">Note:</span>Three Up Bingo is "Provablly Fair" game. Game seed is generated at the opening of the game adn encrypted as SHA-256 Hash. The actual game seed will be revealed upon start of the game.</p>
    </div>
    </div>
    </div>
    <div class="grid_4">
    <div class="gm-landing-page-info-wrap right-column">
    <div class="gm-img-btn">
    <div class="playnow"><h2 @click="showModal">Play Now!</h2></div>
    <span @click="showModal"><img src='../assets/quinto-images/graphics-1/555.png'></span>
    </div>
    </div>
    </div>-->
</template>

<script>
    export default {
        methods: {
            showModal: function(){
                //this.$store.commit('home/changeModalView', 'lottery');
                this.$store.state.home.modalView = 'game-bingo';
                this.$modal.show('my-mainmodal');
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /*.playnow h2{*/
      /*color: #fff;*/
      /*margin-top: 20px;*/
      /*cursor: pointer;*/
      /*border: 2px solid #fff;*/
      /*padding: 5px 8px;*/
      /*font-size: 16px;*/
  /*}*/
  /*.playnow h2:hover{*/
      /*opacity: .5;*/
  /*}*/
</style>
