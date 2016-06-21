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
    var imdbRuntime;
    var form;
    var formTrue = false;

    // const imdbForm = this.state.loading 
    // ? <div>...loading</div>
    // : this.props.map(val => {
    //   return <ImdbForm 
    //   key={val.id} 
    //   name={val.title}
    //   netflixId={val.netflix_id}
    //   year={val.year}
    //   />
    // });

    var genres = this.props.netflixGenres.join(", ");

    if (this.props.rating) {
      imdb = <a href={'http://www.imdb.com/title/' + this.props.imdbId} target="_blank" className="imdb-link"><strong>IMDB Rating: </strong>{this.props.rating}</a>;
      if (this.props.runtime) {
        imdbRuntime = <span className="runtime">{this.props.runtime}min</span>;
      }
    }

    if (formTrue) {
      form = <div className="toggle-form"><input type="text" /></div>;
    }

    return <div className="infinite-list-item" onload="document.body.style.opacity='1'" style={
      {
          height: this.props.height,
          lineHeight: this.props.lineHeight,
          overflow: 'scroll'
      }
    }>
      <div style={{height: 400}}>
        <a href={'https://www.netflix.com/title/' + this.props.netflixId} target="_blank"><img src={this.props.imgUrl} alt={this.props.name} /></a>
        <div className="item-content">
          <span className="rating">{imdb} <i className="fa fa-pencil fa-lg" aria-hidden="true" onClick={this._addForm}></i></span>{form}
          <h2>{this.props.name}</h2>
          <p>{this.props.year} {imdbRuntime}</p>
          <p>{genres}</p>
          <p>{this.props.description}</p>

        </div>
      </div>
    </div>

  }
  
  _addForm = () => {
    formTrue = true;
  }
}

export default MovieBox;