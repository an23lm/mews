import React from 'react';
import './post.css';

class Post extends React.Component {
    constructor(props) {
        super(props)

        this.content = this.getPostContent(props.data)

        this.isVideo = false
        this.vidRef = React.createRef()
    }

    componentDidMount() {
        if (this.isVideo)
            console.log(this.vidRef.current)
    }
    
    getPostContent(data) {
        let type = data.post_hint
        let content = undefined
    
        if (type === "image") {
            content = data.preview.images[0].source
        } else if (type === "rich:video") {
            if (data.preview.images[0].hasOwnProperty('variants') 
            && data.preview.images[0].variants.hasOwnProperty('gif')) {
                content = data.preview.images[0].variants.gif.source
                content.isGif = true
            } else {
                let embed = data.secure_media.oembed
                content.url = embed.thumbnail_url
                content.height = embed.height
                content.width = embed.width
                content.isGif = false
            }
        } else if (type === "hosted:video") {
            content = data.media.reddit_video
        } else if (type === "self") {
            content = data.selftext
        } else if (type === "link") {
            if (data.preview.hasOwnProperty("images")) {
                content = data.preview.images[0].source
                if (data.preview.images[0].hasOwnProperty('variants')
                && data.preview.images[0].variants.hasOwnProperty('gif')) {
                    content = data.preview.images[0].variants.gif.source
                }
            }
            content['linkUrl'] = data.url
        }
        
        return { type: type, content: content }
    }

    renderContent(contentData) {
        if (contentData.type === 'image' || contentData.type === 'rich:video') {
            return (
                <div className='post-content-image-wrapper'>
                    <img className="post-content-image" 
                        src={contentData.content.url} 
                        alt=""
                    />
                </div>
            );
        } else if (contentData.type === 'self') {
            return (
                <div className="post-content-text">
                    {contentData.content}
                </div>
            )
        } else if (contentData.type === 'link') {
            return (
                <a
                    href={contentData.content.linkUrl} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="post-content-link">
                    <img className="post-content-image" 
                        src={contentData.content.url} 
                        alt=""
                    />
                </a>
            )
        } else if (contentData.type === 'hosted:video') {
            this.isVideo = true;
            return (
                <div className='post-content-video-wrapper'>
                    <video className='post-content-video' loop autoPlay muted ref={this.vidRef} src={contentData.content.fallback_url}></video>
                </div>
            )
        }
    }

    render() {
        return (
            <div className="post">
                <div className="post-header">
                    <div className="post-left-filler"></div>
                    <div className="post-title">{this.props.data.title}</div>
                    <div className="post-subreddit">{this.props.data.subreddit_name_prefixed}</div>
                </div>
                <div className="post-content">
                    {this.renderContent(this.content)}
                </div>
                <div className="post-footer">
                    <div className="post-votes">{this.props.data.score}</div>
                    <div className="post-comments">Comments</div>
                    <div className="post-share">Share</div>
                </div>
            </div>
        );
    }
}

export default Post;
