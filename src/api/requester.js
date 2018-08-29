import $ from 'jquery';

const kinveyBaseUrl = "https://baas.kinvey.com/";
const kinveyAppKey = "kid_HykIf1mw7";
const kinveyAppSecret = "4f921e0a5c9141b4a8b58051b3c75bc9";
const kinveyMasterSecret = "e653b0d13e184eab984a9bbf545ef952";

function makeAuth(type) {
    if(type === 'basic'){
        return 'Basic ' + btoa(kinveyAppKey + ':' + kinveyAppSecret)
    } else if (type === 'delete'){
        return 'Basic ' + btoa(kinveyAppKey + ':' + kinveyMasterSecret)
    } else {
        return 'Kinvey ' + sessionStorage.getItem('authtoken');
    }
}

function makeRequest(method, module, endpoint, auth, query) {
    let url = kinveyBaseUrl + module + '/' + kinveyAppKey + '/' + endpoint;
    if (query) {
        url += '?query=' + JSON.stringify(query);
    }

    return {
        method,
        url: url,
        headers: {
            'Authorization': makeAuth(auth),
        }
    };
}

function get(module, endpoint, auth, query) {
    return $.ajax(makeRequest('GET', module, endpoint, auth, query));
}

function post(module, endpoint, auth, data) {
    let req = makeRequest('POST', module, endpoint, auth);
    req.data = data;
    return $.ajax(req);
}

function update(module, endpoint, auth, data) {
    let req = makeRequest('PUT', module, endpoint, auth);
    req.data = data;
    return $.ajax(req);
}

function remove(module, endpoint, auth) {
    return $.ajax(makeRequest('DELETE', module, endpoint, auth));
}

export default {
    get,
    post,
    update,
    remove
}