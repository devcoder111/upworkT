import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { home } from './home'
import { login } from './login'
import { server } from './server'
import { lottery } from './lottery'
import { scratcher } from './scratcher'
import { bingo } from './bingo'
import { videopoker } from './videopoker'
import { account } from './account'
import { subscriptions } from './subscriptions'
import { tabs } from './tabs'
import { site } from './site'
import { jackpots } from './jackpots'

function find_table(t, row) {
  if (row.client){
    return {table: 'client', store: t.state.account, data: row.client, pkey: 'session_key'}
  } else if (row.client_balances){
    return {table: 'client_balances', store: t.state.account, data: row.client_balances, pkey: 'site_type'}
  } else if (row.user_params){
    return {table: 'user_params', store: t.state.account, data: row.user_params, pkey: 'ident'}
  } else if (row.logins){
    return {table: 'logins', store: t.state.account, data: row.logins, pkey: 'user_id'}
  } else if (row.lottery_defs){
    return {table: 'lottery_defs', store: t.state.lottery, data: row.lottery_defs, pkey: 'def_id'}
  } else if (row.lottery_games){
    //var x =datetimeIntoNext(row.lottery_games[0].draw_timestamp)
    return {table: 'lottery_games', store: t.state.lottery, data: row.lottery_games, pkey: 'game_id' }
  } else if (row.lottery_game_results) {
    return {table: 'lottery_game_results', store: t.state.lottery, data: row.lottery_game_results, pkey: 'game_id'}
  } else if (row.lottery_game_tickets){
    return {table: 'lottery_game_tickets', store: t.state.lottery, data: row.lottery_game_tickets, pkey: 'ticket_id' }
  } else if (row.lottery_tickets){
    return {table: 'lottery_tickets', store: t.state.lottery, data: row.lottery_tickets, pkey: 'ticket_id' }
  } else if (row.lottery_game_picks){
    return {table: 'lottery_game_picks', store: t.state.lottery, data: row.lottery_game_picks, pkey: 'ticket_id' }
  } else if (row.lottery_picks){
    return {table: 'lottery_picks', store: t.state.lottery, data: row.lottery_picks, pkey: 'ticket_id' }
  } else if (row.lottery_autowagers){
    return {table: 'lottery_autowagers', store: t.state.lottery, data: row.lottery_autowagers, pkey: 'def_id' }
  } else if (row.SUBSCRIPTIONS){
    return {table: 'subscriptions', store: t.state.subscriptions, data: row.SUBSCRIPTIONS, pkey: 'ref_id'}
  } else if (row.tabs){
    return {table: 'tabs', store: t.state.tabs, data: row.tabs, pkey: ''}
  } else if (row.scratchers){
    return {table: 'scratchers', store: t.state.scratcher, data: row.scratchers, pkey: 'batch_id'}
  } else if (row.scratcher_defs){
    return {table: 'scratcher_defs', store: t.state.scratcher, data: row.scratcher_defs, pkey: 'tab_name'}
  } else if (row.scratcher_batches){
    return {table: 'scratcher_batches', store: t.state.scratcher, data: row.scratcher_batches, pkey: 'batch_id'}
  } else if (row.scratcher_cells){
    return {table: 'scratcher_cells', store: t.state.scratcher, data: row.scratcher_cells, pkey: 'batch_id'}
  } else if (row.site_info){
    return {table: 'site_info', store: t.state.site, data: row.site_info, pkey: 'id'}
  } else if (row.jackpots){
    return {table: 'jackpots', store: t.state.jackpots, data: row.jackpots, pkey: 'descr'}
  } else if (row.bingo_autowagers){
    return {table: 'bingo_autowagers', store: t.state.bingo, data: row.bingo_autowagers, pkey: 'def_id'}
  } else if (row.bingo_calls){
    return {table: 'bingo_calls', store: t.state.bingo, data: row.bingo_calls, pkey: 'def_id'}
  } else if (row.bingo_cards){
    return {table: 'bingo_cards', store: t.state.bingo, data: row.bingo_cards, pkey: 'def_id'}
  } else if (row.bingo_defs){
    return {table: 'bingo_defs', store: t.state.bingo, data: row.bingo_defs, pkey: 'def_id'}
  } else if (row.bingo_games){
    return {table: 'bingo_games', store: t.state.bingo, data: row.bingo_games, pkey: 'def_id'}
  } else if (row.bitcoin_transactions){
    return {table: 'bitcoin_transactions', store: t.state.account, data: row.bitcoin_transactions, pkey: 'cashier_id'}
  } else {
    //alert('table not found: '+JSON.stringify(row));
    //console.log(row);
  }
  return false
}


