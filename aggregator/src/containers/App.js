import React, { Component } from 'react';

import Layout from '../components/Layout';
import G from './MockDataGenerator';

class App extends Component {

  state = G.init('nimulti').state;

  visibleRows = 0;
  totalRows = 0;

  delayedRefresh = null;

  refreshTableWithDelay = ms => {
    clearTimeout(this.delayedRefresh);

    this.delayedRefresh = setTimeout(() => {
      //console.log("Inside Delayed Refresh: this.visibleRows=%s, this.totalRows=%s", this.visibleRows, this.totalRows);

      this.setState({refreshTable: true, showTableBody: true});

      this.setState({
        refreshTable: false,
        visibleRows: this.visibleRows,
        totalRows: this.totalRows});

    }, ms);
  }

  tableWidth () {
    const ret = (450 + this.state.data.sleeves.length * 31) + "px";
    return ret;
  }

  portfolioChangeHandler = event => {
    const m = {...this.state.multisleeve};
    m.portfolio = event.target.value;

    let state = G.init(m.portfolio).state;
    state.refreshTable = false;
    state.showTableBody = false;

    this.setState(state);
    this.refreshTableWithDelay(100);
  }

  countryChangeHandler = event => {
    const m = {...this.state.multisleeve};
    m.country = event.target.value;

    this.setState({multisleeve: m, refreshTable:false, visibleRows:0, totalRows:0});
    this.refreshTableWithDelay(100);
  }

  filterToggleHandler = v => {
    const f = {...this.state.filters};
    f[v] = !f[v];
    this.reconcileFilterChecks(f, v);
    
    this.setState({filters: f, refreshTable:false, visibleRows:0, totalRows:0});
    this.refreshTableWithDelay(100);

  }

  sleeveToggleHandler = s => {

    const filters = {...this.state.filters};

    const ind = filters.selectedSleeves.indexOf(s);
    if (ind < 0) {
      filters.selectedSleeves.push(s);
    } else {
      filters.selectedSleeves.splice(ind, 1);
    }

    this.setState({filters: filters, refreshTable:false, visibleRows:0, totalRows:0});
    this.refreshTableWithDelay(100);

  }

  resetFiltersHandler = () => {

    const filters = {...this.state.filters};

    filters.security = "";
    filters.all = true;
    filters.aggregated = false;
    filters.ready = false;
    filters.progress = false;
    filters.rejected = false;

    filters.selectedSleeves.splice(0);

    this.setState({filters: filters, refreshTable:false, visibleRows:0, totalRows:0});
    this.refreshTableWithDelay(100);

  }

  securityChangeHandler = s => {
    const filters = {...this.state.filters};
    filters.security = s;

    this.setState({filters: filters, refreshTable:false, visibleRows:0, totalRows:0});
    this.refreshTableWithDelay(800);
  }

  updateCountsHandler = (visibleRows, totalRows) => {
    this.visibleRows = visibleRows;
    this.totalRows = totalRows;
    //console.log("Inside updateCountsHandler", this.visibleRows, this.totalRows);
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

  componentDidMount() {
    //this.refreshTableWithDelay(100); // Initial load of data
  }

  render() {
    return (
      <div className="app">
        <Layout
          multisleeve={this.state.multisleeve}
          filters={this.state.filters}
          portfolioChange={this.portfolioChangeHandler}
          countryChange={this.countryChangeHandler}
          filterClick={this.filterToggleHandler}
          resetFiltersClick={this.resetFiltersHandler}
          visibleRows={this.state.visibleRows}
          totalRows={this.state.totalRows}

          tableWidth={this.tableWidth()}
          data={this.state.data}
          sleeveClick={this.sleeveToggleHandler}
          securityChange={this.securityChangeHandler}
          refreshTable={this.state.refreshTable}
          showTableBody={this.state.showTableBody}
          updateCounts={this.updateCountsHandler}
        />
      </div>
    );
  }
}

export default App;
