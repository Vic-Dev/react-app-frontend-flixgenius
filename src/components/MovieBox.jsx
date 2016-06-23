import React from 'react';
import ImdbForm from './ImdbForm.jsx';
import Infinite from 'react-infinite';

class MovieBox extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      height: 400,
      lineHeight: '400px',
      rating: null
    }
  }

  render() {
    var imdb;
    var imdbRuntime;

    const imdbForm = this.state.loading 
    ? <div>...loading</div>
    : <ImdbForm 
        key={this.props.id} 
        netflixId={this.props.netflixId} 
        updateRating={this._updateRating} />;

    var genres = this.props.netflixGenres.join(", ");

    const ratingUpdate = this.state.rating || this.props.rating

    if (this.state.rating || this.props.rating) {
      imdb = <a href={'http://www.imdb.com/title/' + this.props.imdbId} target="_blank" className="imdb-link"><strong>IMDB Rating: </strong>{ ratingUpdate }</a>;
      if (this.props.runtime) {
        imdbRuntime = <span className="runtime">{this.props.runtime}min</span>;
      }
    }

    return (<div className="infinite-list-item" onload="document.body.style.opacity='1'" style={
      {
          height: this.props.height,
          lineHeight: this.props.lineHeight,
          overflow: 'scroll'
      }
    }>
      <div style={{height: 400}}>
        <a href={'https://www.netflix.com/title/' + this.props.netflixId} target="_blank"><img src={this.props.imgUrl} alt={this.props.name} /></a>
        {imdbForm}
        <div className="item-content">
          <span className="rating">{imdb}</span>
          <h2>{this.props.name}</h2>
          <p>{this.props.year} {imdbRuntime}</p>
          <p>{genres}</p>
          <p>{this.props.description}</p>
        </div>
      </div>
    </div>)
  };

  _updateRating = (rating) => {
    this.setState({
      rating: rating
    })
    console.log(this.state.rating);
    this.forceUpdate();
  }
  
}

export default MovieBox;