const state = {
  socket: {
    isConnected: false,
  },
  sequence: 1,
  messaging: [],
  runtime: {
    is_running: false,
    logged_in: false,
    username: '',
    password: '',
    code: 0
  },
  user: {
    client: false,
    client_balances: false,
    user_params: false,
    logins: false
  }

}

const getters = {
  datetimeIntoCountdown: (state) => (dt) => {

    var t = dt.split(/[- :]/)

    var dateFuture = new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5]))
    var dateNow = new Date()

    var seconds = Math.floor((dateFuture - (dateNow))/1000)
    var minutes = Math.floor(seconds/60)
    var hours = Math.floor(minutes/60)
    var days = Math.floor(hours/24)

    hours = hours-(days*24);
    minutes = minutes-(days*24*60)-(hours*60);
    seconds = seconds-(days*24*60*60)-(hours*60*60)-(minutes*60);

    if (days){
      return days +  ' Days ' + hours + ' Hours ' + minutes + ' Mins ' + seconds + ' Secs'
    }
    if (hours){
      return hours + ' Hours ' + minutes + ' Mins ' + seconds + ' Secs'
    }
    if (minutes){
      return minutes + ' Mins ' + seconds + ' Secs'
    }
    return seconds + ' Seconds'
  }
}

const mutations = {
  login (state) {
    this.dispatch('player_login')
  },
  signup (state, payload) {
    this.dispatch('player_signup', payload)
  },
  subscribe(state, game){
    this.dispatch('do_subscribe',game)
  },
  subscribe_lobby(state){
    for (var i = 0; i < state.site.lobby.length; i++) {
      this.dispatch('do_subscribe',state.site.lobby[i].ref_id)
    }
  },
  update_subscriptions(state, record){
    state.site.subscriptions.push(record.ref_id)
  },
  update_tabs(state, tabs){
    var quiet = true
    if (!quiet) console.log('adding tabs: ' + tabs.tabs[0].parent_name)
    if (tabs.mode == 'UPDATE'){
      console.log('need to handle updates')
      return
    }
    var game = false;
    switch (tabs.tabs[0].parent_name.toLowerCase()){
      case "lottery":
        game = state.site.lottery
        break
      case "bingo":
        game = state.site.bingo
        break
      default:
        console.log('update_tabs -- game not handled ' + tabs.tabs[0].parent_name)
        return
    }
    // todo check for insert or not
    game.tabs = tabs.tabs;
  },
  SOCKET_ONOPEN: function (state, event) {
    this.dispatch('open_session')
  },
  SOCKET_ONCLOSE (state, event) {
    this.$swal2('Socket closed -- please reload the page')
  },
  SOCKET_ONERROR (state, event) {
    console.error()
  },
  SOCKET_ONMESSAGE (state, message) {
    var u8  = new Uint8Array(message.data)
    var str = String.fromCharCode.apply(null, u8)
    var msgObj = JSON.parse(str)
    if (msgObj.reply_id){
      // here if these are replies to messages we sent
      // sometimes these need special handling
      var msg_type = state.messaging[msgObj.reply_id]
      console.log('reply: ' + msg_type)
      if (msgObj.error) {
        this.$swal2(msgObj.error.reason)
        return
      }
      var content = (Array.isArray(msgObj.content)) ? msgObj.content : [ msgObj.content ]
      console.log(content)
      //console.log(JSON.stringify(content))

      this.dispatch('db_process', content)
      switch (msg_type) {
        case 'open_session':
          this.dispatch('handle_open_session')
          break;
        case 'subscribe':
          this.dispatch('handle_subscribe', {content: content})
          break;
        case 'tabs':
          break;
        case 'player_login':
          state.runtime.logged_in = true
          break;
        case 'player_signup':
          state.runtime.logged_in = true
          break;
      }
    } else {
      var content = (Array.isArray(msgObj.content)) ? msgObj.content : [ msgObj.content ]
      this.dispatch('db_process', content)
    }
  }
}

