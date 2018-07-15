import React, { Component } from 'react';
//import axios from 'axios';
import axios from '../../../axios';
import { Route } from 'react-router-dom';

import Post from '../../../components/Post/Post';
import  './Posts.css';
import FullPost from '../FullPost/FullPost';

class Posts extends Component {

  state = {
    posts: []
  }

  componentDidMount() {
    console.log(this.props);
    axios.get('/posts')
      .then(response => {
        const posts = response.data.slice(0, 4);
        const updatedPosts = posts.map(post => {
          return {
            ...post,
            author: 'Vadim'
          }
        });
        this.setState({posts: updatedPosts});
        // console.log(response);
      })
      .catch(error => {
        console.log(error);
        //this.setState({error: true});
      });
  }

  postSelectedHandler = id => {
    this.props.history.push({pathname: this.props.match.url + '/' + id});
    //this.props.history.push('/' + id);
  }

  render () {

    let posts = <p style={{textAlign: 'center'}}>Something went wrong!</p>

    if (!this.state.error) {
        posts = this.state.posts.map(post => {
            return (
              //<Link key={post.id} to={"/" + post.id} >
                <Post
                  key={post.id}
                  title={post.title}
                  author={post.author}
                  clicked={() => this.postSelectedHandler(post.id)} />
              //</Link>
            );
        });
    }

    return (
      <div>
        <section className="Posts">
          {posts}
        </section>
        <Route path={this.props.match.url + '/:id'} exact component={FullPost} />
      </div>
    );
  }
}

export default Posts;