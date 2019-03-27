<!-- This page is for Poker -->
<template>
  <div class="poker-browser game-browser">
    <div class="container">
        <div class="row">
          <div class="grid_12">
            <h2>Video Poker Games</h2>
            <div class="row gm-choices">
              <div @click="showModal('game-pokerbd')" class="picks grid_3">
                <div class="game-choice">
                  <div class="game-choice-info">
                    <img src='../assets/quinto-images/graphics-1/video-poker-main.png'>
                    <p>Bonus Deluxe</p>
                  </div>
                  <div class="game-choice-overlay"></div>
                </div>
              </div>
              <div @click="showModal('game-pokerdb')" class="picks grid_3">
                <div class="game-choice">
                  <div class="game-choice-info">
                    <img src='../assets/quinto-images/graphics-1/video-poker-main.png'>
                    <p>Double Bonus</p>
                  </div>
                  <div class="game-choice-overlay"></div>
                </div>
              </div>
              <div @click="showModal('game-pokerjb')" class="picks grid_3">
                <div class="game-choice">
                  <div class="game-choice-info">
                    <img src='../assets/quinto-images/graphics-1/video-poker-main.png'>
                    <p>Jacks or Better</p>
                  </div>
                  <div class="game-choice-overlay"></div>
                </div>
              </div>
              <div @click="showModal('game-pokernb')" class="picks grid_3">
                <div class="game-choice">
                  <div class="game-choice-info">
                    <img src='../assets/quinto-images/graphics-1/video-poker-main.png'>
                    <p>Nevada Bonus</p>
                  </div>
                  <div class="game-choice-overlay"></div>
                </div>
              </div>
              <div @click="showModal('game-pokertdb')" class="picks grid_3">
                <div class="game-choice">
                  <div class="game-choice-info">
                    <img src='../assets/quinto-images/graphics-1/video-poker-main.png'>
                    <p>Triple Double Bonus</p>
                  </div>
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
      showModal: function(view){
        //this.$store.commit('home/changeModalView', 'lottery');
        this.$store.state.home.modalView = view;
        this.$modal.show('my-mainmodal');
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
