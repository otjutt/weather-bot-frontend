import * as axios from "axios";
import config from "../config.json";

export async function create(data) {
    try {
        let response = await axios({
            method: 'post',
            url: config.serverUrl + '/api/v1/messages',
            data
        });
        return await response.data;
    } catch (e) {
        console.log('Exception');
        console.log(e.message);
    }
}

export async function list(sessionId) {
    let sessionIdQuery = ''
    if (typeof sessionId !== 'undefined') {
        sessionIdQuery = '?sessionId=' + sessionId
    }
    try {
        let response = await axios({
            method: 'get',
            url: config.serverUrl + '/api/v1/messages' + sessionIdQuery
        });
        return await response.data;
    } catch (e) {
        console.log('Exception');
        console.log(e.message);
    }
}
