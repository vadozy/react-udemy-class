import React from 'react';

import Sidebar from './Sidebar';
import TableWrapper from './TableWrapper';

const layout = props => {
  return (
    <React.Fragment>
      <div className="layout">
        <Sidebar />
        <div className="main-area">
          <div>Main Area</div>
          {/*<div className="app-title" style={{width: props.tableWidth}}><h2>PIR Sleeve Aggregator</h2></div>*/}
          {/*<TableWrapper {...props} />*/}
        </div>
      </div>
    </React.Fragment>
  );
};

export default layout;