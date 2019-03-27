export const login = {
  namespaced: true,
  state: {
    logged_in: false,
    user: 'default',
    password: '',
    photo: '',
    signUpOrLogin: 'login'
  },
  getters: {
    LoginMessage: state => state.logged_in ? state.user : 'please log in',
    UserName: state => {
      console.log('state.account');
      console.log(state.account);
      if(state.account){
        return state.account.client[0].user_name;
      }
    }
  },
  mutations: {
    SetUser(state, name){
      state.user = name
    },
    SetPass(state, pass){
      console.log(' ('+pass+')');
      state.password = pass
    }

  },
  actions: {
    SetUser: ({commit}, name) => commit('SetUser', name),
    SetPass: ({commit}, pass) => commit('SetPass', pass),
    Login (){
      do_backend_login();
    }
  }
}

