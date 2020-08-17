import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import SessionListItem from "./session-list-item";

class SessionList extends React.Component {

    render() {
        const bubbles = this.props.sessions.map((session) => {
            let sessionName = 'Session ' + session.id + ' created at: ' + session.createdAt;
            return <SessionListItem key={session.id}
                                    sessionId={session.id}
                                    sessionName={sessionName}
                                    isActive={session.isActive} />
        });

        return (
            <React.Fragment>
                {bubbles}
            </React.Fragment>
        );
    }

}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SessionList));
