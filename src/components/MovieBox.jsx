import React from 'react';

class MovieBox extends React.Component {

  render() {
    return (
      <div classname="movieBox">
        <h1>{this.props.name}</h1>
        <img src={this.props.imgUrl} alt={this.props.name} />
        <p>{this.props.description}</p>
        <p><strong>Rating: </strong>{this.props.rating}</p>
      </div>
    )
  }
  
}

export default MovieBox;