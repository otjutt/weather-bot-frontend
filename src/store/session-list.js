import * as SessionService from "../service/session-service";
import { combineReducers } from "redux";

export const ACTION_LOAD_SESSIONS = 'load_sessions';

function actionLoadSessions() {
    return (dispatch) => {
        SessionService.list().then((response) => {
            return dispatch({
                type: ACTION_LOAD_SESSIONS,
                data: {
                    sessions: response.data
                }
            });
        });
    };
}

function reducerLoadSessions(state, action) {
    if (typeof state === 'undefined') {
        state = [];
    }
    switch (action.type) {
        case ACTION_LOAD_SESSIONS:
            return action.data.sessions;
        default:
            return state;
    }
}

const reducers = combineReducers({
    reducerLoadSessions
});

export {
    actionLoadSessions,
    reducers
};
