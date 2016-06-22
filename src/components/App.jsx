import React from 'react';
import AppBody from './AppBody.jsx';
import Header from './Header.jsx';
import MovieBox from './MovieBox.jsx';
import Infinite from 'react-infinite';

require('es6-promise').polyfill();
require('isomorphic-fetch');
var _ = require('lodash');

const LIMIT = 8;
const START = 0;

var sort = 'title';
var order = 'asc';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { elements: [], sort: 'title', order: 'asc', loading: false, mounted: false, movieTvSortSelected: undefined, genreSelected: undefined};
    this.getElements = this.getElements.bind(this);
  }

  getElements(start, limit, sort, order, moviesOrTv, genre) {
    var that = this;
    // console.log(this.state.sort);
    // console.log(that);
    // console.log(this.state);
    console.log(moviesOrTv);
    var search = 'http://localhost:3000/flicks?start=' + start + '&limit=' + limit + '&sort=' + sort + '&order=' + order + '&moviesOrTv=' + moviesOrTv + '&genre=' + genre ;
    console.log(search);
    fetch(search)
    .then(function(response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    })
    .then(function(flicks) {
      // console.log(flicks);
      // console.log(sort);
      that.setState({loading: false, elements: that.state.elements.concat(flicks)})
    });
  }

  changeState(sort, order, movieTvSortSelected, genreSelected) {
    // console.log(sort);
    this.setState({
      elements: [],
      sort: sort, 
      order: order, 
      loading: true,
      movieTvSortSelected: movieTvSortSelected,
      genreSelected: genreSelected
    });
  }

  componentDidMount() {
    this.setState({ mounted: true });
    this.getElements(START, LIMIT, this.state.sort, this.state.order, this.state.movieTvSortSelected, this.state.genreSelected);
    // console.log(this);
    var that = this;
    // console.log(that);
    window.addEventListener('scroll', _.debounce(that.handleScroll.bind(that, this.state.sort, this.state.order, this.state.movieTvSortSelected, this.state.genreSelected), 500));
  }

  handleScroll(sort, order){
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        const elemLength = this.state.elements.length;
        this.getElements(elemLength, LIMIT, this.state.sort, this.state.order, this.state.movieTvSortSelected, this.state.genreSelected);
      }
  }

  elementInfiniteLoad() {
    return <div className="infinite-list-item">
    Loading...
    </div>
  }

  render() {

    const movieBoxes = this.state.loading 
    ? <div>...loading</div>
    : this.state.elements.map(val => {
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
        runtime={val.imdb_runtime}
      />
    });

    const typeSortButton = ['Movies', 'TV Shows']

    const genres = ['Action and Adventure', 'Anime', 'Canadian', 'Children and Family', 'Classic', 'Comedies', 'Documentaries', 'Dramas', 'Faith and Spirituality', 'Gay and Lesbian', 'Horror', 'Independent', 'International', 'Romantic', 'Sci-Fi and Fantasy', 'Sports', 'Sports and Fitness', 'Thrillers', 'Music', 'Musicals']

    const genresDisplay = genres.map(val => {
      const classes = this.state.genreSelected === val
      ? 'button-active'
      : '';

      return (<button
        onClick={this._genreSelectedClick.bind(this, val)}
        className={ classes }
        >
        {val}
        </button>)
    });

    const typeSortDisplay = typeSortButton.map(val => {
      const classes = this.state.movieTvSortSelected === val
      ? 'button-active'
      : '';

      return (<button
        onClick={this._movieTvSortClick.bind(this, val)}
        className={ classes }
        >
        {val}
        </button>)
    });

    const buttonToRender = this.state.filtered
    ? <button onClick={this._clearFilter}>Clear filter</button>
    : <button onClick={this._hideRatings}>Hide Ratings under 9</button>

    return (
      <div classname="app">
        <Header>
          <h1>Flixgenius</h1>
          <div className="movie-tv-sort">
            {typeSortDisplay}
          </div>
          <div className="genre-sort">          
            {genresDisplay}
          </div>
          <div className="sort">
            <div className="type-sort">
              <h3> Sort By:</h3>
              <button onClick={this._sortByRating}>IMDB rating</button>
              <button onClick={this._sortByTitle}>Title</button>
              <button onClick={this._sortByYear}>Year</button>
            </div>
            <div className="emotion-sort">
              <h3>Sort By Emotion:</h3>
              <button onClick={this._sortByAnger}>Anger</button>
              <button onClick={this._sortByDisgust}>Disgust</button>
              <button onClick={this._sortByFear}>Fear</button>
              <button onClick={this._sortByJoy}>Joy</button>
              <button onClick={this._sortBySadness}>Sadness</button>
            </div>
          </div>
        </Header>
        <AppBody><div className="container">{ movieBoxes }</div></AppBody>
      </div>
    )
  };

  _sortByRating = (e) => {
    e.preventDefault();
    this.changeState('imdb_rating', 'desc', this.state.movieTvSortSelected, this.state.genreSelected);
    this.getElements(START, LIMIT, 'imdb_rating', 'desc', this.state.movieTvSortSelected, this.state.genreSelected);
  }

  _sortByTitle = (e) => {
    e.preventDefault();
    this.changeState('title', 'asc', this.state.movieTvSortSelected, this.state.genreSelected);
    this.getElements(START, LIMIT, 'title', 'asc', this.state.movieTvSortSelected, this.state.genreSelected);
  }

  _sortByYear = (e) => {
    e.preventDefault();
    this.changeState('year', 'desc', this.state.movieTvSortSelected, this.state.genreSelected);
    this.getElements(START, LIMIT, 'year', 'desc', this.state.movieTvSortSelected, this.state.genreSelected);
  }

  _sortByAnger = (e) => {
    e.preventDefault();
    this.changeState('anger', 'desc', this.state.movieTvSortSelected, this.state.genreSelected);
    this.getElements(START, LIMIT, 'anger', 'desc', this.state.movieTvSortSelected, this.state.genreSelected);
  }

  _sortByDisgust = (e) => {
    e.preventDefault();
    this.changeState('disgust', 'desc', this.state.movieTvSortSelected, this.state.genreSelected);
    this.getElements(START, LIMIT, 'disgust', 'desc', this.state.movieTvSortSelected, this.state.genreSelected);    
  }

  _sortByFear = (e) => {
    e.preventDefault();
    this.changeState('fear', 'desc', this.state.movieTvSortSelected, this.state.genreSelected);
    this.getElements(START, LIMIT, 'fear', 'desc', this.state.movieTvSortSelected, this.state.genreSelected);    
  }

  _sortByJoy = (e) => {
    e.preventDefault();
    this.changeState('joy', 'desc', this.state.movieTvSortSelected, this.state.genreSelected);
    this.getElements(START, LIMIT, 'joy', 'desc', this.state.movieTvSortSelected, this.state.genreSelected);    
  }

  _sortBySadness = (e) => {
    e.preventDefault();
    this.changeState('sadness', 'desc', this.state.movieTvSortSelected, this.state.genreSelected);
    this.getElements(START, LIMIT, 'sadness', 'desc', this.state.movieTvSortSelected, this.state.genreSelected);    
  }

  _genreSelectedClick = (selected) => {
    this.changeState(this.state.sort, this.state.order, this.state.movieTvSortSelected, selected);
    this.getElements(START, LIMIT, this.state.sort, this.state.order, this.state.movieTvSortSelected, selected);
  }

  _movieTvSortClick = (selected) => {
    this.changeState(this.state.sort, this.state.order, selected, this.state.genreSelected);
    this.getElements(START, LIMIT, this.state.sort, this.state.order, selected, this.state.genreSelected);
  }

  _hideRatings = () => {
    const newState = this.state.elements.filter(val => val.rating > 9);
    this.setState({
      filtered: true
    });
  };

  _clearFilter = () => {
    this.setState({
      filtered: false
    });
  };

}

export default App;