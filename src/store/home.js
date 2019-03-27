export const home = {
    namespaced: true,
    state: {
        count: 100,
        showModal: false,
        modalView: ''
    },
    mutations: {
        changeModalView: function (state, view) {
            state.modalView = view;
        }
    },
    actions: {
        goToModal: function(context, view){
            context.state.modalView = view;
            //this.$modal.show('my-mainmodal');
        }
    },
    getters: {
        HowMany: state => state.count > 50 ? 'lots' : 'litle'
    }
}
