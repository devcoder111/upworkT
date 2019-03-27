import Vue from 'vue'
import Router from 'vue-router'
// import Main from '@/components/Main'
import WebsiteBingo from '@/components/website-bingo'
import WebsiteLottery from '@/components/website-lottery'
import Website555Lotto from '@/components/website-555-lotto'
import WebsiteQuintoBTCLottery from '@/components/website-quintobtc-lottery'
import WebsiteQuintoBTCFaucet from '@/components/website-quintobtc-faucet'
import WebsiteScratcher from '@/components/website-scratcher'
// import Hello from '@/components/Hello'
import Home from '@/components/Home'
import WebsitePoker from '@/components/website-poker'

Vue.use(Router)

export default new Router({
  //mode: history,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/bingo',
      name: 'Bingo',
      component: WebsiteBingo
    },
    {
      path: '/lottery',
      name: 'Lottery',
      component: WebsiteLottery
    },
    {
      path: '/555-Lotto',
      name: 'Lotto',
      component: Website555Lotto
    },
    {
      path: '/QuintoBTC-Faucet',
      name: 'Faucet',
      component: WebsiteQuintoBTCFaucet
    },
    {
      path: '/poker',
      name: 'Poker',
      component: WebsitePoker
    },
    {
      path: '/scratcher',
      name: 'Scratcher',
      component: WebsiteScratcher
    }
  ]
})
