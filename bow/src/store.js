import { createStore } from 'redux';

export const storeManager = {
    store: createStore(
        (state, action) => {
            if (action.type === '@@penthesileia/init') {
                let tempState = { ...state };
                tempState[action.payload.namespace] = action.payload.state;
                return tempState;
            }

            if (action.type in state) {
                let tempState = { ...state };
                tempState[action.type] = action.payload;
                return tempState;
            }

            if (/^\w+\/\w+$/.test(action.type)) {
                let direct = action.type.split('/');
                if (!(direct[0] in storeManager.effects)) { return state; }
                if (!(direct[1] in storeManager.effects[direct[0]])) { return state; }

                storeManager
                    .effects[direct[0]][direct[1]]
                    .call(storeManager.store, state, action)
                    .then(payload => storeManager.store.dispatch({ type: direct[0], payload }))

            }

            return state;
        },
        {}
    ),

    effects: { },

    initState: function({ namespace, state, effects }) {
        this.store.dispatch({
            type: '@@penthesileia/init',
            payload: { namespace, state }
        });
        this.effects[namespace] = effects;
    }

};