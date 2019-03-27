<template>
    <div class="home my-deposit inner-modal">
        <account-nav></account-nav>
        <div id="account-content">
            <div class="form-info-left">
                <h2>Transfer</h2>

                <div class="form-section">
                    <label>Amount (mBTC)</label><br />
                    <input v-model="amount" class="formField">
                </div>
                <div class="form-section">
                    <label>Player Name </label><br />
                    <input v-model="member_name" class="formField">
                </div>
                <div v-if="using_2fa">
                    <div class="form-section">
                        <label for="auth-2f" >2FA Code</label><br>
                        <input type="text"  id="auth-2f" v-model="auth2f" name="" class="fieldUnderQRCode" value="">
                    </div>
                </div>
                <button @click="bitcoin_transfer()" class="primaryButton">Transfer</button>
            </div>
            <div class="noticeWarningLeft">
                <p class="withdraw-balance-label warning importantMsg">Balance:</p>
                <p>{{ account_balance }}</p>
                <p>&nbsp;</p>
                <p class="form-description warning importantMsg">Notice:</p>
                <p class="form-description">Transferred funds to another player's account are not refundable. You can only transfer to another player if all deposit confirmation are completed.</p>
                <p class="form-description">You must type the player's name exactly as it appears on your screen including and special characters that my be present.</p>
            </div>


        </div>

    </div>
</template>

<script>
  export default {
    name: 'home',
    data: function () {
      return {
        amount: '',
        member_name: '',
        auth2f: ''
      }
    },
    computed: {
      using_2fa: function(){
        return this.$store.state.account.client[0].authentication == 'TOTP'
      },
      account_balance: function () {
          return this.$store.state.account.client_balances ? this.$store.state.account.client_balances[0].balance_text : '';
      }
    },
    methods: {
        bitcoin_transfer: function () {
          if (this.using_2fa && !this.auth2f.trim().length){
            this.$store.dispatch('alert_user', 'Please enter your 2FA code')
            return
          }
          var payload = {
                "member_name": this.member_name,
                "amount": this.amount,
            }
            if(this.using_2fa){
                payload['code'] = this.auth2f
            }
            this.$store.dispatch('account/bitcoin_transfer', payload)
            this.member_name = ''
            this.amount = ''
            this.auth2f = ''
        }
    },
    watch: {}
  }
</script>

<style>

</style>
