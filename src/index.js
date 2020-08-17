import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {Route, Switch} from 'react-router-dom';
import thunk from 'redux-thunk';
import history from "./history";
import './index.css';
import {
    ConnectedRouter,
    connectRouter,
    routerMiddleware
} from 'connected-react-router';

import Home from './component/home/home';
import Session from './component/session/session';
import SessionRead from "./component/session/session-read";

import { reducers as homeReducers } from "./store/home";
import { reducers as sessionReadReducers } from "./store/session-read";
import { reducers as messageCreateReducers } from "./store/message-create";
import { reducers as sessionListReducers } from "./store/session-list";

/* Create store. */
const store = createStore(
    combineReducers({
        router: connectRouter(history),
        home: homeReducers,
        sessionRead: sessionReadReducers,
        messageCreate: messageCreateReducers,
        sessionList: sessionListReducers
    }),
    applyMiddleware(routerMiddleware(history), thunk)
);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Switch>
                    <Route path="/" key="home" component={Home} strict exact/>,
                    <Route path="/sessions" key="sessions_list" component={Session} strict exact/>,
                    <Route path="/sessions/:id" key="sessions_read" component={SessionRead} strict exact/>,
                    <Route key="404" render={() => <h1>Not Found</h1>}/>
                </Switch>
            </ConnectedRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
