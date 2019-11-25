import React from 'react';
import './comment.css';
import CommentGroup from '../comment-group/comment-group';

class Comment extends React.Component {
    constructor(props) {
        super(props)
    
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

    render() {
        return (
            <div className="mews-comment-container">
                <div className="mews-comment" onClick={() => { this.props.onClick(this.comment) }}>
                    {this.comment.body}
                </div>
                <CommentGroup comments={this.replyThread} />
            </div>
        )
    }
}

export default Comment;