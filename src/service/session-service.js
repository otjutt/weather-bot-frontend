import * as axios from "axios";
import config from "../config.json";

export async function create() {
    let response = await axios({
        method: 'post',
        url: config.serverUrl + '/api/v1/sessions'
    });
    return await response.data;
}

export async function update(id, data) {
    let response = await axios({
        method: 'post',
        url: config.serverUrl + '/api/v1/sessions/' + id,
        data: data
    });
    return await response.data;
}

export async function list() {
    try {
        let response = await axios({
            method: 'get',
            url: config.serverUrl + '/api/v1/sessions'
        });
        return await response.data;
    } catch (e) {
        console.log('Exception');
        console.log(e.message);
    }
}

export async function read(id) {
    let response = await axios({
        method: 'get',
        url: config.serverUrl + '/api/v1/sessions/' + id
    });
    return await response.data;
}
