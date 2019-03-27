<template>
  <div class="inner-modal">
    <account-nav></account-nav>
    <div id="account-content" class="form-info">
      <h1 class="form-modal-title">Change Password</h1>
      <p class="form-description warning">Notice:</p>
      <p class="form-description">It is the account holder's responsibility to portect his or her account and to prevent unauthoized access. Creating a sophisticated password with upper adn lower case letters, symbols, numbers, and over 16+ charcters creates a strong password.</p>


      <div class="val-email-form-wrap form">
        <form class="val-email" action="" method="">
          <div class="form-section">
            <label for="pin_code">Pin Code</label><br />
            <input v-model="pin_code" type="" id="pin_code" name="">
          </div>

          <div class="form-section button">
            <button type="button" @click="verify_email" class="primaryButton">Validate</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'verify-email',
    data: function () {
      return {
        code:''
      }
    },
    computed: {
    },
    methods: {
      verify_email: function(){
        var payload = {
          'pin_code': this.pin_code
        }
        this.$store.dispatch('account/validate_email', payload);
      }
    }
  }
</script>
