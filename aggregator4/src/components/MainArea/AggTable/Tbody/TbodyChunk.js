import React, { Component } from 'react';
import Tr from './Tr/Tr';

class TbodyChunk extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.shouldUpdate;
  }

  render() {

    return this.props.rows.map((row, index) => (
          <Tr 
            key={row.uid}
            row={row}
            securityClick={this.props.securityClick}
            sidebarState={this.props.sidebarState} />
    ));

  }

}

export default TbodyChunk;