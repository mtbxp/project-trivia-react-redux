import React, { Component } from 'react';
import Header from '../components/Header';

export default class Feedback extends Component {
  render() {
    return (
      <>
        <Header />
        <p data-testid="feedback-text">test</p>
      </>
    );
  }
}
