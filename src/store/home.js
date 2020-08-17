import { combineReducers } from 'redux';
import * as SessionService from "../service/session-service";

const ACTION_START_CHAT = 'start_chat';

function actionStartChat() {
    return (dispatch) => {
        SessionService.create().then((response) => {
            localStorage.setItem('current_session', JSON.stringify(response.data));
            return dispatch({
                type: ACTION_START_CHAT,
                data: {
                    sessionId: response.data.id
                }
            });
        });
    };
}

function reducerStartChat(state, action) {
    if (typeof state === 'undefined') {
        state = null;
    }
    switch (action.type) {
        case ACTION_START_CHAT:
            return action.data.sessionId;
        default:
            return state;
    }
}

const reducers = combineReducers({
    reducerStartChat
});

export {
    actionStartChat,
    reducers
};
