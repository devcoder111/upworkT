<template>
    <div class="lotto-picks-for-purchase right-side">
        <div class="pfp-wrap">
            <div class="pfp-display">
                <table class="pfp">
                    <tbody>
                    <tr>
                        <th>Num</th>
                        <th>PT</th>
                        <th>Picks for Purchase</th>
                    </tr>
                    <tr v-for="pick in cart.picks">
                        <td>{{ pick.seq_nbr }}</td>
                        <td>{{ pick.pick_type }}</td>
                        <td>
                            <div class="mypicks">
                                <div class="pickedcard" v-html="display_picks(pick.picks)"></div>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <div class="pfp-controls">
                <div>
                    <div class="numgames" v-if="lottery.max_games > 1">
                        How many games? <select v-model="nbr_of_games">
                            <option v-for="nbr in nbr_games_possible">{{ nbr }}</option>
                        </select>
                    </div>
                    <div class="controls">
                        <button @click="clear_cart()" class="clearpicks btn-min">Clear Picks</button>
                        <button @click="purchase()" class="purchasepicks btn primaryButton" v-html="purchase_text()"></button>
                        <button v-if="!is_faucet()" @click="redeem_promo()" class="purchasepicks btn primaryButton">Redeem Promo</button>
                        <!--<div @click="autowager_control()" class="autowager btn">QuintoBTC Lottery Autowager</div>-->
                        <div class="pickscart"><span>{{ cart_count() }}</span>&nbsp;Item(s) in Cart</div>
                    </div>
                </div>
            </div>
            <table v-if="purchasedTickets.length">
                <tr>
                    <th>Type</th>
                    <th>Picks</th>
                    <th>Games</th>
                    <!--<th>Pool</th>-->
                    <th>Ticket #</th>
                    <th></th>
                </tr>
                <tr v-for="ticket in purchasedTickets" @click="set_active_ticket(ticket)">
                    <td>{{ ticket.ticket_type }}</td>
                    <td>{{ ticket.pick_qty }}</td>
                    <td>{{ ticket.nbr_of_games }}</td>
                    <!--<td>{{ ticket.pool_nbr }}</td>-->
                    <td>{{ ticket.serial_nbr }}</td>
                    <td v-if="ticket.can_refund" @click="ticket_refund(ticket.ticket_id)" :style="'cursor: pointer;'"><button class="btn btn-xs">Refund</button></td>
                </tr>
            </table>
            <div v-if="active_ticket.ticket_id">
                <!--<span style="color: red;">{{ active_ticket.ticket_id }} {{ active_ticket_picks.length }}</span>-->
                <table><tr v-for="pick in active_ticket_picks()"><td>{{ pick.seq_nbr }}</td><td>{{ pick.pick_type }}</td><td v-html="display_picks(pick.picks)"></td></tr></table>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['lottery'],
        computed: {
            buyin_allowed: function(){
                return this.lottery.buyin_allowed;  
            },
            nbr_games_possible: function(){
                var list = [];
                for(var i = 1; i <= this.lottery.max_games; i++){
                    list.push(i);
                }
                return list;
            },
            cart: function(){
                return this.$store.getters['lottery/getCart'](this.lottery.def_id);
            },
            purchasedTickets: function(){
                return this.$store.getters['lottery/getPurchasedTickets'](this.lottery.def_id);
            },
            autowager_on: function(){
                return this.$store.getters['lottery/isAutowagerOn'](this.lottery.def_id);
            }
        },
        data: function() {
            return {
                nbr_of_games: 1,
                active_ticket: {}
            }
        },
        watch: {
            nbr_of_games: function(){
                if(!this.is_555()) {
                    this.$store.dispatch('lottery/lottery_number_of_games', {
                        def_id: this.lottery.def_id,
                        nbr_of_games: this.nbr_of_games
                    })
                }
            },
            cart: function(){
                //TODO: why was this here? It causes NaN to be sent to lotter_number_of_games this.nbr_of_games = this.cart.nbr_of_games;
            }
        },
        methods: {
            ticket_refund: function(ticket_id){
                this.$store.dispatch('lottery/lottery_ticket_refund', ticket_id);  
            },
            redeem_promo: function(){
                this.$store.dispatch('lottery/lottery_promo_code', {def_id: this.lottery.def_id});
            },
            purchase_text: function(){
                if(this.is_faucet()){
                    return 'Faucet';
                } else if(this.cart.purchase_amt){
                    return 'Purchase <span style="line-height: 16px; font-size: smaller;">('+this.cart.purchase_amt+')</span>';
                } else {
                    return 'Purchase';
                }
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
            is_nbr_games_active: function(nbr){
                if(nbr == this.nbr_of_games){
                    return 'active'
                }
            },
            active_ticket_picks: function(){
                console.log('active_ticket_picks');
                if(this.active_ticket.ticket_id){
                    var picks = this.$store.getters['lottery/getTicketPicks'](this.active_ticket.ticket_id);

                    console.log('picks');
                    console.log(picks);
                    return picks;
                } else {
                    return [];
                }
            },
            display_picks: function(displaypicks){
                var self = this;
                var picks = displaypicks.split(',');
                var display = '';
                picks.forEach(function(pick){
                    if(self.is_555()){
                        display = display + ' ' + pick;
                    } else {
                        display = display + '<img src="'+require('../assets/quinto-images/cards/card'+pick+'.jpg')+'" height=auto width=15% style="margin: 2.5%;">';
                    }
                });
                return display;
            },
            set_active_ticket: function(ticket){
                this.active_ticket = ticket;
            },
            get_active_ticket: function(){
                if(this.tickets.length){
                    return this.active_ticket.length ? this.active_ticket : this.tickets[0];
                }
            },
            cart_count: function(){
                return this.cart.picks ? this.cart.picks.length : 0;
            },
            autowager_control : function(){
                var payload = {
                    def_id: this.lottery.def_id
                }

                var active_pick_qty = this.active_ticket_picks().length;
                if(active_pick_qty){
                    payload.pick_qty = active_pick_qty;
                }

                this.$store.dispatch('lottery/lottery_autowager', payload)
            },
            clear_cart: function(){
                this.$store.dispatch('lottery/lottery_clear_cart', this.lottery.ref_id);
            },
            purchase: function(){
              if (!this.$store.state.runtime.logged_in){
                this.$store.dispatch('dialog_login')
              }
              if (!this.$store.state.runtime.logged_in){
                return
              }
              this.$store.dispatch('lottery/lottery_purchase', {def_id: this.lottery.ref_id})
            }

        }
    }
</script>

<style scoped>

    button{
        cursor: pointer;
    }

    .pfp-display {
        max-height: 300px;
        height: 300px;
        overflow-y: scroll;
    }

    .pfp-wrap{
        /*width: 90%;*/
        /*margin-left: 20px;*/
        /*background-color: #00ccff;*/
        color: #fff;
        padding: 20px 15px;
        background-color: rgba(0, 0, 0, 0.4);
        min-height: 500px;
    }
    .pfp{
        width: 98%;

    }
    .pfp td,
    .pfp th{
        /*border: 1px solid #fff;*/
        vertical-align: middle;
        text-align: center;
    }
    .pfp th {
        border: 1px solid #fff;
        font-size:18px;
        padding: 10px;
    }
    .pickedcard{
        padding: 0 2.5%
    }
    .numgames{
        display: flex;
        width: 80%;
        margin: 8px auto;
    }
    .gmnum{
        width: 14.66% ;
        border: 1px solid #fff;
        text-align: center;
        padding-top: 4px;
        padding-bottom: 4px;
        cursor: pointer;
    }
    .gmnum.active{
        background: yellow;
        color: black;
    }

</style>
