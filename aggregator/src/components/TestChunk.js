import React, { Component } from 'react';
import TestItem from './TestItem';

class TestChunk extends Component {

  render() {
    return this.props.data.map((line, i) => <TestItem key={i} line={line} />);
  }
}

export default TestChunk;
