import React from 'react';
import './home.css';
import Post from '../../components/post/post';
import RedditApi from "../../api/reddit-api";
import InfiniteScroll from "react-infinite-scroll-component";

const LoadingIndicator = (
  <div className='home-loading'>
    
  </div>
)

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] }
    this.lastName = '';
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    RedditApi.getFrontPage(this.lastName)
    .then(res => {
      this.lastName = res.data.children[res.data.children.length - 1].data.name;
      console.log(this.lastName)
      this.setState({ data: this.state.data.concat(res.data.children) });
    }).catch(err => {
      console.error(err);
    });
  }

  render() {
    return (
      <div className="home">
        <InfiniteScroll
          className="posts-wrapper"
          dataLength={this.state.data.length}
          next={this.fetchData.bind(this)}
          hasMore={true}
          loader={LoadingIndicator}
        >
          {this.state.data.map(item => <Post data={item.data} key={item.data.id} />)}
        </InfiniteScroll>
      </div>
    );
  }
}

export default Home;
