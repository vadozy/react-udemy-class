import React, { Component } from 'react';

import Layout from '../components/Layout';
import G from './MockDataGenerator';

class App extends Component {

  state = {

    multisleeve: {
      portfolios: ['10sleeves', 'nimulti', '30sleeves', '50sleeves'], //, '70sleeves', '100sleeves'], // portfolios drop-down values
      portfolio: 'nimulti', // portfolios drop-down currently selected value
      countries: ['East', 'West'], // countries drop-down values
      country: 'West' // countries drop-down currently selected value
    },

    filters: {

      security: "", // Security search textbox
      selectedSleeves: [], // These are selected table headers

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

    },

    shouldTableWrapperUpdate: false,
    filteredRowsCount: 0,
    filteredRowsRenderedCount: 0
  }

  data = {
    sleeves: [],
    weights: [],
    rows: []
  }

  delayedRefresh = null;

/*
  refreshTableWithDelay = ms => {
    clearTimeout(this.delayedRefresh);

    this.delayedRefresh = setTimeout(() => {
      console.log("XXX");
      this.setState({refreshTable: true, showTableBody: true});
      //this.setState({refreshTable: false});

    }, ms);
  }
*/

  _tableWidth () {
    return (450 + this.data.sleeves.length * 31) + "px";
  }

  portfolioChangeHandler = event => {
    const m = {...this.state.multisleeve};
    m.portfolio = event.target.value;
    this.data = G.getData(m.portfolio, {...this.state.filters});
    this._updateState({multisleeve: m, shouldTableWrapperUpdate:true});
  }

  countryChangeHandler = event => {
    const m = {...this.state.multisleeve};
    m.country = event.target.value;
    this.setState({multisleeve: m, shouldTableWrapperUpdate:true});
  }

  filterToggleHandler = v => {
    const f = {...this.state.filters};
    f[v] = !f[v];
    this._reconcileFilterChecks(f, v);
    this.setState({filters: f, shouldTableWrapperUpdate:true});
  }

  filteredRowsCountHandler = (v1, v2) => {
    this.setState({filteredRowsRenderedCount: v1, filteredRowsCount: v2, shouldTableWrapperUpdate:false});
  }

  _reconcileFilterChecks(f, v) {
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

  _computeRowCounts(rows) {

    const ret = {
      allCount: 0,
      aggregatedCount: 0,
      readyCount: 0,
      progressCount: 0,
      rejectedCount: 0
    }


    rows.forEach(row => {
      ret.allCount++;

      if (row.total.status === 'aggregated') {
        ret.aggregatedCount++;
      } else if (row.total.status === 'approved') {
        ret.readyCount++;
      } else if (row.total.status === 'in-progress') {
        ret.progressCount++;
      } else if (row.total.status === 'reject') {
        ret.rejectedCount++;
      }
    })

    return ret;

  }

  _setCounts(newState, cnt) {
    newState.filters.allCount = cnt.allCount;
    newState.filters.aggregatedCount = cnt.aggregatedCount;
    newState.filters.readyCount = cnt.readyCount;
    newState.filters.progressCount = cnt.progressCount;
    newState.filters.rejectedCount = cnt.rejectedCount;
  }

  _updateState(o) {
    const cnt = this._computeRowCounts(this.data.rows);
    const newState = {...this.state, ...o}
    this._setCounts(newState, cnt);
    this.setState(newState);
  }

  resetFiltersHandler = () => {

    const filters = {...this.state.filters};

    filters.security = "";
    filters.selectedSleeves.splice(0);

    filters.all = true;
    filters.aggregated = false;
    filters.ready = false;
    filters.progress = false;
    filters.rejected = false;

    this.setState({filters: filters, shouldTableWrapperUpdate:true});
  }

  securityChangeHandler = s => {
    const filters = {...this.state.filters};
    filters.security = s;

    this.setState({filters: filters, shouldTableWrapperUpdate:true});
  }

  sleeveToggleHandler = s => {

    const filters = {...this.state.filters};

    const ind = filters.selectedSleeves.indexOf(s);
    if (ind < 0) {
      filters.selectedSleeves.push(s);
    } else {
      filters.selectedSleeves.splice(ind, 1);
    }

    this.setState({filters: filters, shouldTableWrapperUpdate:true});

  }

  componentDidMount() {
    this.data = G.getData('nimulti', {...this.state.filters});
    this._updateState({shouldTableWrapperUpdate: true});
  }

  render() {
    return (
      <div className="app">
        <Layout {...this.state} 
          tableWidth={this._tableWidth()}
          portfolioChange={this.portfolioChangeHandler}
          countryChange={this.countryChangeHandler}
          filterToggle={this.filterToggleHandler}
          resetFilters={this.resetFiltersHandler}
          securityChange={this.securityChangeHandler}
          sleeveClick={this.sleeveToggleHandler}

          data={this.data}

          setFilteredRowsCount={this.filteredRowsCountHandler}
        />
      </div>
    );
  }
}

export default App;
