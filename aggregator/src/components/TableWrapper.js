import React, { Component } from 'react';
import Table from './Table';

class TableWrapper extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.shouldTableWrapperUpdate;
  }

  render() {
    return (
        <Table {...this.props} />
    )
  }
}

export default TableWrapper;