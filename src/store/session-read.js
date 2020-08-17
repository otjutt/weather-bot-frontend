import { combineReducers } from 'redux';
import * as MessageService from "../service/message-service";
import * as SessionService from "../service/session-service";

export const ACTION_END_CHAT = 'end_chat';
export const ACTION_UPDATE_MESSAGE_FIELD = 'update_message_field';
export const ACTION_LOAD_MESSAGES = 'load_messages';

function actionEndChat() {
    return (dispatch) => {
        let currentSession = JSON.parse(localStorage.getItem('current_session'));
        SessionService.update(currentSession.id, { isActive: false }).then((response) => {
            localStorage.removeItem('current_session');
            return dispatch({
                type: ACTION_END_CHAT,
                data: {
                    sessionEnded: response.data.id
                }
            });
        });
    };
}

function reducerEndChat(state, action) {
    if (typeof state === 'undefined') {
        state = null;
    }
    switch (action.type) {
        case ACTION_END_CHAT:
            return action.data.sessionEnded;
        default:
            return state;
    }
}

function actionUpdateMessageField(value) {
    return (dispatch) => {
        return dispatch({
            type: ACTION_UPDATE_MESSAGE_FIELD,
            data: {
                messageFieldValue: value
            }
        });
    };
}

function reducerUpdateMessageField(state, action) {
    if (typeof state === 'undefined') {
        state = '';
    }
    switch (action.type) {
        case ACTION_UPDATE_MESSAGE_FIELD:
            return action.data.messageFieldValue;
        default:
            return state;
    }
}

function reducerLoadMessages(state, action) {
    if (typeof state === 'undefined') {
        state = [];
    }
    switch (action.type) {
        case ACTION_LOAD_MESSAGES:
            return action.data.messages;
        default:
            return state;
    }
}

function actionLoadMessages(sessionId) {
    return (dispatch) => {
        MessageService.list(sessionId).then((response) => {
            return dispatch({
                type: ACTION_LOAD_MESSAGES,
                data: {
                    messages: response.data
                }
            });
        });
    };
}

function actionQuicklyAddMessage(messages) {
    return (dispatch) => {
        dispatch({
            type: ACTION_LOAD_MESSAGES,
            data: {
                messages: messages
            }
        })
    };
}

const reducers = combineReducers({
    reducerEndChat,
    reducerUpdateMessageField,
    reducerLoadMessages
});

export {
    actionEndChat,
    actionUpdateMessageField,
    actionLoadMessages,
    actionQuicklyAddMessage,
    reducers
};
