import React from 'react';
import Infinite from 'react-infinite';

require('es6-promise').polyfill();
require('isomorphic-fetch');

// TODO: form to allow input of imdb link

class ImdbForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      display: false,
      value: ''
    }
  }

  render() {


    const classes = this.state.display
    ? 'form active'
    : 'form';

    return (
      <div className="imdbForm">
        <div className={classes}>
          <div className="container">
          <h3>No IMDB rating, or broken link?</h3>
          Submit IMDB link: <input type="text" name="title" value={this.state.value}
          onChange={this.handleChange.bind(this)} />
          
          <button onClick={this._submitForm}>Thank you!</button>
          </div>
        </div>
        <i className="fa fa-pencil fa-lg" aria-hidden="true" onClick={this._addForm}></i>
      </div>
    )

  }

  handleChange(event) {
    this.setState({value: event.target.value});
    console.log(this.state.value);
  }


  updateImdbId(netflixId, imdbId) {
    var that = this;
    console.log(netflixId);
    console.log(imdbId);
    var search = 'http://localhost:3000/flicks/' + netflixId + '/update?imdbId=' + imdbId ;
    console.log(search);
    fetch(search)
    .then(function(response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    })
    .then(function(response) {
      // console.log(rating);
      that.props.updateRating(response.rating, imdbId, response.votes);
    });
  }


  _addForm = () => {
    console.log(this.state.display);
    this.setState({ display: !this.state.display });
    console.log(this.state.display);
  }

  _submitForm = () => {
    console.log(this.state.value);
    console.log(this.props.netflixId);
    this.setState({ display: false });
    var imdbId = this.state.value.match(/^http:\/\/www.imdb.com\/title\/(.+)\//)[1];
    console.log(imdbId);
    this.updateImdbId(this.props.netflixId, imdbId);
  }

}

export default ImdbForm;