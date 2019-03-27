<template>
<div class="inner-modal">
    <account-nav></account-nav>
    <div id="account-content" class="form-info">
        <div class="chg-pw-form-wrap form form-info-left">
            <h2 class="form-modal-title">Change Password</h2>
            <form class="chg-pw" action="" method="">
                <div class="form-section">
                    <label for="chg-pw-crt-pw">Enter Current Password</label><br />
                    <input v-model="old_password" type="" id="old_password" name="">
                </div>
                <div class="form-section">
                    <div class="microGapBelow">
                        <label for="new-pw">Enter New Password</label><br />
                        <input v-model="new_password" type="new-pw" id="new_password" name="">
                    </div>
                    <label for="new-pw">Enter New Password Again</label><br />
                    <input v-model="confirm_password" type="new-pw2" id="confirm_new_password" name="">
                </div>
              <div v-if="using_2fa">
                <div class="form-section">
                  <label for="auth-2f" >2FA Code</label><br>
                  <input type="text"  id="auth-2f" v-model="auth2f" name="" class="fieldUnderQRCode" value="">
                </div>
              </div>

              <div class="form-section button">
                    <button type="button" @click="change_password()" class="primaryButton">Change Password</button>
                </div>
            </form>
        </div>
        <div class="noticeWarningLeft">
            <p class="form-description warning importantMsg">Notice:</p>
            <p class="form-description">It is the account holder's responsibility to protect his or her account and to prevent unauthorized access. Creating a sophisticated password with upper and lower case letters, symbols, numbers, and over 16+ characters creates a strong password.</p>
        </div>
    </div>
</div>
</template>

<style>
    .microGapBelow{
        display: block;
        padding-bottom: 8px;
    }
</style>

<script>
    export default {
      data: function () {
        return {
          auth2f: '',
            old_password: '',
            new_password: '',
            confirm_password: '',
        }
      },
      computed: {
        using_2fa: function(){
          return this.$store.state.account.client[0].authentication == 'TOTP'
        }
      },
      methods: {
        change_password: function(){
          if (!this.old_password.trim().length){
            this.$store.dispatch('alert_user', 'Password required')
            return;
          }
          if (!this.new_password.trim().length || this.new_password != this.confirm_password){
            this.$store.dispatch('alert_user', 'Passwords do not match')
            return
          }
          var payload = {
            'new_password': new_password.value,
            'old_password': old_password.value
          }
          if (this.using_2fa){
            if (!this.auth2f){
              this.$store.dispatch('alert_user', 'Please enter your 2FA code')
              return
            }
            payload['code'] = this.auth2f
          }
          this.$store.dispatch('account/change_password', payload);
          this.old_password = ''
          this.new_password = ''
          this.confirm_password = ''
          this.auth2f = ''
        }
      }
    }
</script>
