export const subscriptions = {
    namespaced: true,
    state: {
        subscriptions: []
        /*
        CREATE TABLE  subscriptions (
          ref_id      varchar(20) not null,
          expire_time DateTime  default null,
        
          primary key subscriptions_pk (ref_id)
        );        
         */
    },
    mutations: {},
    actions: {},
    getters: {
        getLotteries: function (state, getters) {
            return getters['getByType']('LOTTERY');
        },
        getByType: (state) => (type) => {
            return state.subscriptions.filter(function (subscription) {
                return subscription.pre_something == type;
            }).sort(function (a, b) {
                if (a.ord > b.ord) return 1;
                if (a.ord < b.ord) return -1;
                return 0;
            });
        }
    }
}
