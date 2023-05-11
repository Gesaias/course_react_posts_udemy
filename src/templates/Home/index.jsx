import './styles.css';

import { useEffect, useState, useCallback } from 'react';

import { loadPosts } from '../../utils/load-posts';

import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';
import { NotFoundText } from '../../components/NotFoundText';
import { Loading } from '../../components/Loading';

export function Home() {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(2);
  const [searchValue, setSearchValue] = useState('');
  const [loadingFindPosts, setLoadingFindPosts] = useState(false);

  loadingFindPosts;

  const filteredPosts = searchValue
    ? allPosts.filter((post) => {
        return post.title.toLowerCase().includes(searchValue.toLocaleLowerCase());
      })
    : posts;

  const handleLoadPosts = useCallback(async (page, postsPerPage) => {
    setLoadingFindPosts(true);

    const postsAndPhotos = await loadPosts();

    setLoadingFindPosts(false);
    setPosts(postsAndPhotos.slice(page, postsPerPage));
    setAllPosts(postsAndPhotos);
  }, []);

  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);

    posts.push(...nextPosts);

    setPosts(posts);
    setPage(nextPage);
  };

  const handleChange = (e) => setSearchValue(e.target.value);

  useEffect(() => {
    handleLoadPosts(0, postsPerPage); // page
  }, [handleLoadPosts, postsPerPage]);

  return (
    <section className="container">
      {loadingFindPosts ? (
        <Loading center={true} />
      ) : (
        <div>
          <div className="search-container">
            {!!searchValue && <h1>Search value: {searchValue}</h1>}

            <TextInput searchValue={searchValue} handleChange={handleChange} placeholder={'Type your post...'} />
          </div>

          {filteredPosts.length > 0 && <Posts posts={filteredPosts} />}

          {filteredPosts.length === 0 && <NotFoundText center={true} />}

          <div className="button-container">
            {!searchValue && (
              <Button onClick={loadMorePosts} name="Load more posts" disabled={posts.length === allPosts.length} />
            )}
          </div>
        </div>
      )}
    </section>
  );
}

// export class Home extends Component {
//   state = {
//     posts: [],
//     allPosts: [],
//     page: 0,
//     postsPerPage: 10,
//     searchValue: '',
//     loadingFindPosts: false,
//   };

//   async componentDidMount() {
//     await this.loadPosts();
//   }

//   loadPosts = async () => {
//     this.setState({ loadingFindPosts: true });

//     const postsAndPhotos = await loadPosts();

//     this.setState((prevState, prevProps) => {
//       return {
//         loadingFindPosts: false,
//         posts: postsAndPhotos.slice(prevState.page, prevState.postsPerPage),
//         allPosts: postsAndPhotos,
//       };
//     });
//   };

//   loadMorePosts = () => {
//     const { page, postsPerPage, posts, allPosts } = this.state;

//     const nextPage = page + postsPerPage;
//     const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);

//     posts.push(...nextPosts);

//     this.setState({ posts, page: nextPage });
//   }

//   handleChange = (e) => this.setState({ searchValue: e.target.value });

//   render() {
//     const { posts, allPosts, searchValue, loadingFindPosts } = this.state;

//     const filteredPosts = !!searchValue ? allPosts.filter(post => {
//       return post.title.toLowerCase().includes(searchValue.toLocaleLowerCase());
//     }) : posts;

//     return (
//       <section className='container'>
//         {
//           loadingFindPosts ? <Loading center={true} /> : <div>
//             <div className='search-container'>
//               {!!searchValue && (
//                 <h1>Search value: {searchValue}</h1>
//               )}

//               <TextInput
//                 searchValue={searchValue}
//                 handleChange={this.handleChange}
//                 placeholder={'Type your post...'}
//               />

//             </div>

//             {filteredPosts.length > 0 && (
//               <Posts posts={filteredPosts} />
//             )}

//             {filteredPosts.length === 0 && (
//               <NotFoundText center={true} />
//             )}

//             <div className='button-container'>
//               {!searchValue && (
//                 <Button
//                   onClick={this.loadMorePosts}
//                   name='Load more posts'
//                   disabled={posts.length === allPosts.length}
//                 />
//               )}
//             </div>
//           </div>
//         }
//       </section>
//     );
//   }
// }

// export class Home extends Component {
//   state = {
//     counter: 0,
//   };

//   handleClick = () => {
//     this.setState({ counter: this.state.counter + 1 }, () => {
//       console.log(this.state.counter);
//     });
//   };

//   render() {
//     return (
//       <div className='container'>
//         <h1>{this.state.counter}</h1>
//         <Button center={true} name={'Increment'} onClick={this.handleClick} />
//       </div>
//     );
//   };
// }
