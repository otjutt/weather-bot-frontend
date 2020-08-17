import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import ChatBoxNav from "../chat-box/chat-box-nav";
import SessionList from "./session-list";
import { actionLoadSessions } from "../../store/session-list";

class Session extends React.Component {

    componentDidMount() {
        this.props.actionLoadSessions();
    }

    render() {
        return (
            <div>
                <div className={`wrapper`} >
                    <div className={`chat-container`}>
                        <ChatBoxNav />
                        <div className={`messages-container`}>
                            <SessionList sessions={this.props.sessions}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        sessions: state.sessionList.reducerLoadSessions
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        actionLoadSessions: () => dispatch(actionLoadSessions()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Session));

