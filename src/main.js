// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
require('./assets/css/theme.css')
require('./assets/css/contact-form.css')
require('./assets/css/font-awesome.css')
require('./assets/css/grid.css')
require('./assets/css/ie.css')
require('./assets/css/owl.carousel.css')
require('./assets/css/reset.css')
require('./assets/css/stuck-menu.css')
require('./assets/css/style.css')
require('./assets/css/superfish-menu.css')
require('./assets/css/ui.totop.css')
require('./assets/css/variables.css')

require('./assets/css/theme.css')
require('../node_modules/normalize.css')
require('./assets/css/docs.min.css')


import Vue from 'vue'
import VueCarousel from 'vue-carousel'
import VueWebsocket from "vue-native-websocket"
import VModal from 'vue-js-modal'
import VueSweetalert2 from "vue-sweetalert2"
import App from './App'
import router from './router'
import store from './store/store'
import CbmHeader from '@/components/cbm-header'
import CbmFooter from '@/components/cbm-footer'

import PageHeader from '@/components/pageheader'
import WebsiteGamemenu from '@/components/website-gamemenu'
import WebsitePokerMenu from '@/components/website-pokermenu'
import WebsiteScratcherMenu from '@/components/website-scratchermenu'
import WebsiteTopMenu from '@/components/website-topmenu'
import VueQrcode from '@xkeshi/vue-qrcode'

import Website555Lotto from '@/components/website-555-lotto'
import WebsiteQuintoBTCFaucet from '@/components/website-quintobtc-faucet'
import WebsiteQuintoBTCLottery from '@/components/website-quintobtc-lottery'


import ModalContainer from '@/components/modal-container'
import ModalContent from '@/components/modal-content'
import ModalInfo from '@/components/modal-info'
import ModalNav from '@/components/modal-nav'
import MyOverviewmodal from '@/components/modal-content-default'

import ModalLogin from '@/components/modal-login'

import AccountBtcEmergencyAddress from '@/components/account-btc-emergency-address'
import AccountEmail from '@/components/account-email'
import AccountNav from '@/components/account-nav'
import AccountPassword from '@/components/account-password'
import AccountProvablyFair from '@/components/account-provably-fair'
import AccountTwoFactorAuthentication from '@/components/account-two-factor-authentication'

import CashierDeposit from '@/components/cashier-deposit'
import CashierHistory from '@/components/cashier-history'
import CashierTransfer from '@/components/cashier-transfer'
import CashierWithdraw from '@/components/cashier-withdraw'

import GameLottery from '@/components/game-lottery'
import GameLotteryPicksPurchase from '@/components/game-lottery-pickspurchase'
import GameLotteryResults from '@/components/game-lottery-results'
import GameLotteryInfo from '@/components/game-lottery-info'

import GameBingo from '@/components/game-bingo'

import GameScratcher from '@/components/game-scratchers'

import GamePokerJB from '@/components/game-poker-jb'
import GamePokerNB from '@/components/game-poker-nb'
import GamePokerBD from '@/components/game-poker-bd'
import GamePokerDB from '@/components/game-poker-db'
import GamePokerTDB from '@/components/game-poker-tdb'



Vue.use(VModal)
Vue.use(VueSweetalert2)
Vue.use(VueCarousel)
store.$swal2 = Vue.prototype.$swal


var ws = new WebSocket("ws://ws.qa.quintobtc.com:7252")
ws.binaryType = "arraybuffer"

Vue.use(VueWebsocket, "ws://ws.qa.quintobtc.com:7252", {store, WebSocket: ws})
store.$socket = Vue.prototype.$socket

Vue.component('cbm-header', CbmHeader)
Vue.component('cbm-footer', CbmFooter)
Vue.component('modal-content', ModalContent)
Vue.component('modal-nav', ModalNav)
Vue.component('modal-info', ModalInfo)
Vue.component('website-gamemenu', WebsiteGamemenu)
Vue.component('website-pokermenu', WebsitePokerMenu)
Vue.component('website-scratchermenu', WebsiteScratcherMenu)
Vue.component('website-topmenu', WebsiteTopMenu)
Vue.component('pageheader', PageHeader)

Vue.component('website-555-lotto', Website555Lotto)
Vue.component('website-quintobtc-faucet', WebsiteQuintoBTCFaucet)
Vue.component('website-quintobtc-lottery', WebsiteQuintoBTCLottery)

Vue.component('account-btc-emergency-address', AccountBtcEmergencyAddress)
Vue.component('account-email', AccountEmail)
Vue.component('account-nav', AccountNav)
Vue.component('account-password', AccountPassword)
Vue.component('account-provably-fair', AccountProvablyFair)
Vue.component('account-two-factor-authentication', AccountTwoFactorAuthentication)

Vue.component('cashier-deposit', CashierDeposit)
Vue.component('cashier-history', CashierHistory)
Vue.component('cashier-transfer', CashierTransfer)
Vue.component('cashier-withdraw', CashierWithdraw)

Vue.component('game-lottery', GameLottery)
Vue.component('game-lottery-results', GameLotteryResults)
Vue.component('game-lottery-info', GameLotteryInfo)
Vue.component('game-lottery-pickspurchase', GameLotteryPicksPurchase)

Vue.component('game-bingo', GameBingo)

Vue.component('game-scratchers', GameScratcher)

Vue.component('game-poker-jb', GamePokerJB)
Vue.component('game-poker-nb', GamePokerNB)
Vue.component('game-poker-db', GamePokerDB)
Vue.component('game-poker-bd', GamePokerBD)
Vue.component('game-poker-tdb', GamePokerTDB)

Vue.component('modal-container', ModalContainer)
Vue.component('myoverviewmodal', MyOverviewmodal)
Vue.component('modal-login',ModalLogin)

Vue.component('qrcode', VueQrcode);

Vue.directive('focus', { inserted: function (el) { el.focus() } })

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  methods: {
  }
})

// This updates the Jackpots in the header

setInterval(() => {
  store.commit('jackpots/nextJackpot')
}, 3000);
