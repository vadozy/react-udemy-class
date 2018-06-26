import React from 'react';
import Table from './Table';
import TestContainer from './TestContainer';

const tableWrapper = props => {

  return (
    <div className="table-wrapper">
      <TestContainer data={['Test 1', 'Test 2', 'Test 3', 'Test 4', 'Test 1', 'Test 2', 'Test 3', 'Test 4']} chunkSize={3} />
      <div className="uid-filter">
        <input placeholder="Find UID or Symbol" value={props.filters.security} onChange={ev => props.securityChange(ev.target.value)} />
      </div>

      <Table {...props} />

    </div>
  );
};

export default tableWrapper;