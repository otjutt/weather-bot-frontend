import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import Bubble from "./bubble";

class BubbleList extends React.Component {

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    render() {
        const messages = this.props.messages;
        const bubbles = messages.map((message) =>
            // Correct! Key should be specified inside the array.
            <Bubble key={message.id} author={message.author} message={message.message} />
        );

        return (
            <React.Fragment>
                {bubbles}
                <div style={{ float:"left", clear: "both" }}
                     ref={(el) => { this.messagesEnd = el; }}>
                </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BubbleList));
