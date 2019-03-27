<template>
    <div class="home my-deposit inner-modal">
            <account-nav></account-nav>
            <div id="account-content">
                <div class="form-info-left">
                    <h2>Deposit</h2>
                    <div class="form-info centerShow">
                    </div>
                    <div class="bitcoin-form-wrap form sideShowRight">
                        <div class="rightSide"><qrcode v-model="qrcode" :options="{ size: 200 }" style="padding-bottom: 16px;"></qrcode></div>
                        <div class="form-section">
                            <label for="bitcoin-address" >Current Address: </label><br/>
                            <input type="text"  id="bitcoin-address" v-model="bitcoin_address" name="" class="fieldUnderQRCode formField" value="QRcodeCopyable3939" readonly="readonly" >
                            {{ bitcoin_address }}

                        </div>
                      <div class="form-section button">
                            <button type="button" @click="bitcoin_request_address()" class="primaryButton">Request New Bitcoin Address</button>
                        </div>
                    </div>

                </div>
                <div class="noticeWarningLeft">
                    <p class="form-description warning importantMsg">Notice:</p>
                    <p class="form-description">Deposited funds are credited to your account after one confirmation. Funds
                        become withdrawable after six confirmations.</p>
                    <p class="form-description">Time for one confirmation can vary widely, but averages about 10 minutes</p>
                </div>
            </div>


        <table>
            <tr v-for="transaction in transactions"><td>{{ transaction.address }}</td><td>{{ transaction.amount_text }}</td><td>{{ transaction.cashier_id }}</td><td>{{ transaction.status }}</td><td>{{ transaction.time_since }}</td><td>{{ transaction.txn_type }}</td></tr>
        </table>
    </div>
</template>

<script>

    export default {
        name: 'home',
        computed: {
            bitcoin_address: function () {
                return this.$store.state.account.client[0].deposit_addr ? this.$store.state.account.client[0].deposit_addr : '';
            },
            transactions: function(){
                return this.$store.state.account.bitcoin_transactions;
            },
            qrcode: function () {
              return (this.$store.state.account.client[0].qrcode) ? this.$store.state.account.client[0].qrcode : ''
            },
            using_2fa: function(){
              return this.$store.state.account.client[0].authentication == 'TOTP'
            }
        },
        methods: {
            bitcoin_request_address: function () {
              return this.$store.dispatch('account/bitcoin_request_address');
            }
        },
        watch: {}
    }

</script>
