import './App.css';
import { Component } from 'react';

class LifeCycleMethodsApp extends Component {
  state = {
    counter: 0,
    posts: [
      {
        id: 1,
        title: 'O titulo 1',
        body: 'O corpo 1',
      },
      {
        id: 2,
        title: 'O titulo 2',
        body: 'O corpo 2',
      },
      {
        id: 3,
        title: 'O titulo 3',
        body: 'O corpo 3',
      },
    ],
  };

  timeoutUpdate = null;

  componentDidMount() { // É executado toda vez em que o component acaba de ser renderizado
    this.handleTimeout();
  }

  componentDidUpdate() { // É executado toda vez em que o component acaba de ser atualizado
    this.handleTimeout();
  }

  componentWillUnmount() { // Quando o componente for desmontado
    clearTimeout(this.timeoutUpdate);
  }

  handleTimeout = () => {
    const { posts, counter } = this.state;
    posts[0].title = 'O titulo mudou';

    this.timeoutUpdate = setTimeout(() => {
      this.setState({ posts, counter: counter + 1 });
    }, 1000);
  }

  render() {
    const { posts, counter } = this.state;

    return (
      <div className="App">
        <h1>{counter}</h1>
        {
          posts.map((post) => (
            <div key={post.id}>
              <br></br>
              <h1>Title: {post.title}</h1>
              <p>Body: {post.body}</p>
              <br></br>
            </div>
          ))
        }
      </div>
    );
  }
}

export default LifeCycleMethodsApp;
