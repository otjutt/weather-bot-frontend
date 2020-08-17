import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { Redirect } from 'react-router-dom';
import ChatBoxNav from "../chat-box/chat-box-nav";
import {actionEndChat, actionLoadMessages, actionQuicklyAddMessage} from "../../store/session-read";
import { actionUpdateMessageField } from "../../store/session-read";
import { actionCreateMessage } from "../../store/message-create";
import BubbleList from "../chat-box/bubble-list";
import * as SessionService from "../../service/session-service";

class SessionRead extends React.Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onEndChat = this.onEndChat.bind(this);
        this.onChangeMessageFieldValue = this.onChangeMessageFieldValue.bind(this);
    }

    componentDidMount() {
        let session = JSON.parse(localStorage.getItem('current_session'));
        let sessionId = this.props.match.params.id;
        if (session === null || sessionId !== session.id) {
            SessionService.read(sessionId).then((sessionResponse) => {
                localStorage.setItem('current_session', JSON.stringify(sessionResponse.data));
            });
        }
        this.props.actionLoadMessages(this.props.match.params.id);
    }

    onSubmit(e) {
        e.preventDefault();
        let message = this.props.messageFieldValue;
        if (message.trim() === '') {
            return;
        }
        let session = JSON.parse(localStorage.getItem('current_session'));
        this.props.actionUpdateMessageField('');
        this.props.actionCreateMessage({
            sessionId: session.id,
            message: message
        });
        this.props.actionQuicklyAddMessage([
            ...this.props.messages,
            {
                id: (new Date()).getTime(), // It will be replaced anyways.
                author: 'user',
                message: message
            }
        ]);
    }

    onEndChat(e) {
        e.preventDefault();
        this.props.actionEndChat();
    }

    onChangeMessageFieldValue(e) {
        e.preventDefault();
        if (e.target.value.trim() === '') {
            return;
        }
        this.props.actionUpdateMessageField(e.target.value)
    }

    render() {
        if (localStorage.getItem('current_session') === null) {
            return (<Redirect to={"/"}/>);
        }
        let session = JSON.parse(localStorage.getItem('current_session'));

        return (
            <div>
                <div className={`wrapper`} >
                    <div className={`chat-container`}>
                        <ChatBoxNav chatUrl={this.props.location.pathname}/>
                        <div className={`messages-container`}>
                            <BubbleList messages={this.props.messages}/>
                        </div>
                        {session.isActive === false &&
                            <div className={`message-form`}>
                                <p className={`alert alert-danger`}>You can't post in in-active session.</p>
                            </div>
                        }
                        {session.isActive === true &&
                            <div className={`message-form`}>
                                <form onSubmit={this.onSubmit}>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <div className="form-group" style={{margin: 0}}>
                                                        <input
                                                            type={`text`}
                                                            className="form-control"
                                                            id="chatboxfield"
                                                            name={`chatboxfield`}
                                                            onChange={this.onChangeMessageFieldValue}
                                                            value={this.props.messageFieldValue}
                                                        />
                                                    </div>
                                                </td>
                                                <td width={`100`}>
                                                    <button type="submit" className="btn btn-primary">Send</button>
                                                </td>
                                                <td width={`100`}>
                                                    <button onClick={this.onEndChat} className="btn btn-danger">End Chat</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </form>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        reducerEndChat: state.sessionRead.reducerEndChat,
        messageId: state.messageCreate.messageId,
        messageFieldValue: state.sessionRead.reducerUpdateMessageField,
        messages: state.sessionRead.reducerLoadMessages
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        actionEndChat: () => dispatch(actionEndChat()),
        actionCreateMessage: (data) => dispatch(actionCreateMessage(data)),
        actionUpdateMessageField: (value) => dispatch(actionUpdateMessageField(value)),
        actionLoadMessages: (sessionId) => dispatch(actionLoadMessages(sessionId)),
        actionQuicklyAddMessage: (messages) => dispatch(actionQuicklyAddMessage(messages))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SessionRead));

