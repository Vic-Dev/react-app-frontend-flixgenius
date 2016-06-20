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
    return <div className="infinite-list-item" style={
      {
          height: this.props.height,
          lineHeight: this.props.lineHeight,
          overflow: 'scroll'
      }
    }>
      <div style={{height: 400}}>
        <a href={'http://www.imdb.com/title/' + this.props.imdbId} target="_blank"><p className="rating"><strong>IMDB Rating: </strong>{this.props.rating}</p></a>
        <a href={'https://www.netflix.com/title/' + this.props.netflixId} target="_blank"><img src={this.props.imgUrl} alt={this.props.name} /></a>
        <h2>{this.props.name}</h2><span>{this.props.year}</span>
        <p>{this.props.description}</p>
      </div>
    </div>;

  }
  
}

export default MovieBox;