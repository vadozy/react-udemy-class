import React, { Component } from 'react';
import TbodyChunk from './TbodyChunk';

const CHUNK_DELAY_MS = 800; // milliseconds between chunk renders
const CHUNK_SIZE     = 100; // number of rows in one chunk

class Tbody extends Component {

  delayedChunkedRender = null;
  currentChunk = 0;
  chunks = []; // array of chunks (each chunk is an array of data elements)

  state = {
    update: true // always set state internally to true to trigger the update
  };

  globalCounter = 0; // used to create unique chunk id

  t0 = performance.now();
  t1 = performance.now();

  externalChangeInitiated = props => {
    clearTimeout(this.delayedChunkedRender);
    this.delayedChunkedRender = null;
    this.currentChunk = 0;
    
    this.chunks.splice(0);
    for (let i = 0; i < props.data.rowsToRender.length; i = i + CHUNK_SIZE) {
      this.chunks.push(props.data.rowsToRender.slice(i, i + CHUNK_SIZE));
    }
    console.log(`globalCounter = ${this.globalCounter}`)
    this._incrementGlobalCounter(this.chunks.length);

  }

  scheduleNextChunkRender = () => {

    this.t0 = this.t1;
    this.t1 = performance.now();
    console.log(`scheduleNextChunkRender true CHUNK_DELAY_MS ${this.t1 - this.t0} milliseconds`);

    const rendered = this.chunks.reduce((total, el, i) => { return i < this.currentChunk ? this.chunks[i].length + total : total}, 0)
    console.log(`Rendered ${rendered} rows`);
    this.props.setRenderedRowsCount(rendered);

    if (this.currentChunk < this.chunks.length) {
      this.delayedChunkedRender = setTimeout(() => {
        this.setState({update: true});
      }, CHUNK_DELAY_MS);
    }
  }

  constructor(props) {
    super(props);
    this.externalChangeInitiated(props);
  }

  componentWillReceiveProps(nextProps) {
    this.externalChangeInitiated(nextProps);
  }

  componentWillUnmount() {
    // To prevent the memory leak when the table is unmounted 
    // which happens when user uuncheck all the cells in the 
    // aggregation status summary table above.
    clearTimeout(this.delayedChunkedRender);
    this.delayedChunkedRender = null;
  }

  componentDidMount() {
    this.scheduleNextChunkRender();
  }

  componentDidUpdate() {
    this.scheduleNextChunkRender();
  }

  // Used to generate a unique value for chunk key (like a primary identity column)
  _incrementGlobalCounter(increment) {
    if (this.globalCounter > 1000000) {
      this.globalCounter = 0;
    } else {
      this.globalCounter += increment;
    }
  }

  render() {

    const chunks = [];
    for (let i = 0; i <= this.currentChunk; i++) {
      chunks.push(<TbodyChunk
        key={i + this.globalCounter}
        rows={this.chunks[i]}
        securityClick={this.props.securityClick}
        shouldUpdate={i === this.currentChunk}
        sidebarState={this.props.sidebarState} />);

    }

    if (this.chunks[0] === undefined) return null;

    this.currentChunk++;

    return chunks;
  }
}

export default Tbody;