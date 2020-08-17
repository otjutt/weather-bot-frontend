import { combineReducers } from 'redux';
import { ACTION_LOAD_MESSAGES } from "./session-read";
import * as MessageService from "../service/message-service";

const ACTION_MESSAGE_CREATE = 'message_create';

function actionCreateMessage(data) {
    return (dispatch) => {
        MessageService
            .create(data)
            .then((response) => {
                let currentSession = JSON.parse(localStorage.getItem('current_session'));
                MessageService.list(currentSession.id).then((response) => {
                    return dispatch({
                        type: ACTION_LOAD_MESSAGES,
                        data: {
                            messages: response.data
                        }
                    });
                });
            })
            .catch((error) => {
                console.log('error');
                console.log(error.message);
            });
    };
}

function reducerCreateMessage(state, action) {
    if (typeof state === 'undefined') {
        state = null;
    }
    switch (action.type) {
        case ACTION_MESSAGE_CREATE:
            return action.data.messageId;
        default:
            return state;
    }
}

const reducers = combineReducers({
    reducerCreateMessage
});

export {
    actionCreateMessage,
    reducers
};