const actions = {
  alert_user(context, message){
    this.$swal2(message)
  },
  logout(context){
    
  },
  dialog_login(context){
    var self = this
    this.$swal2({
      title: 'Login',
      html:
      'User name: <span class="user-name">user name: <input type="text" id="swal-name"></span><br>' +
      'Password: <span class="user-pw">password: <input type="password" id="swal-password"></span><br>' +
      '2FA Code: <span class="user-name"><input type="text" id="swal-2fa" placeholder="optional"></span>',
      focusConfirm: false,
      preConfirm: function () {
        return new Promise(function (resolve, reject) {
          if (document.getElementById("swal-name").value == ''){
            reject('A user name is required')
          } else if (document.getElementById("swal-password").value == '') {
            reject('A password is required')
          } else {
            resolve([
              document.getElementById("swal-name").value,
              document.getElementById("swal-password").value,
              document.getElementById("swal-2fa").value
            ])
          }
        })
      }
    }).then(function (result) {
      self.state.runtime.username = result[0]
      self.state.runtime.password = result[1]
      self.state.runtime.code = result[2]
      self.dispatch('login')
    }).catch(self.$swal2.noop)
  },
  dialog_signup(context){
    var self = this
    this.$swal2({
      title: 'Sign-up',
      html:
      '<p>Please DO NOT sign-up more than once. Multiple sign-ups will result in the forfeiture for all accounts,</p>' +
      '<p>A valid E-Mail address is required to participate in our rewards program; An E-Mail validation PIN will be sent, if an E-Mail is supplied.</p>' +
      'User name: <span class="user-name"><input type="text" id="signup-name"></span><br>' +
      'Password: <span class="user-pw"><input type="password" id="signup-password"></span><br>' +
      'Confirm Password: <span class="user-pw"><input type="password" id="signup-confirm"></span><br>' +
      'Email: <span class="user-name">user name: <input type="text" id="signup-email" placeholder="optional"></span><br>',
      focusConfirm: false,
      preConfirm: function () {
        return new Promise(function (resolve, reject) {
          if (document.getElementById("signup-name").value == ''){
            reject('A user name is required')
          } else if (document.getElementById("signup-password").value == '') {
            reject('A password is required')
          } else if (document.getElementById("signup-password").value != document.getElementById("signup-confirm").value) {
            reject('Password mismatch')
          } else {
            resolve([
              document.getElementById('signup-name').value,
              document.getElementById('signup-password').value,
              document.getElementById('signup-email').value
            ])
          }
        })
      }
    }).then(function (result) {
      self.dispatch('signup', {name: result[0], password: result[1], email: result[2]})
    }).catch(self.$swal2.noop)
  },
  db_process(context, rows){
    for (var i=0; i < rows.length; ++i){
      var payload = find_table(this, rows[i])
      var indexes = [];
      if (!payload){
        // slip what we are not handling
        return
      }
      switch (rows[i].mode.toLowerCase().trim()){
        case 'insert':
          // insert into tables -- they should not exist
          if (!Array.isArray(payload.store[payload.table])){
            payload.store[payload.table] = []
          }
          if (!Array.isArray(payload.data)){
            console.log(payload);
            console.log(payload.table);
            console.log(payload.store[payload.table]);
            payload.store[payload.table].push(payload.data)
          } else {
            payload.store[payload.table].push.apply(payload.store[payload.table],payload.data)
          }
          break
        case 'update':
          // update these tables - member by member
          if (payload.pkey){
            // single items are not in an array -- general use requires everything be in an array
            if (!payload.store[payload.table]){
              payload.store[payload.table] = []
            }
            if (!Array.isArray(payload.data)){
              payload.data = [ payload.data ]
            }
            for (var j=0; j < payload.data.length; j++) {
              var row = payload.data[j]
              for (var k = 0; k < payload.store[payload.table].length; k++) {
                if (payload.store[payload.table][k][payload.pkey] == row[payload.pkey]) {
                  for (var propertyName in row) {
                    payload.store[payload.table][k][propertyName] = row[propertyName]
                  }
                }
              }
            }
          }
          break
        case 'merge':
          // update if payload.data rows are in the table - merge each table -- if table missing insert whole table
          if (payload.pkey){
            // single items are not in an array -- general use requires everything be in an array
            if (!payload.store[payload.table]){
              payload.store[payload.table] = []
            }
            if (!Array.isArray(payload.data)){
              payload.data = [ payload.data ]
            }
            for (var j=0; j < payload.data.length; j++) {
              var row = payload.data[j]
              for (var k = 0; k < payload.store[payload.table].length; k++) {
                if (payload.store[payload.table][k][payload.pkey] == row[payload.pkey]) {
                  for (var propertyName in row) {
                    payload.store[payload.table][k][propertyName] = row[propertyName]
                  }
                  break
                }
              }
              if (k == payload.store[payload.table].length){
                // no update -- insert
                payload.store[payload.table].push(row)
              }
            }
          }
          break
        case 'delete':
          if (payload.pkey) {
            console.log('delete');
            payload.store[payload.table] = payload.store[payload.table].filter(function(row){
              return (row[payload.pkey] != payload.data[payload.pkey])
            });
          }
          break
        case 'remove':
          if (payload.pkey) {
            console.log('remove');
            payload.store[payload.table] = payload.store[payload.table].filter(function(row){
              return (row[payload.pkey] != payload.data[payload.pkey])
            });
          }
          break
      }
    }
  },
  db_get_table(context, row){

  },
  login ({commit}){
    commit('login')
  },
  signup (context,payload){
    context.commit('signup', payload)
  },
  select_game(context, game){
    // status we may not select games in favor of subscribing to all
  },
  // these are called from messages rcv'd in mutations
  handle_subscribe(context, message){
    for (var item of message.content) {
      if (item.tabs){
        if (item.mode == 'INSERT') {
          if (item.tabs[0].parent_name == 'LOTTERY') {
            this.dispatch('tabs/subscribe_lottery')
            return
          } else if (item.tabs[0].parent_name == 'BINGO') {
            //this.dispatch('tabs/subscribe_bingo')
            return
          } else if (item.tabs[0].parent_name == 'VIDEOPOKER') {
            this.dispatch('tabs/subscribe_videopoker')
            return
          }
        }
      }
    }
  },
  handle_open_session(context, message){
    context.state.runtime.is_running = true
    this.dispatch('tabs/subscribe_lobby')
  },
  handle_new_jackpots(context, jackpots){
    var quiet = true
    if (!quiet) console.log('handle new jackpots: ' + jackpots.length)
    jackpots = jackpots.jackpots

    for (var i=0; i < jackpots.length; ++i){
      context.commit('updateJackpot', {jackpot: jackpots[i]})
    }
  },
  // below here are all messages we send to the backend
  player_login(){
    console.log('login-here');
    var seq = state.sequence++
    state.messaging[seq] = 'player_login'
    var msg = {
      'msg_id': seq,
      'msg_type': 'player_login',
      'content': {
        'password': state.runtime.password,
        'name': state.runtime.username
      }
    }
    if (state.runtime.code){
      msg.content.code = parseInt(state.runtime.code);
    }
    var os = JSON.stringify( msg )
    this.$socket.send(os)
  },
  player_logout(){
    var seq = state.sequence++
    state.messaging[seq] = 'player_logout'
    var os =
      JSON.stringify({
        'msg_id': seq,
        'msg_type': 'player_logout',
        'content': {
        }
      })
    this.$socket.send(os)
  },
  player_signup(context, payload){
    var seq = state.sequence++
    state.messaging[seq] = 'player_signup'
    var msg = {
      'msg_id': seq,
      'msg_type': 'player_signup',
      'content': {
        'password': payload.password,
        'name': payload.name
      }
    }
    if (payload.email){
      msg.content.email_address = payload.email
    }
    var os = JSON.stringify( msg )
    this.$socket.send(os)
  },
  open_session(){
    var seq = state.sequence++
    state.messaging[seq] = 'open_session'
    var os =
      JSON.stringify({
        'msg_id': seq,
        'msg_type': 'open_session',
        'content': {
          'site': 'BTC',
          'user_agent': 'AS3'
        }
      })
    this.$socket.send(os)
  },
  do_subscribe(context, refId){
    var quiet = true
    if (!quiet) console.log('do subscribe: ' + refId)

    var seq = state.sequence++
    state.messaging[seq] = 'subscribe'
    var os = JSON.stringify({
      'msg_id': seq,
      'msg_type': 'subscribe',
      'content': {
        'ref_id': refId
      }
    })
    this.$socket.send(os)
  },
  do_send(context, payload){
    console.log(payload);
    var seq = state.sequence++
    state.messaging[seq] = payload.msg_type
    payload.msg_id = seq
    var os = JSON.stringify(payload)
    this.$socket.send(os)
  }



}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    home,
    login,
    server,
    lottery,
    scratcher,
    bingo,
    videopoker,
    account,
    subscriptions,
    tabs,
    site,
    jackpots
  }
})

function stringIntoArray(str)
{
  // I can't help but think I didn't quite understand what you wanted here.
  return str.split(',');
}



function datetimeIntoNext(dt)
{
  var t = dt.split(/[- :]/)

  var dateFuture = new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5]))
  //console.log(dateFuture)
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
