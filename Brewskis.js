import React, { Component } from 'react';
import './App.css';


export class Brewski extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      breweries: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChange = (event) => {
  this.setState({term: event.target.value});
}

handleSubmit(event) {
  event.preventDefault();
  const api_key = '8713de00f6497ee509363210fa22326b';
  const url = `http://api.brewerydb.com/v2/search?q=${this.state.term}&key=${api_key}`
  fetch(url)
    .then(nonJsonResponse => nonJsonResponse.json())
    .then(apiResponse => {
      console.log(apiResponse);
      this.setState({ breweries: apiResponse.data})
    })
    .catch(e => console.log('error',e));
}

render() {
  return(
    <div id='beer-section'>
    <h3 id='beer-title'>Search for Beer</h3>
      <form onSubmit={this.handleSubmit}>
        <input type='text' value={this.state.term} onChange={this.onChange}/>
          <button>Search!</button>
      </form>
      <div>
        {this.state.breweries && this.state.breweries.map(item => {return <div key={item.id} className='beer-results'>
                                                                        <h1 id='name'>{item.name}</h1>
                                                                        <p id='abv'>Alcohol By Volume: {item.abv}%</p>
                                                                        <p>Organic: "{item.isOrganic}"</p>
                                                                        <p id='description' >{item.description}</p>
                                                                        <img id='label' src={item.labels && item.labels.medium} alt=""/><hr/></div>})}
      </div>
    </div>

  );
  }
}
