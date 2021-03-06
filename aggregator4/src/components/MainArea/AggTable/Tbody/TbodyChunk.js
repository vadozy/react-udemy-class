import React, { Component } from 'react';
import Tr from './Tr/Tr';

class TbodyChunk extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.shouldUpdate;
  }

  render() {

    return <tbody> 
        {this.props.rows.map((row, index) => (<Tr 
          key={row.uid}
          row={row}
          disabledSleeves={this.props.disabledSleeves}
          securityClick={this.props.securityClick}
          sidebarState={this.props.sidebarState} /> ))}
      </tbody>;

  }

}

export default TbodyChunk;