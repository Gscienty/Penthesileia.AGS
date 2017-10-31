export async function create(uri, entity) {
    return fetch(uri, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entity)
    }).then(response => {
        if (response.status === 201) {
            return response.json();
        }
        else {
            return { status: response.status };
        }
    }).then(({ status, payload }) => (
        { status, payload }
    ));
}

export async function get(uri) {
    return fetch(uri, {
        method: 'GET',
        credentials: 'include'
    }).then(response => {
        if (response.status === 200) {
            return response.json();
        }
        else {
            return { status: response.status };
        }
    }).then(({ status, payload }) => (
        { status, payload }
    ));
}

export async function update(uri, entity) {
    return fetch(uri, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entity)
    }).then(response => {
        if (response.status === 200) {
            return response.json();
        }
        else {
            Promise.reject();
            return { status: response.status };
        }
    }).then(({ status, payload }) => (
        { status, payload }
    ));
}

export async function remove(uri) {
    return fetch(uri, {
        method: 'DELETE',
        credentials: 'include'
    }).then(response => ({ status: response.status }));
}