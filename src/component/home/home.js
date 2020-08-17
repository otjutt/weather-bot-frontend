import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { Redirect } from "react-router-dom";
import ChatBoxNav from "../chat-box/chat-box-nav";
import { actionStartChat } from "../../store/home";

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.onStartChat = this.onStartChat.bind(this);
    }

    componentDidMount() {
        let currentSession = localStorage.getItem('current_session');
        if (currentSession !== null) {
            this.props.history.push('/sessions/' + JSON.parse(currentSession).id);
        }
    }

    onStartChat(e) {
        e.preventDefault();
        this.props.actionStartChat();
    }

    render() {
        if (localStorage.getItem('current_session') !== null) {
            let session = JSON.parse(localStorage.getItem('current_session'));
            return (<Redirect to={"/sessions/" + session.id}/>);
        }
        return (
            <div>
                <div className={`wrapper`} >
                    <div className={`chat-container`}>
                        <ChatBoxNav />
                        <div className={`messages-container`}>
                            <div className={`start-chat-wrapper`}>
                                <button onClick={this.onStartChat} className={`btn btn-primary`}>Start Chat</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        reducerStartChat: state.home.reducerStartChat
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        actionStartChat: () => dispatch(actionStartChat())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));

