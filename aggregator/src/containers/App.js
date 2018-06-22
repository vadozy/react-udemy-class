import React, { Component } from 'react';

import Layout from '../components/Layout';
import G from './MockDataGenerator';

class App extends Component {

  state = G.init('nimulti').state;

  tableWidth () {
    const ret = (450 + this.state.data.sleeves.length * 31) + "px";
    console.log(ret);
    return ret;
  }

  portfolioChangeHandler = event => {
    const m = {...this.state.multisleeve};
    m.portfolio = event.target.value;
    this.setState(G.init(m.portfolio).state);
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

  sleeveToggleHandler = s => {

    const filters = {...this.state.filters};

    const ind = filters.selectedSleeves.indexOf(s);
    if (ind < 0) {
      filters.selectedSleeves.push(s);
    } else {
      filters.selectedSleeves.splice(ind, 1);
    }

    this.setState({filters: filters});

  }

  resetFiltersHandler = () => {

    const filters = {...this.state.filters};

    filters.security = null;
    filters.all = true;
    filters.aggregated = false;
    filters.ready = false;
    filters.progress = false;
    filters.rejected = false;

    filters.selectedSleeves = [];

    this.setState({
      filters: filters
    });
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

          tableWidth={this.tableWidth()}
          data={this.state.data}
          sleeveClick={this.sleeveToggleHandler}
        />
      </div>
    );
  }
}

export default App;
