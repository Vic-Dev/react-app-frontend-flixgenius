import React from 'react';
import AppBody from './AppBody.jsx';
import Header from './Header.jsx';
import MovieBox from './MovieBox.jsx';

const DATA = [
      {
        id: 1,
        name: 'The Matrix',
        imgUrl: 'http://placehold.it/250x250',
        description: 'This is a movie about stuff',
        rating: 9.0
      },
      {
        id: 2,
        name: 'Memento',
        imgUrl: 'http://placehold.it/250x250',
        description: 'He forgets things and puts tattoos on his body',
        rating: 9.5
      },
      {
        id: 3,
        name: 'Titanic',
        imgUrl: 'http://placehold.it/250x250',
        description: 'He forgets things and puts tattoos on his body',
        rating: 7
      },
      {
        id: 4,
        name: 'The Lion King',
        imgUrl: 'http://placehold.it/250x250',
        description: 'He forgets things and puts tattoos on his body',
        rating: 9.5
      },
      {
        id: 5,
        name: 'Godzilla',
        imgUrl: 'http://placehold.it/250x250',
        description: 'He forgets things and puts tattoos on his body',
        rating: 9.5
      }                        
    ]

class App extends React.Component {

  state = {
    data: DATA,
    filtered: false
  }

  render() {

    const movieBoxes = this.state.data.map(val => {
      return <MovieBox 
        key={val.id} 
        name={val.name} 
        imgUrl={val.imgUrl} 
        description={val.description} 
        rating={val.rating} 
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