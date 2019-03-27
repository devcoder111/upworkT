<template>
    <modal class="main-modal" name="my-mainmodal" :adaptive="true" width="90%" height="auto" :scrollable="true">
        <div class="modal-header">
            <div class="modal-logo-wrap">
                <img src="../assets/quinto-images/graphics-1/q-white-130.png">
                <div @click="$modal.hide('my-mainmodal')" ><span style="cursor: pointer;"><< Return to Main</span></div>
            </div>
            <div class="modal-game-menu-wrapper">
                <div class="modal-info-display-wrapper">
                    <modal-info></modal-info>
                </div>
                <modal-nav></modal-nav>
            </div>
        </div>

            <modal-content></modal-content>


    </modal>
</template>

<script>
    export default {
        name: 'modal-container',
        computed: {
            modalView: function () {
                return this.$store.state.home.modalView;
            }
        },
        methods: {
            showModal: function(view){
                this.$store.state.home.modalView = view;
                this.$modal.hide('my-overviewmodal');
                this.$modal.show('my-overviewmodal');
            },
        }
    }
</script>

<style scoped>

</style>
