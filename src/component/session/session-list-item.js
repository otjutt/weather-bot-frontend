import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

class SessionListItem extends React.Component {
    render() {
        let sessionUrl = '/sessions/' + this.props.sessionId;
        let sessionName = this.props.sessionName;
        let isActive = this.props.isActive;
        return (
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                { isActive === true &&
                                    <p className={`alert alert-success`}>
                                        <Link to={sessionUrl} >{sessionName}</Link>
                                    </p>
                                }
                                { isActive === false &&
                                    <p className={`alert alert-danger`}>
                                        <Link to={sessionUrl} >{sessionName}</Link>
                                    </p>
                                }
                            </td>
                        </tr>
                    </tbody>
                </table>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SessionListItem));
