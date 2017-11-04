function __common_transfer_result(response) {
    if (parseInt(response.headers.get('content-length'), 10) === 0) {
        return { status: response.status };
    }
    else {
        return response.json()
            .then(payload => ({ status: response.status, payload }));
    }
}

export async function create(uri, entity) {
    return fetch(uri, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entity)
    }).then(response => __common_transfer_result(response));
}

export async function get(uri) {
    return fetch(uri, {
        method: 'GET',
        credentials: 'include'
    }).then(response => __common_transfer_result(response));
}

export async function update(uri, entity) {
    return fetch(uri, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entity)
    }).then(response => __common_transfer_result(response));
}

export async function remove(uri) {
    return fetch(uri, {
        method: 'DELETE',
        credentials: 'include'
    }).then(response => __common_transfer_result(response));
}