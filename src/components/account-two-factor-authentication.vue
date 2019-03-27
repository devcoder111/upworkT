<template>
  <div class="home my-deposit inner-modal">
    <!-- MY ACCOUNT TWO FACTOR AUTH -->
    <!-- This need to be arranged for two different views -- if 2FA enabled or not -->
      <account-nav></account-nav>
      <div id="account-content">
        <div class="form-info-left">
          <h2>Two-factor authentication (2FA)</h2>
            <div class="form-info centerShow">
              <p class="form-description">
                <label for="secret-key">2FA Retrieval Key:</label><br>
                <span class=" warning importantMsg">{{ secret_key }}</span>
              </p>
              <p>Enter you authenticator code here to enable.</p>
              <div class="-form-wrap form">
                <form action="" method="">
                  <div class="form-section">
                    <label for="ret-key-auth"></label>
                    <input v-model="auth_code" type="text" id="ret-key-auth" name="" placeholder="6 digit auth code" class="formField">
                  </div>
                  <div class="form-section button">
                    <button v-on:click="validate" type="submit" class="primaryButton">Validate & Enable</button>
                  </div>
                </form>
              </div>

            </div>
            <div class="sideShowRight">

              <qrcode v-model="qrcode" :options="{ size: 200 }"></qrcode>

            </div>
        </div>
        <div class="noticeWarningLeft">
          <p class="form-description warning importantMsg">Notice:</p>
          <div v-if="$store.state.account.client[0].qrcode">
            <p class="form-description">Two-factor authentication (2FA) adds a second level of authentication to your account. QuintoBTC applies 2FA to logins, withdrawals, transfers, and password changes at this time.</p>
          </div>
          <p class="form-description warning importantMsg">Important: Please write/store your 2FA retrieval key. This key is the <span class="caps">only</span> way to restore a lost 2FA. <br><br>
            <label for="secret-key">2FA Retrieval Key:</label><br>
            {{ secret_key }}</p>

        </div>
        <div class="clearBoth"></div>
      </div>
  </div>

</template>

<script>

  export default {
    name: 'account-2fa',
      data: function(){
        return {
          auth_code: ''
        }
      },
    created: function () {
    },
    computed: {
      qrcode: function () {
        return (this.$store.state.account.client[0].qrcode) ? this.$store.state.account.client[0].qrcode : ''
      },
      secret_key: function () {
        return (this.$store.state.account.client[0].totp_secret) ? this.$store.state.account.client[0].totp_secret : ''
      },
      using_2fa: function(){
        return this.$store.state.account.client[0].authentication == 'TOTP'
      }
    },
    methods: {
      validate: function(){
        if (this.auth_code.length != 6){
          this.$store.dispatch('alert_user', 'Enter exactly 6 digits, no spaces')
        } else {
          this.$store.dispatch('account/totp_authentication', parseInt(this.auth_code))
        }
      }
    },
    watch: {

    }
  }

</script>

<style>

  canvas{
    margin-bottom: 10px;
  }
</style>
