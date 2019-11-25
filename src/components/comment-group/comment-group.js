import React from 'react';
import './comment-group.css';
import Comment from '../comment/comment';

class CommentGroup extends React.Component {
    constructor(props) {
        super(props)

        this.state = { comments: [], selectedCommentThread: [] }
        this._isMounted = false;
        this.comments = this.props.comments;
        this.nonExtensionComments = false;
        this.nonExtensionCommentsPresent();
    }

    componentDidMount() {
        this._isMounted = true;
        this.setState({ comments: this.comments })
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidUpdate(prevProps) {
        if (this.props.comments.length !== prevProps.comments.length) {
            this.comments = this.props.comments
            this.nonExtensionCommentsPresent();
            if (this._isMounted) {
                this.setState({ comments: this.comments })
            }
        }
    }

    nonExtensionCommentsPresent() {
        for (let i = 0; i < this.comments.length; i++) {
            if (this.comments[i].kind === 't1') {
                this.nonExtensionComments = true;
                break;
            }
        }
    }

    commentOnClick(comment) {
        let commentThread = comment.replies.data.children
        this.setState({ selectedCommentThread: commentThread })
    }

    render() {
        if (!this.nonExtensionComments) return null
        return (
            <div className="comment-group">
                {this.state.comments.map(comment => {
                    if (comment.kind === 't1') {
                        return (
                            <Comment
                                key={comment.data.id}
                                data={comment}
                                onClick={this.commentOnClick.bind(this)}
                            />
                        )
                    }
                    return null
                })}
            </div>
        );
    }
}

export default CommentGroup
