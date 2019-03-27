
export const bingo = {
  namespaced: true,
  state: {
    active_games: [],
    subscriptions: [],
    bingo: []
  },
  mutations: {
    update_bingo: function (state, items) {
      // gets called when we subscribes to the bingo - whole
      console.log('update_bingo')
      state.active_games = items.tabs
      this.dispatch('bingo/bingo_subscribe', items.tabs)
    },
    update_bingo_by_id: function (state, items) {
      // gets called for each specific game we are subscribed to
      var ref_id = items[0].SUBSCRIPTIONS.ref_id
      var location = items[1]._location_;
      for (var i=0; i < state.bingo.length; i++){
        if (state.bingo[i].ref_id == ref_id){
          state.bingo[i].location = location
          // state.bingo[i].lottery_game_results = items[1]
          // state.bingo[i].lottery_defs = items[2]
          // state.bingo[i].lottery_games = items[3]
          return
        }
      }
      // there is nothing to update -- add it to the array
      state.bingo.push(
        {
          ref_id: ref_id,
          location: location,
          // lottery_game_results: items[1],
          // lottery_defs: items[2],
          // lottery_games: items[3]
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
    bingo_keep_cards: function (context, payload) {
      // payload: def_id (string), keep (bool)
      console.log('bingo_keep_cards')
      var msg = {
        "msg_id": '0',
        "msg_type": "bingo_keep_cards",
        "content": {
          "def_id": payload.def_id,
          "keep" : payload.keep
        }
      }
      this.dispatch('do_send', msg)
    },
    bingo_new_cards: function (context, def_id) {
      // payload: def_id (string)
      console.log('bingo_new_cards')
      var msg = {
        "msg_id": '0',
        "msg_type": "bingo_new_cards",
        "content": {
          "def_id": payload.def_id
        }
      }
      this.dispatch('do_send', msg)
    },
    bingo_purchase: function (context, payload) {
      // payload: def_id (string), qty (int)
      console.log('bingo_purchase')
      var msg = {
        "msg_id": '0',
        "msg_type": "bingo_purchase",
        "content": {
          "def_id": payload.def_id,
          "qty" : payload.qty
        }
      }
      this.dispatch('do_send', msg)
    },
    bingo_submit: function (context, payload) {
      // payload:
      console.log('bingo_')
      var msg = {
        "msg_id": '0',
        "msg_type": "bingo",
        "content": {
          "def_id": payload.def_id        }
      }
      this.dispatch('do_send', msg)
    },
    bingo_submit: function (context, payload) {
      // payload:
      console.log('bingo_')
      var msg = {
        "msg_id": '0',
        "msg_type": "bingo",
        "content": {
          "def_id": payload.def_id        }
      }
      this.dispatch('do_send', msg)
    },
    bingo_submit: function (context, payload) {
      // payload:
      console.log('bingo_')
      var msg = {
        "msg_id": '0',
        "msg_type": "bingo",
        "content": {
          "def_id": payload.def_id        }
      }
      this.dispatch('do_send', msg)
    },
    bingo_submit: function (context, payload) {
      // payload:
      console.log('bingo_')
      var msg = {
        "msg_id": '0',
        "msg_type": "bingo",
        "content": {
          "def_id": payload.def_id        }
      }
      this.dispatch('do_send', msg)
    }
  },
  getters: {

  }
}
