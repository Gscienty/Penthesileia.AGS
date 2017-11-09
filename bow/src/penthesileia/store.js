import { createStore } from 'redux';

function __common_transfer_result(response) {
    let contentLengthString = response.headers.get('content-length');
    if (contentLengthString === null || parseInt(contentLengthString, 10) === 0) {
        return { status: response.status };
    }
    else {
        return response.json()
            .then(payload => ({ status: response.status, payload }));
    }
}

async function create(uri, entity) {
    return fetch(uri, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entity)
    }).then(response => __common_transfer_result(response));
}

async function get(uri) {
    return fetch(uri, {
        method: 'GET',
        credentials: 'include'
    }).then(response => __common_transfer_result(response));
}

async function update(uri, entity) {
    return fetch(uri, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entity)
    }).then(response => __common_transfer_result(response));
}

async function remove(uri) {
    return fetch(uri, {
        method: 'DELETE',
        credentials: 'include'
    }).then(response => __common_transfer_result(response));
}


function _reducer(store, state, { type, payload }) {
    if (/^\w+\/\w+$/.test(type)) {
        let direct = type.split('/', 2);
        let namespace = direct[0];
        let action = direct[1];
        if (namespace in this._effects && action in this._effects[namespace]) {
            this._effects[namespace][action]
                .call(store, { create, update, remove, get }, { payload, state: state[namespace] });
        }
        else if (namespace in this._reduces && action in this._reduces[namespace]) {
            let next = this._reduces[namespace][action]
                .call(store, state[namespace], payload);
            let tempState = { ...state };
            tempState[namespace] = next;
            return tempState;
        }
    }

    return state;
}

export class StoreManager {
    _initializeStore = { }
    _effects = { }
    _reduces = { }

    register({ namespace, state, effects, reduces }) {
        // register effects
        this._effects[namespace] = effects;
        // register reduces
        this._reduces[namespace] = reduces;
        // register store
        this._initializeStore[namespace] = state;
    }

    build() {
        var store = createStore(
            (state, action) => _reducer.call(this, store, state, action),
            this._initializeStore
        );
        return store;
    }
}