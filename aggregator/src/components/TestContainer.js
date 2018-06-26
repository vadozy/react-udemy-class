import React, { Component } from 'react';
import TestChunk from './TestChunk';

class TestContainer extends Component {

  currentChunk = 0;
  chunks = [] // array of chunks (each chunk is an array of data elements)

  constructor(props) {
    super(props);

    console.log('constructor(props) TestContainer');
    
    const chunkSize = props.chunkSize;

    for (let i = 0; i < props.data.length; i = i + chunkSize) {
      this.chunks.push(props.data.slice(i, i + chunkSize));
    }
  }

  componentDidUpdate() {
    console.log('componentDidUpdate() TestContainer');
  }

  render() {
    console.log('render() TestContainer');
    return (
      <div>
        <div style={{marginTop: "30px"}}>Dynamically rendered data below:</div>
        {this.chunks.map((chunk, i) => {
          return <TestChunk key={i} data={chunk} />
        })}
      </div>
    );
  }

}

export default TestContainer
