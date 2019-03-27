<template>
    <div class="lotto-modal-wrap inner-modal">
        <div v-if="!lottery" class="scratcher-type-picks">
            <div v-for="lotto in lotteries" @click="setLottery(lotto)" class="picks grid-one-third">
                <div class="game-choice">
                    <div class="game-choice info scratcher">
                        <img v-if="lotto.game_type == 'QUINTO'"src='../assets/quinto-images/graphics-1/mainMenuQuinto.png'>
                        <img v-if="lotto.game_type == 'LOTTO555'" src='../assets/quinto-images/graphics-1/lotto-555.png'>
                        <img v-if="lotto.game_type == 'FAUCET'" src='../assets/quinto-images/graphics-1/lotto-faucet.png'>
                    </div>
                    <div class="game-choice-overlay-modal"></div>
                </div>
            </div>
        </div>
        <div v-else="">
            <div class="game-title-row game-row">
                <div class="grid game-title-container">
                    <h3 class="modal-game-title" v-html="gameName()"></h3>
                </div>
                <div class="grid game-info-container">
                    <game-lottery-info v-on:update_game_nbr="getFirstResults()" v-on:game_nbr="seeActiveGame"
                                       v-bind:current_game_nbr="current_game_nbr"
                                       v-bind:lottery="lottery"></game-lottery-info>
                </div>
                <div class="clearfix"></div>
            </div>
            <div class="game-content-row game-row">
                <div v-if="lottery.game_nbr == current_game_nbr" class="lottery-game-display">
                    <div class="lottery-game-board left-side">
                        <div class="game-board">
                            <div class="lottery-cards" v-if="!is_555()">
                                <div class="lottery-row" v-for="suit in suits">
                                    <div v-for="card in cards" @click="choose_card(card+suit)" class="card"><img
                                            :src="flip_card('card'+card+suit)"></div>
                                </div>
                            </div>
                            <div v-else>
                                <div class="lottery-row" v-for="row in [0,1,2,3]">
                                    <div v-for="tile in [1,2,3,4,5,6,7,8,9,10,11]" @click="choose_card(row * 13 + tile)" class="card"><span class="lotto-555">{{ row * 11 + tile }}</span></div>
                                </div>
                            </div>
                        </div>
                        <div class="lotto-game-choices">
                            <div class="picks-wrapper grid">
                                <div class="picks-wrapper-inner">
                                    <div v-if="is_555()" class="lottery-row picks circleCards">
                                        <div class="large-card choice1 borderBlue">
                                            <div class="primaryNumber">11</div>
                                            <div class="secondaryNumber">22</div>
                                        </div>
                                        <div class="large-card choice2 borderRed">
                                            <div class="primaryNumber">53</div>
                                            <div class="secondaryNumber">41</div>
                                        </div>
                                        <div class="large-card choice3 borderGrey">
                                            <div class="primaryNumber">93</div>
                                            <div class="secondaryNumber">12</div>
                                        </div>
                                        <div class="large-card choice4 borderGreen">
                                            <div class="primaryNumber">81</div>
                                            <div class="secondaryNumber">23</div>
                                        </div>
                                        <div class="large-card choice5 borderYellow">
                                            <div class="primaryNumber">4</div>
                                            <div class="secondaryNumber">61</div>
                                        </div>
                                    </div>
                                    <div v-if="!is_555()" class="lottery-row picks ">
                                        <div @click="reset_single_choice('choice1')" class="large-card choice1"><img
                                                :src="require('../assets/quinto-images/cards/card'+choice1+'.jpg')"></div>
                                        <div @click="reset_single_choice('choice2')" class="large-card choice2"><img
                                                :src="require('../assets/quinto-images/cards/card'+choice2+'.jpg')"></div>
                                        <div @click="reset_single_choice('choice3')" class="large-card choice3"><img
                                                :src="require('../assets/quinto-images/cards/card'+choice3+'.jpg')"></div>
                                        <div @click="reset_single_choice('choice4')" class="large-card choice4"><img
                                                :src="require('../assets/quinto-images/cards/card'+choice4+'.jpg')"></div>
                                        <div @click="reset_single_choice('choice5')" class="large-card choice5"><img
                                                :src="require('../assets/quinto-images/cards/card'+choice5+'.jpg')"></div>
                                    </div>

                                    <div v-else="" class="lottery-row grid picks">
                                        <div>
                                            <div @click="reset_single_choice('choice1')" class="large-card choice1">{{ choice1
                                                }}
                                            </div>
                                            <div @click="reset_single_choice('choice2')" class="large-card choice2">{{ choice2
                                                }}
                                            </div>
                                            <div @click="reset_single_choice('choice3')" class="large-card choice3">{{ choice3
                                                }}
                                            </div>
                                            <div @click="reset_single_choice('choice4')" class="large-card choice4">{{ choice4
                                                }}
                                            </div>
                                            <div @click="reset_single_choice('choice5')" class="large-card choice5">{{ choice5
                                                }}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="pick-control-buttons">
                                        <div class="pickColumn1of3">
                                            <button class="btn-min clearpicks" @click="reset_choices()">Reset</button>
                                        </div>
                                        <div v-if="is_quinto()" class="pickColumn2of3">
                                            <button class="btn optionBtn" :disabled="!able_to_send_choices()" @click="box_pick()">Box
                                                Selection to Ticket
                                            </button>
                                        </div>
                                        <div class="pickColumn3of3">
                                            <button class="btn optionBtn secondaryButton" :disabled="!able_to_send_choices()" @click="add_pick()">Add to
                                                Ticket
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="lotto-pick-control-buttons">
                                <div class="lotto-quick-pick">
                                    <div class="titleBlock">
                                        <h3>Quick Picks</h3>
                                    </div>
                                    <div class="qp-btn-wrap">
                                        <div class="qp-btns">
                                            <button v-for="quickpick in quickpicks" @click="quick_pick(quickpick.amount)"
                                                    :class="'btn-min qp optionBtn qp-'+quickpick+' '+isQuickPickActive(quickpick.amount)" class="secondaryButton">
                                                {{ quickpick.label }}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
    
                    <game-lottery-pickspurchase v-bind:lottery="lottery"></game-lottery-pickspurchase>
                    <div class="clearfix"></div>
                </div>
                <div v-else="">
                    <game-lottery-results v-bind:current_game_nbr="current_game_nbr" v-on:game_nbr="setGameNumber"
                                          v-bind:lottery="lottery"></game-lottery-results>
                </div>
            </div>
            <button @click="showMenu()" class="secondaryButton">Switch Lottery Game</button>
        </div>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                current_game_nbr: null,
                lottery: null,
                suits: ['s', 'h', 'd', 'c'],
                cards: ['A', 2, 3, 4, 5, 6, 7, 8, 9, 'T', 'J', 'Q', 'K'],
                choice1: '',
                choice2: '',
                choice3: '',
                choice4: '',
                choice5: '',
                quickpicks: [],
                next_drawing: ''
            }
        },
        computed: {
            lotteries: function () {
                return this.$store.getters['lottery/getLotteries'];
            },
            picks_in_cart: function () {
                var cart = this.$store.getters['lottery/getCart'](this.lottery.def_id);
                if (cart.picks) {
                    return cart.picks.length;
                }
            }
        },
        watch: {
            lottery: function(){
                console.log(this.lottery);
                if(this.lottery) {
                    this.current_game_nbr = this.lottery.game_nbr;
                    this.quickpicks = [
                        {amount: 1, label: 1},
                        {amount: 5, label: 5},
                        {amount: 10, label: 10},
                        {amount: 50, label: 50},
                        {amount: 100, label: 100},
                        {amount: 1000, label: 1000},
                        {amount: this.lottery.max_picks, label: 'Max (' + this.lottery.max_picks + ')'}
                    ]
                }
            }
        },
        mounted: function () {
            this.get_next_drawing();
        },
        methods: {
            gameName: function(){
                if(this.is_quinto()){
                    return '<img style="height: 100px" src="'+require('../assets/quinto-images/graphics-1/QBTCw.png')+'">';
                } else {
                    return this.lottery.game_name;
                } 
            },
            showMenu: function () {
                this.lottery = null;  
            },
            setLottery: function(lotto){
                console.log(lotto);
                this.lottery = lotto;  
            },
            is_faucet: function(){
                return this.lottery.faucet;
            },
            is_555: function(){
                return this.lottery.game_type == 'LOTTO555';
            },
            is_quinto: function(){
                return this.lottery.game_type == 'QUINTO';
            },
            get_next_drawing: function () {
                var self = this;
                var trigger = self.next_drawing;
                //console.log('get_next_drawing')
                //this.next_drawing = this.$store.getters['datetimeIntoCountdown'](this.lottery.draw_timestamp);
                /*setInterval(function(){
                 self.get_next_drawing();
                 }, 100);*/
            },
            has_next_game: function () {
                return this.$store.getters['lottery/getGames'](this.lottery.def_id).length;
            },
            getFirstResults: function () {
                var previous_games = this.$store.getters['lottery/getGames'](this.lottery.def_id);
                if (previous_games.length) {
                    console.log(previous_games[0]);
                    this.current_game_nbr = previous_games[0].game_nbr;
                }
            },
            seeActiveGame: function (activeGame) {
                console.log('activeGame');
                this.current_game_nbr = activeGame;
            },
            setGameNumber: function (game_nbr) {
                this.current_game_nbr = game_nbr;
            },
            showModal: function (view) {
                console.log('view;' + view);
                this.$store.state.home.modalView = view;
                console.log('view2' + view);
                this.$modal.show('my-mainmodal');
            },
            isQuickPickActive: function (quickpick) {
                if (this.lottery.max_picks - this.picks_in_cart > quickpick) {
                    return 'active';
                }
            },
            flip_card: function (card) {
                console.log(this.choice1+' '+card);
                if ('card'+this.choice1 == card) {
                    return require('../assets/quinto-images/cards/card.jpg');
                } else if ('card'+this.choice2 == card) {
                    return require('../assets/quinto-images/cards/card.jpg');
                } else if ('card'+this.choice3 == card) {
                    return require('../assets/quinto-images/cards/card.jpg');
                } else if ('card'+this.choice4 == card) {
                    return require('../assets/quinto-images/cards/card.jpg');
                } else if ('card'+this.choice5 == card) {
                    return require('../assets/quinto-images/cards/card.jpg');
                } else {
                    return require('../assets/quinto-images/cards/' + card + '.jpg');
                }

            },
            quick_pick: function (count) {
                //Send count to API (I think) to prepare for purchase
                this.$store.dispatch('lottery/lottery_quick_picks', {def_id: this.lottery.def_id, qty: count});
            },
            choose_card: function (card) {
                //Sends card pick to large card (chosen card) also needs to flip the card over?
                if (this.choice1 == card) {
                    this.choice1 = '';
                } else if (this.choice2 == card) {
                    this.choice2 = '';
                } else if (this.choice3 == card) {
                    this.choice3 = '';
                } else if (this.choice4 == card) {
                    this.choice4 = '';
                } else if (this.choice5 == card) {
                    this.choice5 = '';
                } else if (this.choice1 == '') {
                    this.choice1 = card;
                } else if (this.choice2 == '') {
                    this.choice2 = card;
                } else if (this.choice3 == '') {
                    this.choice3 = card;
                } else if (this.choice4 == '') {
                    this.choice4 = card;
                } else if (this.choice5 == '') {
                    this.choice5 = card;
                } else {
                    return;
                }
            },
            reset_single_choice: function (choice) {
                this[choice] = '';
            },
            reset_choices: function () {
                console.log('here');
                this.choice1 = '';
                this.choice2 = '';
                this.choice3 = '';
                this.choice4 = '';
                this.choice5 = '';
            },
            able_to_send_choices: function () {
                if (this.choice1 == '' || this.choice2 == '' || this.choice3 == '' || this.choice4 == '' || this.choice5 == '') {
                    return false;
                } else {
                    return true;
                }
            },
            box_pick: function () {
                //creates all possible combination of chosen cards (I think) and adds them to 'picks for purchase' (API?)
                this.$store.dispatch('lottery/lottery_add_pick',
                        {"def_id": this.lottery.def_id, "pick": this.getPick(), "box": true});
                this.reset_choices();
            },
            getPick: function () {
                return this.choice1 + ',' + this.choice2 + ',' + this.choice3 + ',' + this.choice4 + ',' + this.choice5;
            },
            add_pick: function () {
                console.log(this.lottery);
                this.$store.dispatch('lottery/lottery_add_pick',
                        {"def_id": this.lottery.ref_id, "pick": this.getPick(), "box": false});
                this.reset_choices();
            },
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .lotto-555 {
        border-radius: 50%;
        background: red;
        padding: 5px;
        width: 30px;
        display: inline-block;
        text-align: center;
        height: 30px;
        line-height: 30px;
    }

    button{
        cursor: pointer;
    }

    .game-row {
        padding: 0 20px;
    }

    .left-side {
        width: 60%;
        float: left;
    }

    .game-title-row .game-info-container{
        float: right;
        min-width: 70%;
    }

    .right-side {
        width: 38%;
        margin-left: 2%;
        float: left;
/*        width: 40%;
        float: left; */
    }

    .game-title-container h3 {
        font-size: 24px;
    }

    /*Game board*/

    .lottery-game-board {
        min-height: 300px;
        padding-bottom: 10px;
    }

    .game-board {
        padding: 15px;
        background-color: rgba(0, 0, 0, 0.4);
    }

    .picks-wrapper {
        background-color: rgba(0, 0, 0, 0.4);
        /* padding: 0 15px 15px; */
        /*margin-right: -30px;*/
        width: 64%;
    }

    .picks-wrapper .picks-wrapper-inner{
        padding: 15px;
    }

    .lotto-pick-control-buttons {
        width: 33%;
        float: left;
        background-color: rgba(0, 0, 0, 0.4);
        padding: 0;
        margin-top: 15px;
        margin-left: 3%;
        /*margin-left: calc( 5% - 60px);*/
        /*margin-right: -20px;*/
        min-height: 150px;
    }

    .lotto-quick-pick{
        padding: 15px;
    }

    /*PLAYING CARDS*/
    .lottery-cards {
        width: 100%;
        margin: 0 auto;
    }

    .large-card {
        width: 19.9%;
    }

    .large-card img {
        height: auto;
        width: 95%;
        margin: 0 2.5% 15px;
    }

    .lottery-row {
        display: flex;
    }

    .card {
        width: 7.69%;
        cursor: pointer;
    }

    .card img {
        width: 90%;
        margin: 5% auto;
    }

    /*GAME INFO*/
    .lottery-game-info > div > div:first-child {
        color: white;
    }

    .lottery-game-info > div > div:nth-child(2) {
        color: white;
    }

    .lottery-game-info div {
        font-size: 20px;
    }

    /*QUICK PICKS SECTION*/
    .qp-btn-wrap {
        width: 100%;
        color: #fff;
    }

    .qp {
        display: inline-block;
        margin: 10px 10px 0 0;

    }

    /*board control buttons*/
    .lotto-quick-pick {

    }

    .lotto-quick-pick .titleBlock{
        background: #000;
        width: 100%;
    }

    .lotto-quick-pick h3 {
        padding-left: 6%;
        width: 94%;
        color: #fff;
        font-size: 20px;
    }

    .lotto-quick-pick button

    .pick-control-buttons {
        display: flex;

    }

    .pick-control-buttons > div{
        text-align: center;
        float: left;
        padding-bottom: 15px;
        cursor: pointer;
    }

    .pick-control-buttons .pickColumn1of3{  width: 25%;  }
    .pick-control-buttons .pickColumn2of3{  width: 45%;  }
    .pick-control-buttons .pickColumn3of3{  width: 30%;  }

    .pick-control-buttons > button {
        margin: 0;
    }

    .grid {
        float: left;
    }

    .picks-wrapper {

    }

    /*----- Modal Board Structure -----*/

</style>
