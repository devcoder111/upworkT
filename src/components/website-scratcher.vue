<!-- This page is for Scratchers -->
<template>
<div class="scratcher-browser game-browser">
  <div class="container">
    <div class="row">
      <div class="grid_12">
        <h2>Scratcher Games</h2>
        <div class="row gm-choices">
          <div @click="showModal('game-scratchers', 'CC')" class="picks grid_3">
            <div class="game-choice">
              <div class="game-choice-info scratcher"><img
                      src='../assets/quinto-images/scratcher_images/cc/CCbanner.png'></div>
              <div class="game-choice-overlay"></div>
            </div>
          </div>
          <div @click="showModal('game-scratchers', 'AS')" class="picks grid_3">
            <div class="game-choice">
              <div class="game-choice-info scratcher"><img
                      src='../assets/quinto-images/scratcher_images/as/ASbanner.png'></div>
              <div class="game-choice-overlay"></div>
            </div>
          </div>
          <div @click="showModal('game-scratchers', 'HR')" class="picks grid_3">
            <div class="game-choice">
              <div class="game-choice-info scratcher"><img
                      src='../assets/quinto-images/scratcher_images/hr/HRbanner.png'></div>
              <div class="game-choice-overlay"></div>
            </div>
          </div>
          <div @click="showModal('game-scratchers', 'KB')" class="picks grid_3">
            <div class="game-choice">
              <div class="game-choice-info scratcher"><img
                      src='../assets/quinto-images/scratcher_images/kb/KBbanner.png'></div>
              <div class="game-choice-overlay"></div>
            </div>
          </div>
          <div @click="showModal('game-scratchers', 'SC')" class="picks grid_3">
            <div class="game-choice">
              <div class="game-choice-info scratcher"><img
                      src='../assets/quinto-images/scratcher_images/sc/SCbanner.png'></div>
              <div class="game-choice-overlay"></div>
            </div>
          </div>
          <div @click="showModal('game-scratchers', 'SM')" class="picks grid_3">
            <div class="game-choice">
              <div class="game-choice-info scratcher"><img
                      src='../assets/quinto-images/scratcher_images/sm/SMbanner.png'></div>
              <div class="game-choice-overlay"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
  export default {
    methods: {
      showModal: function(view, scratcher_type){
        this.$store.dispatch('account/write_local_param', {ident: 'scratcher_type', section: 'scratchers', value: scratcher_type});
        this.$store.state.home.modalView = view;
        this.$modal.show('my-mainmodal');
      }
    }
  }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .game-option-wrap:hover .game-option-hover{
    display: block;
  }
  .game-option-hover{
    display: none;
  }

</style>
