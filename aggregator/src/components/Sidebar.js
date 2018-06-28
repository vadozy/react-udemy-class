import React from 'react';

const sidebar = props => {

  return (
    <div className="sidebar">

      <section className="sidebar-section">
        <div className="sidebar-element-container">
          <div className="sidebar-element-1">
            Collapsed Portfolio
          </div>
          <div className="sidebar-element-2">
            <select value={props.multisleeve.portfolio} onChange={props.portfolioChange} >
              {props.multisleeve.portfolios.map(v => (<option key={v} value={v}>{v}</option>))}
            </select>
          </div>
        </div>
        <div className="sidebar-element-container">
          <div className="sidebar-element-1">
            Country Group
          </div>
          <div className="sidebar-element-2">
            <select value={props.multisleeve.country} onChange={props.countryChange} >
              {props.multisleeve.countries.map(v => (<option key={v} value={v}>{v}</option>))}
            </select>
          </div>
        </div>
        <div className="sidebar-element-container">
          <div className="sidebar-element-1">
            
          </div>
          <div className="sidebar-element-2">
            <button className="load-button">Load</button>
          </div>
        </div>
      </section>
      <section className="sidebar-section">
        <h4>Aggregation Status</h4>

        <div className="color-filter">
          <div className={["sidebar-element-container", props.filters.all ? "active" : null].join(' ')} onClick={() => props.filterToggle("all")}>
            <div className="color-filter-element-1">
              All
            </div>
            <div className="color-filter-element-2">
              {props.filters.allCount}
            </div>
          </div>
          <div className={["sidebar-element-container", props.filters.aggregated ? "active" : null].join(' ')} onClick={() => props.filterToggle("aggregated")}>
            <div className="aggregated color-filter-element-1">
              <span className="padding-left-10" >Aggregated</span>
            </div>
            <div className="color-filter-element-2">
              {props.filters.aggregatedCount}
            </div>
          </div>
          <div className={["sidebar-element-container", props.filters.ready ? "active" : null].join(' ')} onClick={() => props.filterToggle("ready")}>
            <div className="approved color-filter-element-1">
              <span className="padding-left-10" >Ready for Aggr</span>
            </div>
            <div className="color-filter-element-2">
              {props.filters.readyCount}
            </div>
          </div>
          <div className={["sidebar-element-container", props.filters.progress ? "active" : null].join(' ')} onClick={() => props.filterToggle("progress")}>
            <div className="in-progress color-filter-element-1">
              <span className="padding-left-10" >In Progress</span>
            </div>
            <div className="color-filter-element-2">
              {props.filters.progressCount}
            </div>
          </div>
          <div className={["sidebar-element-container", props.filters.rejected ? "active" : null].join(' ')} onClick={() => props.filterToggle("rejected")}>
            <div className="reject color-filter-element-1">
              <span className="padding-left-10" >Rejected</span>
            </div>
            <div className="color-filter-element-2">
              {props.filters.rejectedCount}
            </div>
          </div>
        </div>

      </section>

      <section className="sidebar-section">
        <h4>Actions</h4>
        <div className="align-center">
          <button className="clear-filters-button" onClick={props.resetFilters} >Reset Filters</button>
        </div>
        <div className="align-center">
          <button className="agg-button">Aggregate</button>
        </div>
      </section>

      <section className="sidebar-section">
        <h4>Legend</h4>

        <ul className="legend-list">
          <li className="item">
            Click a sim title to filter
          </li>
          <li className="item">
            Use UID lookup to find a security
          </li>
          <li className="item">
            Click Aggregate button to save net fund weight for collapsed PIR sim target load
          </li>
        </ul>

      </section>
    </div>
  ); // End of return

}

export default sidebar;