<template>
    <div class="main-modal" name="my-overviewmodal" :adaptive="true" width="90%" height="auto" :scrollable="true">
        <div id="account-content" class="modal-interior">
            <p style="color: white;">Overview Content</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'modal-my-overviewmodal',
        computed: {
            modalView: function () {
                return this.$store.state.home.modalView;
            }
        }
    }
</script>

<style scoped>

</style>