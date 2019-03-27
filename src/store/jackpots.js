export const jackpots = {
  namespaced: true,
  state: {
    index: 0,
    jackpots: []
  },
  mutations: {
    nextJackpot(state){
      if (state.jackpots && state.jackpots.length > 0){
        state.index++
        if (state.index >= state.jackpots.length){
          state.index = 0
        }
      }
    }
  },
  actions: {
  },
  getters: {
    curName: state => {
      if (!state.jackpots.length){
        return ''
      }
      if (state.index >= state.jackpots.length){
        state.index = 0
      }
      return state.jackpots[ state.index ].descr
    },
    curAmt: state => {
      if (!state.jackpots.length){
        return ''
      }
      if (state.index >= state.jackpots.length){
        state.index = 0
      }
      return state.jackpots[ state.index ].jackpot_amt
    }
  }
}

