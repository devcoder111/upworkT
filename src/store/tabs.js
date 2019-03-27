export const tabs = {
  namespaced: true,
  state: {
    tabs: []
    /*
    CREATE TABLE  tabs (
      parent_name varchar(25)  not null,
      tab_name    varchar(25)  not null,
      tab_descr   varchar(25)  not null,
      ord         int     not null,
      layout      varchar(10),
      ref_id      bigint,

      outstanding   boolean default false,

      primary key tabs_pk (parent_name, tab_name)
    );
     */
  },
  mutations: {
  },
  actions: {
    subscribe_lobby(context){
      for (var i = 0; i < context.state.tabs.length; i++) {
        if (context.state.tabs[i].parent_name == 'LOBBY'){
          context.dispatch('do_subscribe',context.state.tabs[i].ref_id)
        }
      }
    },
    subscribe_lottery(context){
      for (var i = 0; i < context.state.tabs.length; i++) {
        if (context.state.tabs[i].parent_name == 'LOTTERY'){
          context.dispatch('do_subscribe',context.state.tabs[i].ref_id)
        }
      }
    },
    subscribe_bingo(context){
      for (var i = 0; i < context.state.tabs.length; i++) {
        if (context.state.tabs[i].parent_name == 'BINGO'){
          context.dispatch('do_subscribe',context.state.tabs[i].ref_id)
        }
      }
    },
    subscribe_videopoker(context){
      for (var i = 0; i < context.state.tabs.length; i++) {
        if (context.state.tabs[i].parent_name == 'VIDEOPOKER'){
          context.dispatch('do_subscribe',context.state.tabs[i].ref_id)
        }
      }
    },
    do_subscribe: function (context, ref_id) {
      // payload: def_id (string), pick(string), box(bool-optional)
      var msg = {
        "msg_id": '0',
        "msg_type": "subscribe",
        "content": {
          "ref_id": ref_id
        }
      }
      this.dispatch('do_send', msg)
    }
  },
  getters: {
  }
}
