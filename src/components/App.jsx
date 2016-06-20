import React from 'react';
import AppBody from './AppBody.jsx';
import Header from './Header.jsx';
import MovieBox from './MovieBox.jsx';
require('es6-promise').polyfill();
require('isomorphic-fetch');

class App extends React.Component {

  state = { data: [] };

  getData() {
    var that = this;
    console.log(that);
    fetch('http://localhost:3000/')
    .then(function(response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    })
    .then(function(flicks) {
      console.log(flicks)
      that.setState({data: flicks})
    });
  }

  componentDidMount() {
    this.getData();
  }

  render() {

    const movieBoxes = this.state.data.map(val => {
      return <MovieBox 
        key={val.netflix_id} 
        name={val.title} 
        // imgUrl={val.box_art} 
        description={val.netflix_description} 
        rating={val.imdb_rating} 
      />
    });

    const buttonToRender = this.state.filtered
    ? <button onClick={this._clearFilter}>Clear filter</button>
    : <button onClick={this._hideRatings}>Hide Ratings under 9</button>

    return (
      <div classname="app">
        <Header>
          Hello World
          {buttonToRender}
        </Header>
        <AppBody>{ movieBoxes }</AppBody>
      </div>
    )
  };

  _hideRatings = () => {
    const newState = this.state.data.filter(val => val.rating > 9);
    this.setState({
      data: newState,
      filtered: true
    });
  };

  _clearFilter = () => {
    this.setState({
      data: DATA,
      filtered: false
    });
  };

}

export default App;