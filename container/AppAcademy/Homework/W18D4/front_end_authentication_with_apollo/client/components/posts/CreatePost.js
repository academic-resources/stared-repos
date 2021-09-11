import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Mutations from "../../../graphql/mutations";
const { CREATE_POST } = Mutations

export const FETCH_POSTS = gql`
  query fetchPosts {
    posts {
      id
      title
      body
    }
  }
`;

class CreatePost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      body: "",
      message: ""
    };
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  // we need to remember to update our cache directly with our new product
  updateCache(cache, { data }) {
    let posts;
    try {
      // if we've already fetched the posts then we can read the
      // query here
      posts = cache.readQuery({ query: FETCH_POSTS });
    } catch (err) {
      return;
    }
    // if we had previously fetched products we'll add our new product to our cache
    if (posts) {
      let postArray = posts.posts;
      let newPost = data.newPost;
      cache.writeQuery({
        query: FETCH_POSTS,
        data: { products: postArray.concat(newPost) }
      });
    }
  }

  handleSubmit(e, createPost) {
    e.preventDefault();
    // we'll handle the author in our resolver
    createPost({
      variables: {
        title: this.state.title,
        body: this.state.body
      }
    });
  }

  render() {
    return (
      <Mutation
        mutation={CREATE_POST}
        // if we error out we can set the message here
        onError={err => this.setState({ message: err.message })}
        // we need to make sure we update our cache once our new product is created
        update={(cache, data) => this.updateCache(cache, data)}
        // when our query is complete we'll go to the index
        onCompleted={data => {
          const { title } = data.createPost;
          this.setState({
            message: `New post ${title} created successfully`
          });
        }}
      >
        {(createPost, { data }) => (
          <div>
            <form onSubmit={e => this.handleSubmit(e, createPost)}>
              <input
                onChange={this.update("title")}
                value={this.state.title}
                placeholder="title"
              />
              <textarea
                onChange={this.update("body")}
                value={this.state.body}
                placeholder="body"
              />
              <button type="submit">Create Post</button>
            </form>
            <p>{this.state.message}</p>
          </div>
        )}
      </Mutation>
    );
  }
}

export default CreatePost;
