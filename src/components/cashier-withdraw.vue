<template xmlns="http://www.w3.org/1999/html">
    <div class="home my-deposit inner-modal">
        <account-nav></account-nav>
        <div id="account-content">
            <div class="form-info-left">
                <h2>Withdrawal</h2>
                <div class="btc-withdrawal-amount-form-wrap centerShow">
                    <div class="form-section">
                        <label for="withdrawal_amount">Amount (bits)</label><br />
                        <input type="" v-model="withdrawal_amount" class="formField"><br />

                    </div>
                    <div class="form-section">
                        <label for="withdrawal_to_address">Receiving Address</label><br />
                        <input type="text" v-model="default_address" class="formField"><br />
                      <div class="checkboxBelowForm">
                          <input id="rememberThisAddressCheckbox" type="checkbox" v-model="remember_withdrawal_to_address" checked="remember_only_checked" name=""
                             value="">
                          <label for="rememberThisAddressCheckbox">Remember this address</label>
                      </div>

                    </div>
                  <div v-if="using_2fa">
                    <div class="form-section">
                      <label for="auth-2f" >2FA Code</label><br>
                      <input type="text" v-model="auth2f" id="auth-2f" name="" class="fieldUnderQRCode">
                    </div>
                  </div>

                  <button @click="bitcoin_withdrawal" type="button" value="Withdraw" class="primaryButton">Withdraw</button>
                </div>
            </div>
            <div class="noticeWarningLeft">
                <div class="form-info">
                    <p class="withdraw-balance-label warning importantMsg">Withdrawable Balance:</p>
                    <p class="withdraw-balance">{{account_balance}}</p>
                    <p>&nbsp;</p>
                    <p class="withdraw-balance-label warning importantMsg"><span>Withdrawal Fee: </span></p>
                    <p>{{withdrawal_fee}}</p>
                </div>
            </div>

            <div class="clearBoth"></div>
        </div>

        <div class="home my-withdraw">
        </div>
    </div>
</template>

<style scoped>
    input[type="checkbox"]{
        margin-top:3px;

    }
</style>

<script>
    export default {
        data: function () {
            return {
              auth2f: '',
              withdrawal_amount: 0,
              withdrawal_to_address: '',
              remember_withdrawal_to_address: ''
            }
        },
        computed: {
          account_balance: function () {
              return this.$store.state.account.client_balances ? this.$store.state.account.client_balances[0].balance_text : '';
          },
          withdrawal_fee: function () {
              return this.$store.state.account.client_balances ? this.$store.state.account.client_balances[0].fee_text : '';
          },
          using_2fa: function(){
            return this.$store.state.account.client[0].authentication == 'TOTP'
          },
          default_address: function () {
            for (var i=0; i < this.$store.state.account.user_params.length; i++){
              if (this.$store.state.account.user_params[i].ident == 'remember_withdrawal_address'){
                var addr = this.$store.state.account.user_params[i].value
                return addr
              }
            }
            return ''
          }
        },
        methods: {
          bitcoin_withdrawal: function () {
            if (this.remember_withdrawal_to_address){
              this.$store.dispatch('account/write_param', {ident: 'remember_withdrawal_address', value: this.withdrawal_to_address, section: 'withdraw'})
            }


            var payload = {
              'amount': this.withdrawal_amount.trim(),
              'to_address': this.withdrawal_to_address.trim()
            }
            if (this.using_2fa){
              if (!this.auth2f){
                this.$store.dispatch('alert_user', 'Please enter your 2FA code')
                return
              }
              payload['code'] = this.auth2f.trim()
            }
            this.$store.dispatch('account/bitcoin_withdrawal', payload)
            this.withdrawal_amount = ''
            this.withdrawal_to_address = ''
            this.remember_withdrawal_to_address = ''
          }

      }
    }

</script>
