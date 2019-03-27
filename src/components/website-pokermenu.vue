<template>
<div class="poker-menu">
          <!--<div class="playnow"><h2 @click="showModal('gamepokerjb')">Play Now!</h2></div>-->
          <div class="poker-gm">
              <span @click="showModal('game-poker-jb')">Jacks or Better</span>
          </div>
          <div class="poker-gm">
              <span @click="showModal('game-poker-bd')">Bonus Deluxe</span>
          </div>
          <div class="poker-gm">
              <span @click="showModal('game-poker-db')">Double Bonus</span>
          </div>
          <div class="poker-gm">
              <span @click="showModal('game-poker-nb')">Nevada Bonus</span>
          </div>
          <div class="poker-gm">
              <span @click="showModal('game-poker-tdb')">Triple Double Bonus</span>
          </div>
</div>
</template>

<script>
    export default {
        methods: {
            showModal: function(view){
                //this.$store.dispatch('home/goToModal', view);
                //this.$store.commit('home/changeModalView', 'lottery');
                this.$store.state.home.modalView = view;
                this.$modal.show('my-mainmodal');
            }
        }
    }
</script>

<style scoped>
.poker-gm span{
    color: #fff;
    text-align: center;
    margin-top: 20px;
    cursor: pointer;
}
</style>
