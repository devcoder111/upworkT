<template>
    <div class="lotto-modal-wrap inner-modal lotto-results">

        <div class="results-wrap">
            <div class="leftResults">
                <div class="results overall">
                    <div class="resultsInner standardPadding">
                        <h4>Overall Results</h4>
                        <table border="1" cellspacing="1" cellpadding="1" class="smallerTable stripeRows">
                            <tr>
                                <th>Matches</th>
                                <th>Wins</th>
                                <th>Prize Amount</th>
                            </tr>
                            <tr v-for="result in current_game_results()">
                                <td>{{ result.match_text }}</td>
                                <td>{{ result.win_count }}</td>
                                <td>{{ result.prize_amt }}</td>
                            </tr>
                        </table>
                    </div>
                </div>

            </div>
            <div class="middleContent">
                <div class="game-overview-wrap standardPadding">
                    <h4>Game {{ current_game_nbr }} Winning Picks</h4>
                    <!--<div class="game-overview">Game ID: {{ current_game.game_id }}</div>-->
                    <div class="game-picks" v-html="display_picks(current_game.picks)">
                        <div class="large-card choice1 borderBlue">12</div>
                        <div class="large-card choice2 borderRed">18</div>
                        <div class="large-card choice3 borderGrey">19</div>
                        <div class="large-card choice4 borderGreen">21</div>
                        <div class="large-card choice5 borderYellow">51</div>
                    </div>
                    <div v-if="is_555()" class="game-picks circleCards">
                        <div class="large-card choice1 borderBlue">
                            <div class="primaryNumber">11</div>
                            <div class="secondaryNumber">22</div>
                        </div>
                        <div class="large-card choice2 borderRed">
                            <div class="primaryNumber">53</div>
                            <div class="secondaryNumber">41</div>
                        </div>
                        <div class="large-card choice3 borderGrey">
                            <div class="primaryNumber">23</div>
                            <div class="secondaryNumber">12</div>
                        </div>
                        <div class="large-card choice4 borderGreen">
                            <div class="primaryNumber">81</div>
                            <div class="secondaryNumber">23</div>
                        </div>
                        <div class="large-card choice5 borderYellow">
                            <div class="primaryNumber">14</div>
                            <div class="secondaryNumber">61</div>
                        </div>
                    </div>
                    <!--<div class="game-draw">Draw: {{ current_game.draw }}</div>
                    <div class="game-hash">Hash: {{ current_game.draw_hash }}</div>
                    <div class="game-type">Game Type: {{ current_game.game_type }}</div>
                    <div class="game-draw">Draw Duration: {{ current_game.draw_duration }}</div>-->
                </div>
            </div>
            <div class="rightMyResults">
                <div class="results mine standardPadding">
                    <h4>My Results</h4>
                    <table v-if="game_tickets()" style="cursor:pointer;" class="stripeRows">
                        <tr>
                            <th># of Picks</th>
                            <th>Serial #</th>
                            <th>Winnings</th>
                        </tr>
                        <tr v-for="ticket in game_tickets()" @click="setActiveTicket(ticket)" :class="setActiveClass(ticket.ticket_id)">
                            <!--<td class="ticketInfo ticketId">{{ ticket.ticket_id }}</td>-->
                            <td class="ticketInfo ticketQty">{{ ticket.pick_qty }}</td>
                            <td class="ticketInfo ticketQty">{{ ticket.serial_nbr }} </td>
                            <td class="ticketInfo ticketQty">{{ ticket.prize_amt }}</td>
                        </tr>
                    </table>
                    <table v-if="active_ticket">
                        <tr class="tableHeader">
                            <th>#</th>
                            <th>Pick Type</th>
                            <th>Picks</th>
                            <th>Prize Amount</th>
                            <th>Pick Text</th>
                        </tr>
                        <tr v-for="pick in active_ticket_picks()">
                            <td>{{ pick.seq_nbr }}</td>
                            <td>{{ pick.pick_type }}</td>
                            <td style="min-width: 300px;" v-html="display_picks(pick.picks)"></td>
                            <td>{{ pick.prize_amt }}</td>
                            <td>{{ pick.pick_text }}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['lottery','current_game_nbr'],
        data: function(){
            return {
                active_ticket: {},
                next_drawing: ''
            }
        },
        computed: {
            games: function(){
                return this.$store.getters['lottery/getGames'](this.lottery.def_id);
            },
            current_game: function(){
                return this.$store.getters['lottery/getGame']({def_id: this.lottery.def_id, game_nbr: this.current_game_nbr})[0];
            }
        },
        watch: {
            current_game: function(){
                this.$emit('game_nbr', this.current_game.game_nbr);
                console.log('changing game')
                console.log(this.$store.getters['lottery/getResults'](this.current_game.game_id).length);
                if(!this.$store.getters['lottery/getResults'](this.current_game.game_id).length){
                    console.log('fetching game data')
                    this.$store.dispatch('lottery/lottery_game_data', this.current_game.game_id);
                }
                console.log('done changing game')
            }
        },
        methods: {
            is_active_ticket: function(ticket_id){
                return this.active_ticket.ticket_id == ticket_id;  
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
            setActiveClass: function(ticket_id){
                if(this.active_ticket && this.active_ticket.ticket_id == ticket_id){
                    return 'active';
                }  
            },
            setActiveTicket: function(ticket){
                this.active_ticket = ticket;  
            },
            display_picks: function(picks){
                var self = this;
                console.log(this.current_game);
                console.log(this.current_game.picks);
                var picks = picks.split(',');
                var display = ' ';
                var game_trigger = this.current_game_nbr;
                console.log('display_picks');
                picks.forEach(function(pick){
                    if(self.is_555()){
                        display = display + ' ' + pick;
                    } else {
                        display = display + '<img style="width: 20%;" src="' + require('../assets/quinto-images/cards/card' + pick + '.jpg') + '">';
                    }
                });
                return display;
            },
            seeActiveGame: function(){
                this.$emit('game_nbr', this.lottery.game_nbr);
            },
            current_game_results: function(){
                var results = this.$store.getters['lottery/getResults'](this.current_game.game_id);
                return results;
            },
            active_ticket_picks: function(){
                console.log('active_ticket_picks');
                if(this.active_ticket.ticket_id){
                    var picks = this.$store.getters['lottery/getGameTicketPicks'](this.active_ticket.ticket_id);
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
                return this.currentGameIndex() == 0;
            },
            isOldestGame: function(){
                return this.currentGameIndex() + 1 == this.totalGames();
            },
            currentGameIndex: function(){
                var self = this;
                return this.games.findIndex(function(game, index){
                    return game.game_id == self.current_game.game_id;
                })
            },
            totalGames: function(){
                return this.games.length;
            },
            datetimeIntoNext: function(dt)
            {
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
              return dateFuture.getDate() + '-' + month + '-' + dateFuture.getFullYear() + ' ' + currentHours + ':' + currentMins + tod
            }
        }
    }
</script>
<style scoped>

    tr.active,
    tr.active td{
        background: yellow;
        color: black;
    }
    .standardPadding{
        padding: 15px;
    }

    .leftResults{
        width: 280px;
        float: left;
        background-color: rgba(0, 0, 0, 0.4);
        margin-bottom: 15px;
    }

    .middleContent{
        width: calc(60% - 280px);
        margin-left: 2%;
        float: left;
        background-color: rgba(0, 0, 0, 0.4);
        min-width: 280px;
        margin-bottom: 15px;
    }

    .rightMyResults {
        width: 36%;
        margin-left: 2%;
        float: left;
        background-color: rgba(0, 0, 0, 0.4);
        min-width: 280px;
        margin-bottom: 15px;
    }


    table tr td{
        padding: 2px 6px;
    }

    .tableHeader,
    table tr th{
        padding: 4px 12px 4px 6px;
    }

    .tableHeader th{
        width: 100%;
    }
    table.smallerTable tr td{
        padding: 2px;
    }

    table.smallerTable tr th {
        padding: 2px 6px 2px 2px;
    }





/*GAME INFO*/
.lottery-game-info{
/*display: table;*/

}
.lottery-game-info > div{
/*display: table-row;*/
    display: inline-block;
    text-align: center;
}
.lottery-game-info > div > div{
/*display: table-cell;*/ text-align: center;

}
.lottery-game-info > div > div:first-child{
/*background-color: #A3A3A3;*/
    color: white;
}
.lottery-game-info > div > div:nth-child(2){
/*background-color: #2C3E50;*/
    color: white;
}
.lottery-game-info > div > div{
    font-size: 20px;
    border: 2px solid #fff;
    padding: 20px;
}

.results-wrap{
    display: table;
    width: 100%;
}
.results{
    /*display: block;*/
    display: table-cell;
    width: 100%;
    float: left;
    margin-bottom: 15px;
}

.results .resultsInner table{
    width: 100%;
}

.lotto-results h4{
    color: #fff;
}

    .ticketId{
        cursor: pointer;
    }


</style>