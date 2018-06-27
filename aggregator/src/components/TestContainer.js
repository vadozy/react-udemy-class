import React, { Component } from 'react';
import TestChunk from './TestChunk';

const CHUNK_DELAY_MS = 2000;

class TestContainer extends Component {

  delayedChunkedRender = null;
  currentChunk = 0;
  chunks = []; // array of chunks (each chunk is an array of data elements)

  state = {
    update: true // always set state internally to true to trigger the update
  };

  externalChangeInitiated = props => {
    console.log('externalChangeInitiated TestContainer');
    clearTimeout(this.delayedChunkedRender);
    this.delayedChunkedRender = null;
    this.currentChunk = 0;
    
    const chunkSize = props.chunkSize;
    this.chunks.splice(0);
    for (let i = 0; i < props.data.length; i = i + chunkSize) {
      this.chunks.push(props.data.slice(i, i + chunkSize));
    }
  }

  scheduleNextChunkRender = () => {
    if (this.currentChunk < this.chunks.length) {
      this.delayedChunkedRender = setTimeout(() => {
        this.setState({update: true})
      }, CHUNK_DELAY_MS);
    }
  }

  constructor(props) {
    super(props);

    console.log('constructor(props) TestContainer');
    this.externalChangeInitiated(props);
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps(nextProps) TestContainer');
    this.externalChangeInitiated(nextProps);
  }

  componentDidUpdate() {
    console.log('componentDidUpdate() TestContainer');
  }

  componentDidMount() {
    console.log('componentDidMount() TestContainer');
  }

  render() {
    console.log('render() TestContainer');

    const chunks = [];
    for (let i = 0; i <= this.currentChunk; i++) {
      chunks.push(<TestChunk key={i} shouldUpdate={i === this.currentChunk} data={this.chunks[i]} />);
    }

    this.currentChunk++;

    this.scheduleNextChunkRender();

    return (
      <div>
        <div style={{marginTop: "30px"}}>Dynamically rendered data below:</div>
        {chunks}
      </div>
    );
  }

}

export default TestContainer
