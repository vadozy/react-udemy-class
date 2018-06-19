import React from 'react';

import Sidebar from './Sidebar';
import Table from './Table';

const layout = props => {
  return (
    <div className="layout">
      <Sidebar
        multisleeve={props.multisleeve}
        filters={props.filters}
        portfolioChange={props.portfolioChange}
        countryChange={props.countryChange}
        filterClick={props.filterClick}
      />
      <div className="main-area">
        <Table />
      </div>
    </div>
  );
};

export default layout;