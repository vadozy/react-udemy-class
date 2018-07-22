import React, { Component } from 'react';
import Thead from './Thead/Thead';
import Tbody from './Tbody/Tbody';

class AggTable extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.renderTableDataOnly;
  }

  render() {

    if (!this.props.data.rowsToRender.length) return <h3 style={{color: "#AABBBB", margin: "50px auto", width: "50%"}} >Click a cell in the table</h3>; // no data to render

    return (

      <table className="agg-table">

        <Thead {...this.props} />

        <Tbody {...this.props} />

      </table>

    );
  }
}

export default AggTable;
