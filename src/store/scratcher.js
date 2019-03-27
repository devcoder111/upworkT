
export const scratcher = {
  namespaced: true,
  state: {
    active_games: [],
    scratcher: [],
    scratcher_batches: [],
    scratchers: [],
  },
  mutations: {
    handle_update_msg: function (state, data) {
    }
  },
  actions: {
    handle_update_msg: function (context, data) {
      console.log('handle_update_msg')
      context.commit('handle_update_msg', data)
    },
    scratcher_set_type: function(context, scratcher_type){
      sessionStorage.setItem('scratcher', this.scratcher_type);
    },
    scratcher_purchase: function (context, payload) {
      // payload: def_id (string), qty (int), cost (double)
      console.log('scratcher_purchase')
      console.log(payload);
      var msg = {
        "msg_id": '0',
        "msg_type": "scratcher_purchase",
        "content": {
          "def_id": payload.def_id+'',
          "qty" : payload.qty*1,
          "cost" : payload.cost*1
        }
      }
      this.dispatch('do_send', msg)
    },
    scratcher_submit: function (context, payload) {
      // payload: batch_id (string)
      console.log('scratcher_submit')
      var msg = {
        "msg_id": '0',
        "msg_type": "scratcher_submit",
        "content": {
          "batch_id": payload.batch_id
        }
      }
      this.dispatch('do_send', msg)
    }
  },
  getters: {
    getScratchers: function (state, getters, rootState) {
      //console.log('tabs');
      //console.log(rootState.tabs.tabs);
      var scratchers = rootState.tabs.tabs.filter(function (tab) {
        if (tab.parent_name != 'SCRATCHERS') {
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

        /*var lottery_def;
        if (lottery_def = state.lottery_defs.find(function (game) {
              return game.def_id == tab.ref_id;
            })) {
          Object.keys(lottery_def).forEach(function (property) {
            //console.log(property+' '+lottery_def[property]);
            if (!tab[property]) {
              //console.log(property+' '+lottery_def[property]);
              tab[property] = lottery_def[property];
            }
          })
        }*/

        return true;
      }).sort(function(a,b){
        return a.ord - b.ord;
      });

      return scratchers;
    },
    getBatch: (state) => {
      return state.scratcher_batches[0];
    },
    getCurrentScratcher: (state) => (seq_nbr) => {
      return state.scratchers.find(function(scratcher){
        //console.log(scratcher);
        //console.log(seq_nbr);
        return scratcher.seq_nbr == seq_nbr;
      })
    }
  }
}
