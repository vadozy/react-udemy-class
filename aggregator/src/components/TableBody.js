import React, { Component } from 'react';
import TableBodyChunk from './TableBodyChunk';

const CHUNK_DELAY_MS = 200;
const CHUNK_SIZE = 100; // number of table rows in one chunk

class TableBody extends Component {

  delayedChunkedRender = null;
  currentChunk = 0;
  chunks = []; // array of chunks (each chunk is an array of data elements)

  state = {
    update: true // always set state internally to true to trigger the update
  };

  externalChangeInitiated = props => {
    clearTimeout(this.delayedChunkedRender);
    this.delayedChunkedRender = null;
    this.currentChunk = 0;
    
    this.chunks.splice(0);
    for (let i = 0; i < props.rows.length; i = i + CHUNK_SIZE) {
      this.chunks.push(props.rows.slice(i, i + CHUNK_SIZE));
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
    this.externalChangeInitiated(props);
  }

  componentWillReceiveProps(nextProps) {
    this.externalChangeInitiated(nextProps);
  }

  componentDidUpdate() {
    const rendered = this.chunks.reduce((total, el, i) => { return i < this.currentChunk ? this.chunks[i].length + total : total}, 0)
    const total = this.props.rows.length;
    this.props.setFilteredRowsCount(rendered, total);

    this.scheduleNextChunkRender();
  }

  render() {

    const chunks = [];
    for (let i = 0; i <= this.currentChunk; i++) {
      chunks.push(<TableBodyChunk key={i} rows={this.chunks[i]} shouldUpdate={i === this.currentChunk}/>);
    }

    if (this.chunks[0] === undefined) return null;

    this.currentChunk++;

    return (
      <tbody>
        {chunks}
      </tbody>
    );

  }

}

export default TableBody;