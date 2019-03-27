export const site = {
  namespaced: true,
  state: {
    site_info: []
  },
  mutations: {
    update: function (state, data) {
      state.site_info = data
    },
  },
  actions: {
  },
  getters: {
    ready: state => {
      return state.site_info.length > 0
    },
    lobby: state => {
      return (state.site_info.length) ? state.site_info[0].lobby : ''
    },
    getName: state => {
      return (state.site_info.length) ? state.site_info[0].name : ''
    },
    players: state => {
      return (state.site_info.length) ? state.site_info[0].player_count : ''
    },
    getPlayers: state => {
      return (state.site_info.length) ? state.site_info[0].player_count : ''
    },
    status: state => {
      return (state.site_info.length) ? state.site_info[0].status : ''
    }
  }
}
