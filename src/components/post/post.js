import React from 'react';
import './post.css';
import LazyLoad from 'react-lazy-load';

class Post extends React.Component {
    constructor(props) {
        super(props)

        this.content = this.getPostContent(props.data)
        this.subredditUrl = "https://www.reddit.com" + this.props.subreddit_name_prefixed
        this.redditUrl = "https://www.reddit.com" + this.props.data.permalink
        this.isVideo = false
        this.vidRef = React.createRef()
    }
    
    getPostContent(data) {
        if (!data.hasOwnProperty('post_hint')) {
            let content = {type: 'title', content: data.title}
            data.title = ''
            return content
        }

        let type = data.post_hint
        let content = undefined
    
        if (type === "image") {
            content = data.preview.images[0].source
            console.log(content)
        } else if (type === "rich:video") {
            if (data.preview.images[0].hasOwnProperty('variants') 
            && data.preview.images[0].variants.hasOwnProperty('gif')) {
                content = data.preview.images[0].variants.gif.source
                content.isGif = true
            } else {
                let embed = data.secure_media.oembed
                let content = {}
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
            if (data.preview.hasOwnProperty("reddit_video_preview")) {
                content = data.preview.reddit_video_preview
                type = "link:video"
            }
            content['linkUrl'] = data.url
        }
        
        return { type: type, content: content }
    }

    renderContent(contentData) {
        if (contentData.type === 'image' || contentData.type === 'rich:video') {
            return (
                <div className='post-content-image-wrapper'>
                        <LazyLoad
                            debounce={false}
                            offsetVertical={500}
                        >
                        <img 
                            className="post-content-image" 
                            src={contentData.content.url} 
                            alt=""
                        />
                    </LazyLoad>
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
                    <LazyLoad
                        debounce={false}
                        offsetVertical={500}
                    >
                        <img className="post-content-image" 
                            src={contentData.content.url} 
                            alt=""
                        />
                    </LazyLoad>
                </a>
            )
        } else if (contentData.type === 'link:video') {
            return (
                <a
                    href={contentData.content.linkUrl} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="post-content-link">
                    <div className='post-content-video-wrapper'>
                        <LazyLoad
                            debounce={false}
                            offsetVertical={500}
                        >
                            <video 
                                className='post-content-video'
                                loop autoPlay muted 
                                ref={this.vidRef} 
                                src={contentData.content.fallback_url}
                            />
                        </LazyLoad>
                    </div>
                </a>
            )
        } else if (contentData.type === 'hosted:video') {
            this.isVideo = true;
            return (
                <div className='post-content-video-wrapper'>
                    <LazyLoad
                        offsetVertical={500}
                    >
                        <video 
                            className='post-content-video' 
                            loop autoPlay muted 
                            ref={this.vidRef} 
                            src={contentData.content.fallback_url}
                        />
                    </LazyLoad>
                </div>
            )
        } else if (contentData.type === 'title') {
            return (
                <div className="post-title-only">
                    {contentData.content}
                </div>
            )
        }
    }

    render() {
        if (this.props.data.over_18) return null;

        return (
            <div className="post">
                <div className="post-header">
                    <div className="post-left-filler"></div>
                    <div className="post-title">{this.props.data.title}</div>
                    <a className="post-subreddit" href={this.subredditUrl}>{this.props.data.subreddit_name_prefixed}</a>
                </div>
                <div className="post-content">
                    {this.renderContent(this.content)}
                </div>
                <div className="post-footer">
                    <div className="post-votes">
                        <img className="vote-img" src={require('../../assets/uparrow.svg')}  alt=''/>
                        {this.props.data.score}
                    </div>
                    <div className="post-comments"></div>
                    <a className="post-share" href={this.redditUrl}>
                        <img className="share-img" src={require('../../assets/share.svg')}  alt=''/>
                        Open on Reddit
                    </a>
                </div>
            </div>
        );
    }
}

export default Post;
