<template>
    <div class="scratcher-menu">
        <!--<div class="playnow"><h2 @click="showModal('gamepokerjb')">Play Now!</h2></div>-->
        <div class="scratcher-gm">
            <span @click="showScratcherModal('game-scratchers', 'as', $event)">Antigua Sands-</span>
        </div>
        <div class="scratcher-gm">
            <span @click="showScratcherModal('game-scratchers', 'cc', $event)">Cash Cow</span>
        </div>
        <div class="scratcher-gm">
            <span @click="showScratcherModal('game-scratchers', 'hr', $event)">Hot Rods</span>
        </div>
        <div class="scratcher-gm">
            <span @click="showScratcherModal('game-scratchers', 'kb', $event)">Kissing Booth</span>
        </div>
        <div class="scratcher-gm">
            <span @click="showScratcherModal('game-scratchers', 'sc', $event)">Sin City</span>
        </div>
        <div class="scratcher-gm">
            <span @click="showScratcherModal('game-scratchers', 'sm', $event)">Scratch Magic</span>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            showScratcherModal: function(view, image){
                alert('ddd')
                event.stopPropagation()
                //console.log('showModal'+view);
                //this.$store.commit('home/changeModalView', 'lottery');
                this.$store.state.home.modalView = view;
                this.$modal.show('my-mainmodal');
            },
        }
    }
</script>

<style scoped>
    .scratcher-gm span{
        color: #fff;
        text-align: center;
        margin-top: 20px;
        cursor: pointer;
    }
</style>
