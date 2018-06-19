import React from 'react';

import reloadIcon from '../assets/reload.png';


const sidebar = props => {

  return (

    <div className="sidebar">

      <h3>PIR Sleeve Aggregator</h3>

        <section className="sidebar-section">
          <h4>
            Multi-Sleeve Portfolio
            <img src={reloadIcon} className="reload" alt="Reload" title="refresh the page data" />
          </h4>
          <div className="sidebar-element-container">
            <div className="sidebar-element-1">
              Portfolio
            </div>
            <div className="sidebar-element-2">
              <select value={props.multisleeve.portfolio} onChange={props.portfolioChange} >
                {props.multisleeve.portfolios.map(v => (<option key={v} value={v}>{v}</option>))}
              </select>
            </div>
          </div>
          <div className="sidebar-element-container">
            <div className="sidebar-element-1">
              Country
            </div>
            <div className="sidebar-element-2">
              <select value={props.multisleeve.country} onChange={props.countryChange} >
                {props.multisleeve.countries.map(v => (<option key={v} value={v}>{v}</option>))}
              </select>
            </div>
          </div>
        </section>

        <section className="sidebar-section">
          <h4>Filters</h4>

          <div className="sidebar-element-container">
            <div className="sidebar-element-1">
              UID / Symbol
            </div>
            <div className="sidebar-element-2">
              <input placeholder="UID or Symbol"/>
            </div>
          </div>

          <div className="color-filter">
            <div className={["sidebar-element-container", props.filters.all ? "active" : null].join(' ')} onClick={() => props.filterClick("all")}>
              <div className="padding-left-5 color-filter-element-1">
                All
              </div>
              <div className="color-filter-element-2">
                {props.filters.allCount}
              </div>
            </div>
            <div className={["sidebar-element-container", props.filters.aggregated ? "active" : null].join(' ')} onClick={() => props.filterClick("aggregated")}>
              <div className="padding-left-5 aggregated color-filter-element-1">
                Aggregated
              </div>
              <div className="color-filter-element-2">
                {props.filters.aggregatedCount}
              </div>
            </div>
            <div className={["sidebar-element-container", props.filters.ready ? "active" : null].join(' ')} onClick={() => props.filterClick("ready")}>
              <div className="padding-left-5 approved color-filter-element-1">
                Ready for Agg
              </div>
              <div className="color-filter-element-2">
                {props.filters.readyCount}
              </div>
            </div>
            <div className={["sidebar-element-container", props.filters.progress ? "active" : null].join(' ')} onClick={() => props.filterClick("progress")}>
              <div className="padding-left-5 in-progress color-filter-element-1">
                In Progress
              </div>
              <div className="color-filter-element-2">
                {props.filters.progressCount}
              </div>
            </div>
            <div className={["sidebar-element-container", props.filters.rejected ? "active" : null].join(' ')} onClick={() => props.filterClick("rejected")}>
              <div className="padding-left-5 reject color-filter-element-1">
                Review or Rejected
              </div>
              <div className="color-filter-element-2">
                {props.filters.rejectedCount}
              </div>
            </div>
          </div>


          <div style={{marginTop: "5px"}}>
            <button className="clear-filters-button">Clear All Filters</button>
          </div>

        </section>

        <section className="sidebar-section">
          <h4>Send Aggregate Request</h4>
          <div><button className="agg-button">Aggregate</button></div>
        </section>

    </div>
  );

};

export default sidebar;