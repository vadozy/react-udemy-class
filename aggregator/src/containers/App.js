import React, { Component } from 'react';

import Layout from '../components/Layout';

class App extends Component {

  state = {

    multisleeve: {
      portfolios: ['10sleeves', 'nimulti', '30sleeves', '50sleeves', '70sleeves', '100sleeves'], // portfolios drop-down values
      portfolio: 'nimulti', // portfolios drop-down currently selected value
      countries: ['East', 'West', 'Some very long contry name'], // countries drop-down values
      country: 'West', // countries drop-down currently selected value
    },

    filters: {

      security: null,

      all: true,
      allCount: 1900,

      aggregated: false,
      aggregatedCount: 1000,

      ready: false,
      readyCount: 500,

      progress: false,
      progressCount: 250,

      rejected: false,
      rejectedCount: 150

    },

    data: {

    }

  };

  portfolioChangeHandler = event => {
    const m = {...this.state.multisleeve};
    m.portfolio = event.target.value;
    this.setState({multisleeve: m});
  };

  countryChangeHandler = event => {
    const m = {...this.state.multisleeve};
    m.country = event.target.value;
    this.setState({multisleeve: m});
  };

  filterToggleHandler = v => {
    const f = {...this.state.filters};
    f[v] = !f[v];
    this.reconcileFilterChecks(f, v);
    this.setState({filters: f});
  };

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
        />
      </div>
    );
  }
}

export default App;
