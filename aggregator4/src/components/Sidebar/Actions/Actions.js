import React from 'react';

const actions = props => {
  return(
    <section className="sidebar-section">
      <h4>Actions</h4>
      <div className="align-sidebar-button">
        <button className="clear-filters-button" onClick={props.resetFilters}>Reset Filters</button>
      </div>
      <div className="align-sidebar-button">
        <button className="agg-button">Aggregate</button>
      </div>
    </section>
  );
}

export default actions;
