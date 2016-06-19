import React from 'react';

class AppBody extends React.Component {

  render() {
    return (
      <div classname="appBody">
      { this.props.children }
      </div>
    )
  }
  
}

export default AppBody;