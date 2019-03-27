export const account = {
    namespaced: true,
    state: {
        client: [],
        client_balances: [],
        local_params: [],
        user_params: []
    },
    mutations: {},
    actions: {
        bitcoin_emergency_address: function (context, payload) {
            // payload: address (string), changeable (bool), withdrawal_only (bool)
            console.log('bitcoin_emergency_address')
            var msg = {
                "msg_id": '0',
                "msg_type": "bitcoin_emergency_address",
                "content": {
                    "address": payload.address,
                    "changeable": payload.changeable,
                    "withdrawal_only": payload.withdrawalonly
                }
            }
            this.dispatch('do_send', msg)
        },
        bitcoin_request_address: function (context) {
            // payload: address (string), changeable (bool), withdrawal_only (bool)
            console.log('bitcoin_request_address')
            var msg = {
                "msg_id": '0',
                "msg_type": "bitcoin_request_address",
                "content": {}
            }
            this.dispatch('do_send', msg)
        },
        bitcoin_transfer: function (context, payload) {
            // payload: member_name (string), amount (double), code (int)
            console.log('bitcoin_transfer')
            var msg = {
                "msg_id": '0',
                "msg_type": "bitcoin_transfer",
                "content": {
                    "member_name": payload.member_name,
                    "amount": payload.amount * 1,
                }
            }
            if (payload.code) {
                msg.content.code = parseInt(payload.code);
            }
            this.dispatch('do_send', msg)
        },
        bitcoin_withdrawal: function (context, payload) {
            // payload: amount (double), to_address (string), code (int)
            console.log('bitcoin_withdrawal')
            var msg = {
                "msg_id": '0',
                "msg_type": "bitcoin_withdrawal",
                "content": {
                    "amount": payload.amount * 1,
                    "to_address": payload.to_address
                }
            }
            if (payload.code) {
                msg.content.code = parseInt(payload.code);
            }
            this.dispatch('do_send', msg)
        },
        totp_authentication: function (context, auth_code) {
            console.log('totp_authentication')
            var msg = {
                "msg_id": '0',
                "msg_type": "totp_authentication",
                "content": {
                    code: auth_code
                }
            }
            console.log('do_send')
            this.dispatch('do_send', msg)
        },
        change_client_phrase: function (context, phrase) {
            // payload: phrase (string)
            console.log('bitcoin_withdrawalchange_client_phrase')
            var msg = {
                "msg_id": '0',
                "msg_type": "change_client_phrase",
                "content": {
                    "phrase": phrase
                }
            }
            this.dispatch('do_send', msg)
        },
        reveal_seed: function (context) {
            var msg = {
                "msg_id": '0',
                "msg_type": "request_server_seed",
                "content": {}
            }
            this.dispatch('do_send', msg)
        },
        change_password: function (context, payload) {
            console.log('hello change_password')
            var msg = {
                "msg_id": '0',
                "msg_type": "change_password",
                "content": {
                    "password": payload.new_password,
                    "old_password": payload.old_password,
                }
            }
            if (payload.code) {
                msg.content.code = parseInt(payload.code);
            }
            this.dispatch('do_send', msg)
        },
        write_local_param: (context, payload) => {
            console.log('write local param')
            console.log(payload)
            var found;
            
            //This will store reactive information for the current browser session even if the user is logged out
            if(found = context.state.local_params.find(function(param){
                return param.ident == payload.ident && param.section == payload.section;
            })) {
                found.value = payload.value;
            } else {
                context.state.local_params.push(payload);
            }
            
            //This will load things between refreshes
            localStorage.setItem(payload.section+'/'+payload.ident, payload.value);
            
            //This will store information if the user is logged in
            if(context.rootState.runtime.logged_in){
                context.dispatch('write_param', payload);
            }
        },
        write_param: function (context, payload) {
            console.log('user_param')
            var msg = {
                "msg_id": '0',
                "msg_type": "write_param",
                "content": {
                    'section': payload.section,
                    'ident': payload.ident,
                    'value': payload.value+'',
                }
            }
            this.dispatch('do_send', msg)
        },
        change_email: function (context, payload) {
            var msg = {
                'msg_id': '0',
                'msg_type': 'change_email',
                'content': {
                    'opt_out': payload.opt_out
                }
            }
            if (payload.email_address && payload.email_address.length) {
                msg.content.email_address = payload.email_address
                msg.content.password = payload.password
            }
            if (payload.code) {
                msg.content.code = parseInt(payload.code);
            }
            this.dispatch('do_send', msg)
        },
        validate_email: function (context, payload) {
            var msg = {
                'msg_id': '0',
                'msg_type': 'email_validation_pincode',
                'content': {
                    'pin_code': payload.pin_code
                }
            }
            this.dispatch('do_send', msg)
        }
    },
    getters: {
/*        using_2fa: function () {
            return state.authentication == 'TOTP'
        },
        default_widthdrawal_address: function () {
            $.each(state.user_params, function (index, value) {
                if (value.ident == 'remember_withdrawal_address') {
                    return value.value
                }
            })
            return ''
        },*/
        name: (state, getters, rootState, rootGetters) => {
            return rootGetters['login/UserName'];
        },
        account_balance: state => {
            if (state.client_balances[1])
                return state.client_balances[1].balance_text;
        },
        withdrawal_fee: state => {
            if (state.client_balances[1])
                return state.client_balances[1].fee_text;
        },
        get_user_param: (state, getters) => ({ident, section, default_value}) => {
            var param = {};
            param.ident = ident
            param.section = section
            param.default_value = default_value
            console.log('state')
            console.log(state);

            if (param = state.local_params.find(function (param) {
                    console.log(param);
                    console.log(param.ident);
                    console.log(ident);
                    console.log(param.section);
                    console.log(section);
                    return param.ident == ident && param.section == section;
                })) {
                console.log('local '+ident+' found');
                return param.value;
            } else if (param = state.user_params.find(function (param) {
                    return param.ident == ident && param.section == section;
                })) {
                console.log('param '+ident+' found');
                return param.value;
            } else {
                console.log(ident+' not found --- setting to '+default_value);
                return default_value;
            }
        }
    }
}
