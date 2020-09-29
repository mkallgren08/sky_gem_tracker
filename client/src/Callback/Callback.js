import React, { Component } from 'react';
import loading from './loading.svg';

class Callback extends Component {
  render() {
    const style = {
      display: 'flex',
      justifyContent: 'center',
      height: '100vh',
      width: '100vw',
      backgroundColor: 'white',
    }

    return (
      <div style={style}>
        <img src={loading} alt="loading"/>
      </div>
    );
  }
}

export default Callback;