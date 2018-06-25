import React from 'react';
import Table from './Table';

const tableWrapper = props => {

  return (
    <div className="table-wrapper">
      <div className="uid-filter">
        <input placeholder="Find UID or Symbol" value={props.filters.security} onChange={ev => props.securityChange(ev.target.value)} />
      </div>

      <Table {...props} />

    </div>
  );
};

export default tableWrapper;