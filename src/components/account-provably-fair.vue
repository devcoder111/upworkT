<template>
    <div>
        <account-nav></account-nav>
        <div  id="account-content"  class="inner-modal">
            <div class="form-info-left">
                <h2>Probably Fair</h2>
                <div class="chg-pw-form-wrap form">
                    <div class="form-section">
                        <label for="new-pw">Client Phrase - 64 Character Limit</label><br />
                        <input class="formField" v-model="client_phrase"><br />
                        <button @click="change_client_phrase()" class="primaryButton" style="margin-top: 6px;">Submit</button>
                    </div>
                    <div class="form-section">
                        <label for="new-pw">Server Seed SHA-256 Hash</label><br />{{ current_seed }} <br />
                        <button class="primaryButton">Reveal Seed</button><br />
                    </div>
                    <div class="formAreaRight">
                        Nonce {{ nonce }}
                    </div>

                    <div class="form-section">
                        <label for="new-pw">Old Encrypted Hash</label><br />
                        {{ old_hash }}
                    </div>
                    <div class="form-section">
                        <label for="new-pw">Server Seed</label><br />
                        {{ server_seed }}
                    </div>
                </div>
                <div class="clearBoth"></div>
            </div>
            <div class="noticeWarningLeft">
                <p class="form-description warning importantMsg">Notice:</p>
                <p class="form-description">"Provably Fair" gaming is a method which assures you (the player) that all game play has a verifiable result. For further information please visit How Provably Fair works on our website.</p>
            </div>
        </div>

    </div>

</template>

<script>
    export default {
        data: function () {
            return {
              client_phrase: this.$store.state.account.client[0].client_phrase
            }
        },
        computed: {
            get_client_phrase: function () {
                return this.$store.state.account.client[0].client_phrase;
            },
            old_hash: function () {
                return '';
            },
            server_seed: function(){

            },
            current_seed: function () {

            },
            encrypted_hash: function(){
                return this.$store.state.account.client[0].encrypted_hash;
            },
            nonce: function () {
                return this.$store.state.account.client[0].nonce;
            },
          can_reveal: function(){
            return this.$store.state.account.client[0].can_reveal
          }

        },
        methods: {
            reveal_seed: function () {
              this.$store.dispatch('account/reveal_seed')
            },
            change_client_phrase: function () {
                this.$store.dispatch('account/change_client_phrase', this.client_phrase)
            }
        }
    }
</script>
<style>

</style>
