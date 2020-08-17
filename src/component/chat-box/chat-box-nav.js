import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import {NavLink} from "react-router-dom";

class ChatBoxNav extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let chatUrl = '/';
        if (typeof this.props.chatUrl !== 'undefined') {
            chatUrl = this.props.chatUrl;
        }
        return (
            <div className={`tab-nav-bar`}>
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <NavLink
                            to={chatUrl}
                            exact={true}
                            className={`nav-link`}
                            activeClassName="active"
                            >Chat</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink
                            to={`/sessions`}
                            exact={true}
                            className={`nav-link`}
                            activeClassName="active"
                        >Sessions</NavLink>
                    </li>
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChatBoxNav));
