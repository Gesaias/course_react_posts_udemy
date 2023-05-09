import logo from './logo.svg';
import './App.css';
import { Component } from 'react';

class ClassComponentApp extends Component {
  // constructor(props) {
  //   super(props);
  //   // this.handlePClick = this.handlePClick.bind(this); // binding the function in class

  //   this.state = {
  //     name: "Gesaias Alves de Souza",
  //     counter: 0,
  //   };
  // }
  state = {
    name: "Gesaias Alves de Souza",
    counter: 0,
  };

  handlePClick = () => {
    const { name } = this.state;
    console.log(`<p> clicado! name: ${name}`)
    this.setState({ name: 'Junior' });
  };

  handleAClick = (event) => {
    event.preventDefault();
    const { counter } = this.state;
    this.setState({ counter: counter + 1 });
  };

  render() {
    const { name, counter } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p onClick={this.handlePClick}>
            {name} {counter}
          </p>
          <a
            onClick={this.handleAClick}
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Este é o link
          </a>
        </header>
        <main></main>
        <footer></footer>
      </div>
    );
  }
}

export default ClassComponentApp;
