import React, { Component } from 'react';

class Sidebar extends Component {

  state = {

    multisleeve: {
      portfolios: ['10sleeves', 'nimulti', '30sleeves', '50sleeves', '70sleeves', '100sleeves'], // portfolios drop-down values
      portfolio: 'nimulti', // portfolios drop-down currently selected value
      countries: ['East', 'West'], // countries drop-down values
      country: 'West' // countries drop-down currently selected value
    },

    filters: {

      security: "",

      all: true,
      allCount: 0,

      aggregated: false,
      aggregatedCount: 0,

      ready: false,
      readyCount: 0,

      progress: false,
      progressCount: 0,

      rejected: false,
      rejectedCount: 0

    }

  }

  portfolioChangeHandler = event => {
    const m = {...this.state.multisleeve};
    m.portfolio = event.target.value;
    this.setState({multisleeve: m});
  }

  countryChangeHandler = event => {
    const m = {...this.state.multisleeve};
    m.country = event.target.value;
    this.setState({multisleeve: m});
  }

  filterToggleHandler = v => {
    const f = {...this.state.filters};
    f[v] = !f[v];
    this.reconcileFilterChecks(f, v);
    this.setState({filters: f});
  }

  reconcileFilterChecks(f, v) {
    if (f.aggregated === false &&
        f.ready === false &&
        f.progress === false &&
        f.rejected === false) {
      f.all = true;
    } else if (v !== "all") {
      f.all = false;
    }
    
    if (f.all) {
      f.aggregated = false;
      f.ready = false;
      f.progress = false;
      f.rejected = false;
    }
  }

  resetFiltersHandler = () => {

    const filters = {...this.state.filters};

    filters.security = "";
    filters.all = true;
    filters.aggregated = false;
    filters.ready = false;
    filters.progress = false;
    filters.rejected = false;

    this.setState({filters: filters});
  }

  render() {

    return (
      <div className="sidebar">

        <section className="sidebar-section">
          <div className="sidebar-element-container">
            <div className="sidebar-element-1">
              Collapsed Portfolio
            </div>
            <div className="sidebar-element-2">
              <select value={this.state.multisleeve.portfolio} onChange={this.portfolioChangeHandler} >
                {this.state.multisleeve.portfolios.map(v => (<option key={v} value={v}>{v}</option>))}
              </select>
            </div>
          </div>
          <div className="sidebar-element-container">
            <div className="sidebar-element-1">
              Country Group
            </div>
            <div className="sidebar-element-2">
              <select value={this.state.multisleeve.country} onChange={this.countryChangeHandler} >
                {this.state.multisleeve.countries.map(v => (<option key={v} value={v}>{v}</option>))}
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
            <div className={["sidebar-element-container", this.state.filters.all ? "active" : null].join(' ')} onClick={() => this.filterToggleHandler("all")}>
              <div className="color-filter-element-1">
                All
              </div>
              <div className="color-filter-element-2">
                {this.state.filters.allCount}
              </div>
            </div>
            <div className={["sidebar-element-container", this.state.filters.aggregated ? "active" : null].join(' ')} onClick={() => this.filterToggleHandler("aggregated")}>
              <div className="aggregated color-filter-element-1">
                <span className="padding-left-10" >Aggregated</span>
              </div>
              <div className="color-filter-element-2">
                {this.state.filters.aggregatedCount}
              </div>
            </div>
            <div className={["sidebar-element-container", this.state.filters.ready ? "active" : null].join(' ')} onClick={() => this.filterToggleHandler("ready")}>
              <div className="approved color-filter-element-1">
                <span className="padding-left-10" >Ready for Aggr</span>
              </div>
              <div className="color-filter-element-2">
                {this.state.filters.readyCount}
              </div>
            </div>
            <div className={["sidebar-element-container", this.state.filters.progress ? "active" : null].join(' ')} onClick={() => this.filterToggleHandler("progress")}>
              <div className="in-progress color-filter-element-1">
                <span className="padding-left-10" >In Progress</span>
              </div>
              <div className="color-filter-element-2">
                {this.state.filters.progressCount}
              </div>
            </div>
            <div className={["sidebar-element-container", this.state.filters.rejected ? "active" : null].join(' ')} onClick={() => this.filterToggleHandler("rejected")}>
              <div className="reject color-filter-element-1">
                <span className="padding-left-10" >Rejected</span>
              </div>
              <div className="color-filter-element-2">
                {this.state.filters.rejectedCount}
              </div>
            </div>
          </div>

        </section>

        <section className="sidebar-section">
          <h4>Actions</h4>
          <div className="align-center">
            <button className="clear-filters-button" onClick={this.resetFiltersHandler} >Reset Filters</button>
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
    );
  } // End of render() method
} // End of class Sidebar

export default Sidebar;