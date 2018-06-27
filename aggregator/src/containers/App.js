import React, { Component } from 'react';

import Layout from '../components/Layout';
import G from './MockDataGenerator';

class App extends Component {

  //state = G.init('nimulti').state;

  delayedRefresh = null;

  refreshTableWithDelay = ms => {
    clearTimeout(this.delayedRefresh);

    this.delayedRefresh = setTimeout(() => {
      console.log("XXX");
      this.setState({refreshTable: true, showTableBody: true});
      //this.setState({refreshTable: false});

    }, ms);
  }

  tableWidth () {
    const ret = (450 + this.state.data.sleeves.length * 31) + "px";
    return ret;
  }

  sleeveToggleHandler = s => {

    const filters = {...this.state.filters};

    const ind = filters.selectedSleeves.indexOf(s);
    if (ind < 0) {
      filters.selectedSleeves.push(s);
    } else {
      filters.selectedSleeves.splice(ind, 1);
    }

    this.setState({filters: filters, refreshTable:false});
    this.refreshTableWithDelay(100);

  }

  securityChangeHandler = s => {
    const filters = {...this.state.filters};
    filters.security = s;

    this.setState({filters: filters, refreshTable:false});
    this.refreshTableWithDelay(800);
  }

  componentDidMount() {
    //this.refreshTableWithDelay(100); // Initial load of data
  }

  render() {
    return (
      <div className="app">
        <Layout />
      </div>
    );
  }
}

export default App;
