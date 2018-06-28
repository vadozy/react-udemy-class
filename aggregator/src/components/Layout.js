import React from 'react';

import Sidebar from './Sidebar';
import TableWrapper from './TableWrapper';

const layout = props => {
  return (
    <React.Fragment>
      <div className="layout">
        <Sidebar {...props} />
        <div className="main-area">
          <div className="app-title" style={{width: props.tableWidth}}><h2>PIR Sleeve Aggregator</h2></div>

          <div className="table-wrapper">

            <div className="uid-filter">
              <input placeholder="Find UID or Symbol" value={props.filters.security} onChange={ev => props.securityChange(ev.target.value)} />
            </div>

            <TableWrapper {...props} />

          </div>

        </div>
      </div>
    </React.Fragment>
  );
};

export default layout;