import React from 'react';
import Infinite from 'react-infinite';

class MovieBox extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      height: 400,
      lineHeight: '400px'
    }
  }

  render() {
    var imdb;

    if (this.props.rating) {
      imdb = <a href={'http://www.imdb.com/title/' + this.props.imdbId} target="_blank"><strong>IMDB Rating: </strong>{this.props.rating}</a>;
    }

    return <div className="infinite-list-item" style={
      {
          height: this.props.height,
          lineHeight: this.props.lineHeight,
          overflow: 'scroll'
      }
    }>
      <div style={{height: 400}}>
        <a href={'https://www.netflix.com/title/' + this.props.netflixId} target="_blank"><img src={this.props.imgUrl} alt={this.props.name} /></a>
        <span className="rating">{imdb} <i className="fa fa-question-circle fa-lg" aria-hidden="true"></i></span>
        <h2>{this.props.name}</h2>
        <p>{this.props.year}</p>
        <p>{this.props.description}</p>
      </div>
    </div>;

  }
  
}

export default MovieBox;