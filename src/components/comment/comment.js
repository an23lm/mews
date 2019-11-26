import React from 'react';
import './comment.css';
import CommentGroup from '../comment-group/comment-group';

class Comment extends React.Component {
    constructor(props) {
        super(props)
        this.state = { showReplies: true }
        this.comment = props.data.data
        this.replyThread = 
            this.comment.hasOwnProperty("replies")
            && this.comment.replies.hasOwnProperty("data") 
            && this.comment.replies.data.children.length > 0 
            ? this.comment.replies.data.children 
            : []
    }

    getData() {
        return this.comment
    }

    toggleShowReplies() {
        this.setState({ showReplies: !this.state.showReplies })
    }

    showComment() {
        return (
            <div className="mews-comment-body">{this.comment.body}</div>
        );
    }

    showHidden() {
        return (
            <div className="mews-comment-hidden">Show Comments</div>
        )
    }

    render() {
        return (
            <div className="mews-comment-container">
                <div className="mews-comment" onClick={this.toggleShowReplies.bind(this)}>
                    <div className="mews-comment-header">
                        <div className="mews-comment-author">
                            {this.comment.author}
                        </div>
                        {this.state.showReplies ? null : this.showHidden()}
                    </div>
                    {this.state.showReplies ? this.showComment() : null}
                </div>
                {this.state.showReplies ?  <CommentGroup comments={this.replyThread} /> : null}
            </div>
        )
    }
}

export default Comment;