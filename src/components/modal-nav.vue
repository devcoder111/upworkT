<template>
    <div class="modal-game-menu-wrap">
        <div class="modal-nav">
            <div @click="showModal('game-'+tab.tab_name.toLowerCase(), $event)" class="gm-item" v-for="tab in tabs">
                <div class="title">{{ tab.tab_descr }}</div>
            </div>
            <!--<div @click="showModal('game-lottery', $event)" class="gm-item lotto">
                <div @click="showOptions('lottoGames')" class="title">Lottery</div>
                <ul id="lottoGames" class="toplevel">
                    <li @click="showModal('game-lottery-'+lottery.ref_id, $event)" v-for="lottery in lotteries">{{ lottery.tab_descr }}</li>
                </ul>
            </div>-->
            <div v-if="$store.state.runtime.logged_in" @click="showModal('acct', $event)" class="gm-item account">
                <div @click="showOptions('acctMenu')" class='title'>My Account</div>
            </div>
            <div @click="showModal('cashier-deposit', $event)" class="gm-item deposit">
                <div @click="showModal('cashier-deposit', $event)" class="title">Deposit</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        computed: {
            modalView: function () {
                return this.$store.state.home.modalView;
            },
            tabs: function(){
                if(!this.$store.state.tabs.tabs) return [];
                return this.$store.state.tabs.tabs.filter(function(tab){
                    console.log('game-'+tab.tab_name.toLowerCase());
                    return tab.parent_name == 'LOBBY';
                }).sort(function(a,b){
                    return a.ord - b.ord;
                });
            }
        },
        methods: {
            showModal: function (view, event) {
                event.stopPropagation();
                //console.log('showModal'+view);
                //this.$store.commit('home/changeModalView', 'lottery');
                this.$store.state.home.modalView = view;
                this.$modal.show('my-mainmodal');
            },
            showOptions: function (obj) {
                var x = document.getElementById(obj);
                var elements = document.getElementsByClassName('toplevel');
                console.log(elements);
                var limit = elements.length;
                for (var i = limit - 1; i >= 0; i--) {
                    elements[i].classList.remove('active');
                }
                if (!x.classList.contains('active')) {
                    x.classList.add('active');
                }
            }
        }
    }
</script>

<style scoped>
    .title {
        font-weight: bold;
        font-size: 18px;
    }
</style>
