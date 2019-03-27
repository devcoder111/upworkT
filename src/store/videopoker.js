
export const videopoker = {
  namespaced: true,
  state: {
    active_games: [],
    subscriptions: [],
    videopoker: []
  },
  mutations: {
    update_videopoker: function (state, items) {
      // gets called when we subscribes to the lottery - whole
      console.log('update_videopoker')
      state.active_games = items.tabs
      this.dispatch('videopoker/videopoker_subscribe', items.tabs)
    },
    update_videopoker_by_id: function (state, items) {
      // gets called for each specific game we are subscribed to
      var ref_id = items[0].SUBSCRIPTIONS.ref_id
      var location = items[1]._location_;
      for (var i=0; i < state.videopoker.length; i++){
        if (state.videopoker[i].ref_id == ref_id){
          state.videopoker[i].location = location
          // state.videopoker[i].lottery_game_results = items[1]
          // state.videopoker[i].lottery_defs = items[2]
          // state.videopoker[i].lottery_games = items[3]
          return
        }
      }
      // there is nothing to update -- add it to the array
      state.videopoker.push(
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
    }
  },
  getters: {

  }
}
