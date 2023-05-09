import './styles.css';

import { Component } from 'react';

import { loadPosts } from '../../utils/load-posts';

import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';
import { NotFoundText } from '../../components/NotFoundText';
import { Loading } from '../../components/Loading';

export class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 10,
    searchValue: '',
    loadingFindPosts: false,
  };

  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    this.setState({ loadingFindPosts: true });

    const { page, postsPerPage } = this.state;
    const postsAndPhotos = await loadPosts();

    this.setState({
      loadingFindPosts: false,
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos,
    });
  };

  loadMorePosts = () => {
    const { page, postsPerPage, posts, allPosts } = this.state;

    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);

    posts.push(...nextPosts);

    this.setState({ posts, page: nextPage });
  }

  handleChange = (e) => this.setState({ searchValue: e.target.value });

  render() {
    const { posts, allPosts, searchValue, loadingFindPosts } = this.state;

    const filteredPosts = !!searchValue ? allPosts.filter(post => {
      return post.title.toLowerCase().includes(searchValue.toLocaleLowerCase());
    }) : posts;

    return (
      <section className='container'>
        {
          loadingFindPosts ? <Loading center={true} /> : <div>
            <div className='search-container'>
              {!!searchValue && (
                <h1>Search value: {searchValue}</h1>
              )}

              <TextInput
                searchValue={searchValue}
                handleChange={this.handleChange}
                placeholder={'Type your post...'}
              />

            </div>

            {filteredPosts.length > 0 && (
              <Posts posts={filteredPosts} />
            )}

            {filteredPosts.length === 0 && (
              <NotFoundText center={true} />
            )}

            <div className='button-container'>
              {!searchValue && (
                <Button
                  onClick={this.loadMorePosts}
                  name='Load more posts'
                  disabled={posts.length === allPosts.length}
                />
              )}
            </div>
          </div>
        }
      </section>
    );
  }
}
