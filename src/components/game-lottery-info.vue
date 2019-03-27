<template>
    <div class="lotter-game-info-wrap">
        <div v-if="lottery.game_nbr == current_game_nbr" class="lottery-game-info current">
            <div class="lotto-jkpt">
                <div class="info-title">Est Jackpot</div>
                <div>{{ active_jackpot_amt }}</div>
            </div>
            <div class="next-draw">
                <div class="info-title">Next Drawing</div>
                <div>{{ active_draw_timestamp }}</div>
            </div>
            <div class="game-nmbr">
                <div class="info-title">Game</div>
                <div>{{ active_game_nbr }}</div>
            </div>
            <div class="show-results">
                <div class="controls" v-if="has_next_game()">
                <button class="game-control-btn btn optionBtn secondaryButton" @click="getFirstResults()"><span>Show Results </span></button>
                </div>
            </div>
        </div>

        <div v-else="" class="lottery-game-info results">
            <div class="next-draw">
                    <div class="info-title">Draw Date </div>
                    <div>{{ datetimeIntoNext(current_game.draw_timestamp) }}</div>
            </div>
            <!-- <div>{{ current_game.game_id }}</div> -->
            <div class="lotto-jkpt">
                <div class="info-title">Jackpot</div>
                <div>{{ current_game.jackpot_amt }}</div>
            </div>
            <div class="game-nmbr">
                <!-- <div class="info-title">Game {{ current_game.game_nbr }} </div>-->
                <div class="controls">
                    <button class="game-control-btn btn optionBtn secondaryButton" v-if="!isNewestGame()" @click="seeNewerGame()"><< Game {{ current_game.game_nbr + 1 }}</button>
                    <button class="game-control-btn btn optionBtn secondaryButton" @click="triggerSeeActiveGame()">Play</button>
                    <button class="game-control-btn btn optionBtn secondaryButton" v-if="!isOldestGame()" @click="seeOlderGame()">Game {{ current_game.game_nbr - 1 }} >></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['lottery','current_game_nbr'],
        data: function() {
            return {
                next_drawing: '',
                current_game: this.$store.getters['lottery/getGames'](this.lottery.def_id)[0]
                
            }
        },
        computed: {
            active_game_nbr: function(){
                var self = this;
                return this.$store.state.lottery.lottery_defs.find(function(lottery){
                    return self.lottery.def_id == lottery.def_id;
                }).game_nbr;
            },
            active_jackpot_amt: function(){
                var self = this;
                return this.$store.state.lottery.lottery_defs.find(function(lottery){
                    return self.lottery.def_id == lottery.def_id;
                }).jackpot_amt;
            },
            active_draw_timestamp: function(){
                var self = this;
                return this.datetimeIntoNext(this.$store.state.lottery.lottery_defs.find(function(lottery){
                    return self.lottery.def_id == lottery.def_id;
                }).draw_timestamp);
            },
            draw_timestamp: function(){
                return datetimeIntoNext(lottery.draw_timestamp)
            },

            games: function(){
                return this.$store.getters['lottery/getGames'](this.lottery.def_id);
            }
        },
        watch: {
            lottery: function(){

            },
            current_game: function(){
                this.$emit('game_nbr', this.current_game.game_nbr);
            }
        },
        mounted: function() {
            this.get_next_drawing();
        },
        methods: {
            is_faucet: function(){
                return this.lottery.faucet;
            },
            is_555: function(){
                return this.lottery.game_type == 'LOTTO555';
            },
            is_quinto: function(){
                return this.lottery.game_type == 'QUINTO';
            },
            get_next_drawing: function(){
                var self = this;
                var trigger = self.next_drawing;
                //console.log('get_next_drawing')
                return;
                this.next_drawing = this.$store.getters['datetimeIntoCountdown'](this.lottery.draw_timestamp);
                /*setInterval(function(){
                    self.get_next_drawing();
                }, 500);*/
            },
            has_next_game: function(){
                return this.$store.getters['lottery/getGames'](this.lottery.def_id).length;
            },
            getFirstResults: function(){
                this.$emit('update_game_nbr');
            },
            setGameNumber: function(game_nbr){
                this.current_game_nbr = game_nbr;
            },
            showModal: function(view){
//                console.log('view;'+ view);
                this.$store.state.home.modalView = view;
//                console.log('view2'+ view);
                this.$modal.show('my-mainmodal');
            },
            isQuickPickActive: function(quickpick){
                if(this.lottery.max_picks - this.picks_in_cart > quickpick){
                    return 'active';
                }
            },
            triggerSeeActiveGame: function(){
                this.$emit('game_nbr', this.lottery.game_nbr);
                //TODO this line breaks things: (not sure we need it) this.current_game = this.currentGameIndex()
            },
            current_game_results: function(){
                return this.$store.getters['lottery/getResults'](this.current_game.game_id);
            },
            active_ticket_picks: function(){
                console.log('active_ticket_picks');
                if(this.active_ticket.ticket_id){
                    var picks = this.$store.getters['lottery/getTicketPicks'](this.active_ticket.ticket_id);
                    console.log(picks);
                    return picks;
                } else {
                    return [];
                }
            },
            set_active_ticket: function(ticket){
                this.active_ticket = ticket;
            },
            get_active_ticket: function(){
                if(this.tickets.length){
                    return this.active_ticket.length ? this.active_ticket : this.tickets[0];
                }
            },
            game_results: function(){
                return this.$store.getters['lottery/getResults'](this.current_game.game_id);
            },
            game_tickets: function(){
                return this.$store.getters['lottery/getGameTickets'](this.current_game.game_id);
            },
            seeOlderGame: function(){
                if(!this.isOldestGame()){
                    this.current_game = this.games[this.currentGameIndex() + 1];
                }
            },
            seeNewerGame: function(){
                if(!this.isNewestGame()){
                    this.current_game = this.games[this.currentGameIndex() - 1];
                }
            },
            isNewestGame: function(){
                return this.current_game.game_nbr = this.active_game_nbr -1;
            },
            isOldestGame: function(){
                return this.currentGameIndex() + 1 == this.totalGames();
            },
            currentGameIndex: function(){
                var self = this;
//                console.log('breaking');
//                console.log(this.games);
                return this.games.findIndex(function(game, index){
                    return game.game_id == self.current_game.game_id;
                })
            },
            totalGames: function(){
                return this.games.length;
            },
            datetimeIntoNext: function(dt)
            {
                if(!dt){
                    return;
                }
                var t = dt.split(/[- :]/)

                var dateFuture = new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5]))
                var locale = "en-us"
                var month = dateFuture.toLocaleString(locale, { month: "short" });

                var currentHours = dateFuture.getHours();
                currentHours = ("0" + currentHours).slice(-2);
                var currentMins = dateFuture.getMinutes();
                var tod = (currentHours >= 12) ? 'pm' : 'am'
                if (currentHours > 12){
                    currentHours = currentHours - 12
                }
                currentMins = ("0" + currentMins).slice(-2);
                return dateFuture.getDate() + ' ' + month + ' ' + dateFuture.getFullYear() + ' ' + currentHours + ':' + currentMins + tod
            }
        }
    }
</script>

<style scoped>

    .hideThis{
        display: none;
    }

    .info-title{
        font-weight: bold;
    }

    button{
        cursor: pointer;
    }

    .lottery-game-info > div{
        padding-left: 2%;
        padding-right: 2%;
        padding-top: 10px;
        padding-bottom: 10px;
        background-color: #333333;
        width: auto;
        text-align: center;
        margin-bottom: 4px;
        float: right;
        margin-left: 2%;
    }
    .lottery-game-info > div > div {
        text-align: center;
    }
    .lottery-game-info .lotto-jkpt{   }
    .lottery-game-info .next-draw{     }
    .lottery-game-info .game-nmbr{     }



</style>
