import './App.css';
import { Component } from 'react';
import { loadPosts } from '../../utils/load-posts';
import { Posts } from '../../components/Posts';

class DataFetching extends Component {
  state = {
    posts: [],
  };

  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => this.setState({ posts: await loadPosts() });

  render() {
    const { posts } = this.state;

    return (
      <section className='container'>
        <Posts posts={posts}/>
      </section>
    );
  }
}

export default DataFetching;
