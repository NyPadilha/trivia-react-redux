import React, { Component } from 'react';

export default class Game extends Component {
  componentDidMount() {
    const token = JSON.parse(localStorage.getItem('token'));
    console.log(token);
  }

  render() {
    return (
      <div>      </div>
    );
  }
}
