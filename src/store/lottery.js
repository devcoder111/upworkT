export const lottery = {
    namespaced: true,
    state: {
        lottery_defs: [], //Current Game
        /*
         CREATE TABLE  lottery_defs (
         def_id          varchar(20)  not null, // surrogate key for (lobby_nbr, site_nbr)
         site_type       varchar(3)  not null,
         game_name       varchar(20)  not null,

         buy_in          decimal    not null,     // cost per pick
         jackpot_amt     varchar(20),

         game_nbr        int      not null,
         buyin_allowed   boolean  default false, // purchasing allowed
         draw_duration   bigint   not null,      // milliseconds to Quinto draw
         max_picks       int      not null,      // Maximum number of picks per ticket

         promo_available boolean     default false not null, // does lottery have a current promotion going
         faucet          boolean     default false not null,

         // Manually Maintained Fields
         draw_time       DateTime,   // Actual Draw Date
         draw_time_text  varchar(20),
         buyin_text      varchar(20),

         primary key lottery_defs_pk (def_id)
         );
         */
        lottery_games: [], //Past Games
        /*
         CREATE TABLE  lottery_games (
         game_id         varchar(20)       not null,
         def_id          varchar(20)       not null, //use in message for server
         site_type       varchar(3)  not null,
         game_nbr        int     not null,
         game_type       int     not null,
         draw_duration   bigint       not null, // milliseconds to Quinto draw

         draw_hash       varchar(64)  not null, // Hash used for drawing
         picks           varchar(30),   // This is a varchar list of cards or numbers
         draw            varchar(30),   // This is the ordering of the draw (Used for LOTTO555
         prize_amt       varchar(20),

         //Manually Maintained Fields
         draw_time       DateTime,   // Actual Draw Date
         draw_time_text  varchar(20),

         // For my use, not from server
         pick_text       varchar(30),
         pick1 byte, pick2 byte, pick3 byte, pick4 byte, pick5 byte,
         draw1 byte, draw2 byte, draw3 byte, draw4 byte, draw5 byte,

         primary key lottery_games_pk (game_id)
         );
         */
        lottery_game_results: [],
        /*
         CREATE TABLE  lottery_game_results (
         game_id     varchar(20) not null,
         seq_nbr     int         not null,
         match_text  varchar(10) not null,
         win_count   varchar(10),
         prize_amt   varchar(20),
         pari_mutuel boolean     default false not null,

         primary key lottery_game_results_pk (game_id, seq_nbr)
         );
         */
        lottery_game_tickets: [],
        /*
        CREATE TABLE lottery_game_tickets (
          game_id   int64   not null,
          ticket_id int64   not null,
          pick_qty  integer not null,

          serial_nbr  string(20),
          prize_amt   string(20),

          primary key lottery_game_tickets_pk (game_id, ticket_id)
        );
         */
        lottery_tickets: [],
        /*
         CREATE TABLE  lottery_tickets (
         def_id        varchar(20)       not null,
         ticket_id     varchar(20)       not null,
         ticket_type   varchar(10), // Null = CART Ticket
         pick_qty      int,
         nbr_of_games  int,
         can_refund    boolean default false not null,
         pool_nbr      bigint,

         serial_nbr   varchar(20),

         primary key lottery_tickets_pk (def_id, ticket_id)
         );
         */
        lottery_picks: [],
        /*
         CREATE TABLE  lottery_picks (
         ticket_id varchar(20)       not null,
         seq_nbr   int     not null,
         game_type int     not null,
         pick_type varchar(5)   not null,

         picks     varchar(30),

         // Manually Maintained Fields
         pick_text       varchar(30),

         primary key lottery_picks_pk (ticket_id, seq_nbr)
         );
         */
        lottery_game_picks: [],
        /*
        CREATE TABLE  lottery_game_picks (
          game_id   varchar(20)(20)       not null,
          ticket_id varchar(20)       not null,
          seq_nbr   int     not null,
          game_type int     not null,

          pick_type varchar(5)   not null,
          picks     varchar(30),

          pick_text varchar(30),
          prize_amt varchar(20),

          primary key lottery_game_picks_pk (game_id, ticket_id, seq_nbr)
        );
         */
        lottery_autowagers: []
        /*
        CREATE TABLE  lottery_autowagers (
          def_id    varchar(20)     not null,
          pick_qty  int,  // NULL = No Picks
          seq_bonus boolean,

          primary key lottery_autowagers_pk (def_id)
        );
         */
    },
    mutations: {
        update_lottery: function (state, items) {
            // gets called when we subscribes to the lottery - whole
            console.log('update_lottery')
            state.active_games = items.tabs
            this.dispatch('lottery/lottery_subscribe', items.tabs)
        },
        update_lottery_by_id: function (state, items) {
            // gets called for each specific lottery we are subscribed to
            return
            var ref_id = items[0].SUBSCRIPTIONS.ref_id
            var location = items[1]._location_;
            for (var i = 0; i < state.lotteries.length; i++) {
                if (state.lotteries[i].ref_id == ref_id) {
                    state.lotteries[i].location = location
                    state.lotteries[i].lottery_game_results = items[1]
                    state.lotteries[i].lottery_defs = items[2]
                    state.lotteries[i].lottery_games = items[3]
                    return
                }
            }
            // there is nothing to update -- add it to the array
            state.lotteries.push(
                {
                    ref_id: ref_id,
                    location: location,
                    lottery_game_results: items[1],
                    lottery_defs: items[2],
                    lottery_games: items[3]
                }
            )
        },
        handle_update_msg: function (state, data) {
            console.log('handle_update_msg')
        }
    },
    actions: {
        handle_update_msg: function (context, data) {
            console.log('handle_update_msg')
            context.commit('handle_update_msg', data)
        },
        lottery_add_pick: function (context, payload) {
            // payload: def_id (string), pick(string), box(bool-optional)
            console.log('lottery_add_pick')
            var msg = {
                "msg_id": '0',
                "msg_type": "lottery_add_pick",
                "content": {
                    "def_id": payload.def_id,
                    "pick": payload.pick,
                    "box": payload.box
                }
            }
            this.dispatch('do_send', msg)
        },
        lottery_clear_cart: function (context, def_id) {
            // payload: def_id (string)
            console.log('lottery_clear_cart')
            var msg = {
                "msg_id": '0',
                "msg_type": "lottery_clear_cart",
                "content": {
                    "def_id": def_id
                }
            }
            this.dispatch('do_send', msg)
        },
        lottery_game_data: function(context, game_id) {
            console.log('lottery_game_data')
            var msg = {
              "msg_id": 0,
              "msg_type": "lottery_game_data",
              "content": {
                "game_id": game_id
              }
            }
            this.dispatch('do_send', msg)
        },
        lottery_number_of_games: function(context, payload) {
          console.log('lottery_number_of_games');
            var msg = {
              "msg_id": '0',
              "msg_type": "lottery_number_of_games",
              "content": {
                "def_id": payload.def_id,
                "nbr_of_games": payload.nbr_of_games*1
              }
            };
            this.dispatch('do_send', msg);
        },
        lottery_promo_code: function (context, payload) {
            var self = this
            this.$swal2({
                title: 'Login',
                html: 'Promo Code: <span class="user-name"><input type="text" id="swal-promo-code"></span>',
                focusConfirm: false,
                preConfirm: function () {
                    return new Promise(function (resolve, reject) {
                        if (document.getElementById("swal-promo-code").value == '') {
                            reject('A promo code is required')
                        } else {
                            resolve([
                                document.getElementById("swal-promo-code").value
                            ])
                        }
                    })
                }
            }).then(function (result) {
                console.log('lottery_promo_code')
                var msg = {
                    "msg_id": '0',
                    "msg_type": "lottery_promo_code",
                    "content": {
                        "def_id": payload.def_id,
                        "code": result[[0]]
                    }
                }
                self.dispatch('do_send', msg)
            }).catch(self.$swal2.noop)

        },
        lottery_purchase: function (context, payload) {
            // payload: def_id (string), nbr_games(int)
            console.log('lottery_purchase')
            var msg = {
                "msg_id": '0',
                "msg_type": "lottery_purchase",
                "content": {
                    "def_id": payload.def_id
                }
            }
            this.dispatch('do_send', msg)
        },
        lottery_quick_picks: function (context, payload) {
            // payload: def_id (string), qty(int)
            console.log('lottery_quick_picks')
            if (!payload.def_id) {
                // for testing:
                payload.def_id = context.state.lotteries[0].ref_id
            }
            var msg = {
                "msg_id": '0',
                "msg_type": "lottery_quick_picks",
                "content": {
                    "def_id": payload.def_id,
                    "qty": payload.qty
                }
            }
            this.dispatch('do_send', msg)
        },
        lottery_subscribe: function (context, items) {
            for (var i = 0; i < items.length; i++) {
                var msg = {
                    'msg_id': '0',
                    'msg_type': 'subscribe',
                    'content': {
                        'ref_id': items[i].ref_id
                    }
                }
                console.log('subscribe to ' + items[i].ref_id)
                this.dispatch('do_send', msg)
            }
        },
        lottery_ticket_refund: function (context, ticket_id) {
            // payload: _ticket_id (string),
            console.log('lottery_ticket_refund')
            var msg = {
                "msg_id": '0',
                "msg_type": "lottery_ticket_refund",
                "content": {
                    "ticket_id": ticket_id
                }
            }
            this.dispatch('do_send', msg)
        },
        /*
        CREATE TABLE  lottery_autowagers (

          def_id    varchar(20)     not null,
          pick_qty  int,  // NULL = No Picks
          seq_bonus boolean,

          primary key lottery_autowagers_pk (def_id)
        );
        */
        lottery_autowager: function(context, payload) {
            var msg = {
              "msg_id": 0,
              "msg_type": "lottery_autowager",
              "content": {
                "def_id": payload.def_id,
                "pick_qty": 1
              }
            }
            if(payload.pick_qty){
                msg.content.pick_qty = payload.pick_qty;
            }
            this.dispatch('do_send', msg)
        }
    },
    getters: {
        getLotteries: function (state, getters, rootState) {
            //console.log('tabs');
            //console.log(rootState.tabs.tabs);
            var lotteries = rootState.tabs.tabs.filter(function (tab) {
                if (tab.parent_name != 'LOTTERY') {
                    return false;
                }

/*                var lottery_game;
                if (lottery_game = state.lottery_games.find(function (game) {
                        return game.def_id == tab.ref_id;
                    })) {
                    Object.keys(lottery_game).forEach(function (property) {
                        //console.log(property+' '+lottery_game[property]);
                        if (!tab[property]) {
                            //console.log(property+' '+lottery_game[property]);
                            tab[property] = lottery_game[property];
                        }
                    })
                }*/

                var lottery_def;
                if (lottery_def = state.lottery_defs.find(function (game) {
                        return game.def_id == tab.ref_id;
                    })) {
                    Object.keys(lottery_def).forEach(function (property) {
                        //console.log(property+' '+lottery_def[property]);
                        //if (!tab[property]) {
                            //console.log(property+' '+lottery_def[property]);
                            tab[property] = lottery_def[property];
                        //}
                    })
                }

                return true;
            });

            return lotteries;
        },
        getQuinto: (state, getters, rootState) => {
            return rootState.tabs.tabs.find(function(tab){
                return tab.tab_name == 'QUINTO';
            })
        },
        get555: (state, getters, rootState) => {
            return rootState.tabs.tabs.find(function(tab){
                return tab.tab_name == 'LOTTO555';
            })
        },        
        getFaucet: (state, getters, rootState) => {
            return rootState.tabs.tabs.find(function(tab){
                return tab.tab_name == 'FAUCET';
            })
        },
        getCart: (state) => (def_id) => {
            var cart = state.lottery_tickets.find(function (ticket) {
                return ticket.def_id == def_id && ticket.ticket_type == 'CART';
            });

            var trigger_picks = state.lottery_picks;
            if(!cart) {
                cart = {};
            } else {
                cart.picks = state.lottery_picks.filter(function (pick) {
                    return pick.ticket_id == cart.ticket_id;
                }).sort(function (a, b) {
                    return a.seq_nbr - b.seq_nbr;
                });
            }

            return cart;
        },
        getPurchasedTickets: (state) => (def_id) => {
            return state.lottery_tickets.filter(function(ticket){
                if(ticket.def_id != def_id){
                    return false;
                }
                return ticket.type != 'CART';
            }).sort(function(a,b){
                return b.seq_nbr - a.seq_nbr;
            })
        },
        getGameTickets: (state) => (game_id) => {
            return state.lottery_game_tickets.filter(function(ticket){
                return ticket.game_id == game_id;
            }).sort(function(a,b){
                return b.seq_nbr - a.seq_nbr;
            })
        },
        getGames: (state) => (def_id) => {
            return state.lottery_games.filter(function(game){
                return game.def_id == def_id;
            })
        },
        getGame: (state) => ({def_id, game_nbr}) => {
            console.log('game: '+game_nbr+' def_id: '+def_id);
            return state.lottery_games.filter(function(game){
                return game.def_id == def_id && game.game_nbr == game_nbr;
            })
        },
        getTicketPicks: (state) => (ticket_id) => {
            return state.lottery_picks.filter(function(pick){
                return pick.ticket_id == ticket_id;
            }).sort(function(a,b){
                return a.seq_nbr - b.seq_nbr;
            })
        },
        getGameTicketPicks: (state) => (ticket_id) => {
            return state.lottery_game_picks.filter(function(pick){
                return pick.ticket_id == ticket_id;
            }).sort(function(a,b){
                return a.seq_nbr - b.seq_nbr;
            })
        },
        getGamePicks: (state) => (game_id) => {
            return state.lottery_game_picks.filter(function(pick){
                return pick.game_id == game_id;
            }).sort(function(a,b){
                return b.seq_nbr - a.seq_nbr;
            })
        },
        getResults: (state) => (game_id) => {
            return state.lottery_game_results.filter(function(result){
                if(result.game_id == game_id){
                    console.log(result);
                    return true;
                } else {
                    console.log('nope');
                    return false;
                }
            }).sort(function(a,b){
                return a.seq_nbr - b.seq_nbr;
            })
        },
        isAutowagerOn: (state) => (def_id) => {
            return state.lottery_autowagers.find(function(autowager){
                if(autowager.def_id == def_id){
                    return autowager.pick_qty > 0;
                }
            }) ? true : false;
        }
     }
}
