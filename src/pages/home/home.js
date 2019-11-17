import React from 'react';
import './home.css';
import Post from '../../components/post/post';
import RedditApi from "../../api/reddit-api";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] }
  }

  componentDidMount() {
    RedditApi.getFrontPage()
    .then(res => {
      this.setState({ data: res.data.children });
    }).catch(err => {
      console.error(err);
    });
  }

  render() {
    return (
      <div className="home">
        <div className="posts-wrapper">
          {this.state.data.map(item => <Post data={item.data} key={item.data.id} />)}
        </div>
      </div>
    );
  }
}

export default Home;
