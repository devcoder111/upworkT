<template>
    <div>
      <account-nav></account-nav>
      <div id="account-content" class="form-info">
        <div class="form-info-left">
          <h2 class="form-modal-title">Change Email / Opt Out</h2>
          <div class="form-section">
            <label for="email-address">E-Mail Address: </label><br/>
            <input type="text"  id="email-address" v-model="email_address" class="formField formFieldExtra">
          </div>
          <div class="form-section">
            <label for="password">Password: </label><br/>
            <input type="password" id="password" v-model="password" class="formField formFieldExtra">
          </div>
          <div v-if="using_2fa">
            <div class="form-section">
              <label for="auth-2f" >2FA Code: </label><br/>
              <input type="text" id="auth-2f" v-model="auth2f" name="" class="fieldUnderQRCode formField formFieldExtra" value="">
            </div>
          </div>
          <div class="form-section">
            <input type="checkbox" id="email-optout" v-model="opt_out" v-bind="optout_state" checked="" name=""><label for="email-optout"> Opt Out</label>
          </div>
          <button class="primaryButton" @click="email_submit" type="button">Submit</button>
        </div>
        <div class="noticeWarningLeft">
          <p class="form-description warning importantMsg">Notice:</p>
          <p class="form-description">**Description of what this form does should go here.**</p>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'acct-email',
    data: function () {
      return {
        auth2f: '',
        pin: '',
        email_address: this.$store.state.account.client[0].email_address,
        password: '',
        opt_out: this.$store.state.account.client[0].email_opt_out
      }
    },
    computed: {
      using_2fa: function(){
        return this.$store.state.account.client[0].authentication === 'TOTP'
      },
      optout_state: function(){
        return this.$store.state.account.client[0].email_opt_out
      }

    },
    methods: {
      email_submit: function () {

        var payload = {
          'opt_out': !!this.opt_out,
        }
        if (this.email_address !== this.$store.state.account.client[0].email_address){
          payload['email_address'] = this.email_address
          payload['password'] = this.password
          if (this.using_2fa){
            payload['code'] = this.auth2f
          }
        }
        this.$store.dispatch('account/change_email', payload)
        this.password = ''
        this.auth2f = ''
      }
    },
    watch: {}
  }
</script>
