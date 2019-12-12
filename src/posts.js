import React from 'react';
import './App.css';
import axios from 'axios';
import dateFormat from 'dateformat';

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {posts: [], show: 2, id: ''};
    this.onLoadMore = this.onLoadMore.bind(this);
    this.changeID = this.changeID.bind(this);
  }

  /* Makes a GET request to server at intervals */
  componentDidMount() {
    setInterval(() => {
      if (this.state.id === '') {
        var url = 'http://localhost:5000/';
      } else {
        var url = 'http://localhost:5000/' + this.state.id;
      }
      axios.get(url)
        .then(res => {
          this.setState({posts: res.data});
        })
        .catch((err) => {
          console.log(err);
        })
      }, 1000);
      console.log('rendered');
  }

  /* Updates the amount of posts that need to be shown */
  onLoadMore() {
    this.setState({show: this.state.show + 3});
  }

  changeID(e) {
    this.setState({show: 2, id: e.target.id});
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0;
  }

  /* Renders the posts */
  render() {
    return(
      <div>
        <div>
          {this.state.posts.slice(0, this.state.show).map(post => (
            <div className="col s12 m4" key={post.id}>
              <div id="post" className="card small animation-1">
                <div className="card-content">
                  <i className="material-icons small left">account_circle</i> <span className="user" id={post.username} onClick={this.changeID}>{post.username}</span>
                  <p className="post flow-text">{post.text}</p>
                  <div className="date">
                    <p>{dateFormat(post.created, "dd/mm/yyyy HH:MM")}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="col s12 center-align space animation-1">
        {this.state.id !== '' &&
          <a onClick={this.changeID} id="" className="btn-large white teal-text text-darken-3 waves-effect waves-teal button space-2">Show Posts from all Users</a>
        }
        {this.state.show < this.state.posts.length &&
            <a onClick={this.onLoadMore} className="btn-large white teal-text text-darken-3 waves-effect waves-teal button space-2">Load More</a>
        } </div>
      </div>
    )}
}

export default Posts;
