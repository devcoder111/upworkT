<template>
    <div>
        <account-nav></account-nav>

        <div id="account-content" class="inner-modal">
            <div class="form-info form-info-left">
                <h2 class="form-modal-title">BTC Emergency Address</h2>
                <div class="BTC-ea-form-wrap form">
                    <form action="" method="">
                        <div class="form-section">
                            <label for="btc-emergency-address">Bitcoin Emergency Address:</label><br/>
                            <input v-model="address" id="btc-emergency-address" class="formField">
                        </div>
                        <div class="form-section-no-space">
                            <input v-model="addrchangeable" type="checkbox" id="addr_changeable"
                                   :checked="addrchangeable" name="" value="">
                            <label for="addr_changeable">Do NOT allow address change (RECOMMENDED)</label>
                        </div>
                        <div class="form-section">
                            <input v-model="withdrawalonly" type="checkbox" id="withdrawal_only"
                                   :checked="withdrawalonly" name="" value="">
                            <label for="withdrawal_only">Use this as withdrawal address only</label>
                        </div>
                        <div class="form-section button">
                            <button type="button primaryButton" @click="bitcoin_emergency_address()" class="primaryButton">Save</button>
                        </div>
                    </form>
                </div>

            </div>
            <div class="noticeWarningLeft">
                <p class="form-description warning importantMsg">Notice:</p>
                <p class="form-description">If, for any unforeseen reason, we need to return funds to a member, we ask
                    that all members provide and keep an emergency Bitcoin on file.</p>
                <p class="form-description">We recommend selecting "Do NOT allow changes once set" for our members'
                    personal protection</p>
            </div>
        </div>


    </div>
</template>

<style>

</style>

<script>
    export default {
        name: 'emergency',
        data: function () {
            return {
                address: '',
                addrchangeable: '',
                withdrawalonly: ''
            }
        },
        methods: {
            bitcoin_emergency_address: function () {
                this.$store.dispatch('account/bitcoin_emergency_address', {
                    "address": this.address,
                    "changeable": this.addrchangeable ? false : true,
                    "withdrawalonly": this.withdrawalonly ? true : false
                })
            }
        }
    }
</script>
