import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";

class Bubble extends React.Component {
    render() {
        let author = this.props.author;
        let message = this.props.message;
        let wrapperClass = 'chat-box-bubble__wrapper';
        if (author.toLowerCase() === 'you') {
            wrapperClass += ' chat-box-bubble__wrapper--right';
        }
        return (
            <div className={wrapperClass}>
                <table>
                    <tbody>
                        <tr>
                            <td><div className={`chat-box-bubble__author`}>{author}</div></td>
                        </tr>
                        <tr>
                            <td><div className={`chat-box-bubble__message`}>{message}</div></td>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Bubble));
