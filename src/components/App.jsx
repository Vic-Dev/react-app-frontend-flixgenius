import React from 'react';
import AppBody from './AppBody.jsx';
import Header from './Header.jsx';
import MovieBox from './MovieBox.jsx';
import ImdbForm from './ImdbForm.jsx';
import Infinite from 'react-infinite';

var ScrollToTop = require("react-scroll-up")

require('es6-promise').polyfill();
require('isomorphic-fetch');
var _ = require('lodash');

const LIMIT = 12;
const START = 0;

var sort = 'title';
var order = 'asc';

var startState = {
  elements: [],
  sort: 'availability',
  order: 'desc',
  loading: false,
  mounted: false,
  movieTvSortSelected: undefined,
  genreSelected: undefined
}

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { elements: startState.elements, sort: startState.sort, order: startState.order, loading: startState.loading, mounted: startState.mounted, movieTvSortSelected: startState.movieTvSortSelected, genreSelected: startState.genreSelected};
    this.getElements = this.getElements.bind(this);
  }

  getElements(start, limit, sort, order, moviesOrTv, genre) {
    var that = this;
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
    var that = this;
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
        imdbVotes={val.imdb_votes}
        netflixId={val.netflix_id}
        netflixGenres={val.netflix_genres}
        year={val.year}
        runtime={val.imdb_runtime}
      />
    });

    const typeSortButton = ['Movies', 'TV Shows']

    const genres = ['Action and Adventure', 'Anime', 'Canadian', 'Children and Family', 'Classic', 'Comedies', 'Documentaries', 'Dramas', 'Faith and Spirituality', 'Gay and Lesbian', 'Horror', 'Independent', 'International', 'Romantic', 'Sci-Fi and Fantasy', 'Sports', 'Sports and Fitness', 'Thrillers', 'Music', 'Musicals']

    const sortBy = [
    {
      name: 'New Arrivals',
      sort: 'availability',
      order: 'desc'
    },
    {
      name: 'IMDB Rating',
      sort: 'imdb_rating',
      order: 'desc'
    },
    {
      name: 'Title',
      sort: 'title',
      order: 'asc'
    },
    {
      name: 'Year',
      sort: 'year',
      order: 'desc'
    }
    ]

    const sortByEmotion = [
    {
      name: 'Anger',
      sort: 'anger',
      order: 'desc'
    },
    {
      name: 'Disgust',
      sort: 'disgust',
      order: 'desc'
    },
    {
      name: 'Fear',
      sort: 'fear',
      order: 'desc'
    },
    {
      name: 'Joy',
      sort: 'joy',
      order: 'desc'
    },
    {
      name: 'Sadness',
      sort: 'sadness',
      order: 'desc'
    }
    ]

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

    const sortByDisplay = sortBy.map(val => {
      const classes = this.state.sort === val.sort
      ? 'button-active'
      : '';

      return (<button
        onClick={this._sortBy.bind(this, val.sort, val.order)}
        className={ classes }
        >
        {val.name}
        </button>)
    })

    const sortByEmotionDisplay = sortByEmotion.map(val => {
      const classes = this.state.sort === val.sort
      ? 'button-active'
      : '';

      return (<button
        onClick={this._sortBy.bind(this, val.sort, val.order)}
        className={ classes }
        >
        {val.name}
        </button>)
    })

    // const buttonToRender = this.state.filtered
    // ? <button onClick={this._clearFilter}>Clear filter</button>
    // : <button onClick={this._hideRatings}>Hide Ratings under 9</button>

    return (
      <div classname="app">
        <Header>
          <div className="logo">
            <h1 onClick={this._resetSort}>Flixgenius</h1>
            <ScrollToTop showUnder={160}>
            <span className="up-arrow"><img src="http://image.flaticon.com/icons/svg/60/60573.svg" width="50" height="50" alt="Up arrow free icon" title="Up arrow free icon" /></span>
            </ScrollToTop>
          </div>
          <div className="search-opts">
            <div className="movie-tv-sort">
              {typeSortDisplay}
            </div>
            <div className="genre-sort">          
              {genresDisplay}
            </div>
            <div className="sort">
              <div className="type-sort">
                <h3> Sort By:</h3>
                {sortByDisplay}
              </div>
              <div className="emotion-sort">
                <h3>Sort By Emotion:</h3>
                {sortByEmotionDisplay}
              </div>
            </div>
          </div>
        </Header>
        <AppBody><div className="container">{ movieBoxes }</div></AppBody>
      </div>
    )
  };

  _sortBy = (sort, order) => {
    this.changeState(sort, order, this.state.movieTvSortSelected, this.state.genreSelected);
    this.getElements(START, LIMIT, sort, order, this.state.movieTvSortSelected, this.state.genreSelected);
  }

  _genreSelectedClick = (selected) => {
    if (this.state.genreSelected == selected) {
      selected = undefined;
    }
    this.changeState(this.state.sort, this.state.order, this.state.movieTvSortSelected, selected);
    this.getElements(START, LIMIT, this.state.sort, this.state.order, this.state.movieTvSortSelected, selected);
  }

  _movieTvSortClick = (selected) => {
    if (this.state.movieTvSortSelected == selected) {
      selected = undefined;
    }
    this.changeState(this.state.sort, this.state.order, selected, this.state.genreSelected);
    this.getElements(START, LIMIT, this.state.sort, this.state.order, selected, this.state.genreSelected);
  }

  _resetSort = () => {
    this.changeState(startState.sort, startState.order, startState.movieTvSortSelected, startState.genreSelected);
    this.getElements(START, LIMIT, startState.sort, startState.order, startState.movieTvSortSelected, startState.genreSelected);
  }

}

export default App;