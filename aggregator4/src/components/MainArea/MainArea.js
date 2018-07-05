import React, { Component } from 'react';

import LoadStateSection from './LoadStateSection/LoadStateSection';
import AggTable from './AggTable/AggTable';

class MainArea extends Component {

  render() {
    return (
      <div className="main-area">
        <LoadStateSection {...this.props} />
        <AggTable {...this.props} />
      </div>
    );
  }
}

export default MainArea;
