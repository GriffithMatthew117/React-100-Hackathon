import React, { Component } from 'react';
import './App.css';
import { Brewski } from './Brewskis';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      img: ''
    };

    }
    onChange = (event) => {
      this.setState({term: event.target.value});
  }

    handleSubmit = (event) => {
      event.preventDefault();
      const api_key = 'dc6zaTOxFJmzC';
      const url = `http://api.giphy.com/v1/gifs/search?q=${this.state.term}&api_key=${api_key}`
      fetch(url)
        .then(response => response.json())
        .then(data => this.setState({ term:'', img: data.data[0].images.fixed_height.url }))
        .catch(e => console.log('error',e));
    }


  render() {
    return (
      <div id='body-container'>
      <div id='memes' className="container">
        <h3 id='meme-title'>Find a Gif</h3>
          <form onSubmit={this.handleSubmit}>
            <input type='text' value={this.state.term} onChange={this.onChange}/>
              <button>Search!</button>
          </form>
            <img id='gifs' src={this.state.img} height='200' alt={this.state.term} />
          </div>
          <div id='brews' className='container'>
            <Brewski />
          </div>
      </div>
    );
  }
}

export default App;
