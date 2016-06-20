import React from 'react';
import AppBody from './AppBody.jsx';
import Header from './Header.jsx';
import MovieBox from './MovieBox.jsx';
import Infinite from 'react-infinite';

require('es6-promise').polyfill();
require('isomorphic-fetch');
var _ = require('lodash');

const LIMIT = 6;

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { elements: [], isInfiniteLoading: false};
    this.getElements = this.getElements.bind(this);
  }

  getElements(start, limit, sort, order) {
    var that = this;
    // console.log(that);
    fetch('http://localhost:3000/flicks?start=' + start + '&limit=' + limit + '&sort=' + sort + '&order=' + order)
    .then(function(response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    })
    .then(function(flicks) {
      console.log(flicks)
      that.setState({elements: that.state.elements.concat(flicks)})
    });
  }

  componentDidMount() {
    // setInterval(() => {
      this.getElements(0, LIMIT, 'id', 'asc');
      // console.log(this);
      var that = this;
      // console.log(that);
    window.addEventListener('scroll', _.debounce(that.handleScroll.bind(that), 500));
  }

  handleScroll(){
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        // you're at the bottom of the page
        // console.log("bottom");
        // console.log(this);
        const elemLength = this.state.elements.length;
        this.getElements(elemLength, LIMIT, 'id', 'asc');
      }
  }

  elementInfiniteLoad() {
    return <div className="infinite-list-item">
    Loading...
    </div>
  }

  render() {

    const movieBoxes = this.state.elements.map(val => {
      return <MovieBox 
        key={val.id} 
        name={val.title} 
        imgUrl={val.box_art} 
        description={val.netflix_description} 
        rating={val.imdb_rating}
        imdbId={val.imdb_id}
        netflixId={val.netflix_id}
        netflixGenres={val.netflix_genres}
        year={val.year}
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
    const newState = this.state.elements.filter(val => val.rating > 9);
    this.setState({
      elements: newState,
      filtered: true
    });
  };

  _clearFilter = () => {
    this.setState({
      elements: DATA,
      filtered: false
    });
  };

}

export default App;