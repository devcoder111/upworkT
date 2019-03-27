<!-- This page is for Lottery -->
<template>
    <div class="lottery-browser game-browser">
        <div class="container">
            <div class="row">
                <div class="grid_12">
                    <h2>Lottery Games</h2>
                    <div class="row gm-choices">
                                <div v-bind:lottery="lottery" v-for="lottery in lotteries" @click="showModal('game-lottery-'+lottery.def_id)" class="picks grid_3">
                                    <div v-if="isGame(lottery, '5:55')">
                                        <div class="game-choice">
                                            <div class="game-choice-info">
                                                <img src='../assets/quinto-images/graphics-1/lotto-555.png'>
                                                <!--<p>5:55 Lottery</p>-->
                                            </div>
                                        </div>
                                    </div>
                                    <div v-else-if="isGame(lottery, 'Faucet')">
                                        <div class="game-choice">
                                            <div class="game-choice-info">
                                                <img src='../assets/quinto-images/graphics-1/lotto-faucet.png'>
                                                <!--<p>Faucet Lottery</p>-->
                                            </div>
                                        </div>
                                    </div>
                                    <div v-if="isGame(lottery, 'Lottery')">
                                        <div class="game-choice">
                                            <div class="game-choice-info">
                                                <img src='../assets/quinto-images/graphics-1/lottery-main.png'>
                                                <!--<p>Lottery</p>-->
                                            </div>
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
            lotteries: function(){
                return this.$store.getters['lottery/getLotteries'];  
            }
        },
        methods: {
            isGame: function(lottery, game){
                if(lottery.game_name)
                return lottery.game_name.indexOf(game) != -1
            },
            showModal: function(view){
                this.$store.state.home.modalView = view;
                this.$modal.show('my-mainmodal');
            },
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>




</style>
