import React, { Component } from 'react';
import Thead from './Thead/Thead';
import Tbody from './Tbody/Tbody';

class AggTable extends Component {

  keydownHandler = event => {
    if(event.keyCode === 65) {
      // A/a key was pressed
      this.props.selectAllRows();
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this.keydownHandler, false);
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this.keydownHandler, false);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.renderTableDataOnly;
  }

  render() {

    if (!this.props.data.rowsToRender.length) return <h3 style={{color: "#AABBBB", margin: "50px auto", width: "50%"}} >Click a cell in the table</h3>; // no data to render

    return (

      <table className="agg-table data-table">

        <Thead {...this.props} />

        <Tbody {...this.props} />

      </table>

    );
  }
}

export default AggTable;
