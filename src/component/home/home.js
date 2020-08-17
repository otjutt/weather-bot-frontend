import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import ChatBoxNav from "../chat-box/chat-box-nav";
import { actionStartChat } from "../../store/home";

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.onStartChat = this.onStartChat.bind(this);
    }

    componentDidMount() {
    }

    onStartChat(e) {
        e.preventDefault();
        this.props.actionStartChat();
    }

    render() {
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

