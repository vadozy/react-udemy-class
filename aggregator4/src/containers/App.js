import React, { Component } from 'react';

import C from '../util/constants';
import Sidebar from '../components/Sidebar/Sidebar';
import MainArea from '../components/MainArea/MainArea';

import G from '../util/MockDataGenerator';
import D from '../util/DataHandler';

class App extends Component {

  /* 
   * This boolean flag is the only property of the App state.
   * If false, the big table data rendering will not be triggered.
   * If true, then only the big table will be triggered.
   */
  state = {
    renderTableDataOnly: false
  };

  /*
   * Copy of the state maintained by Sidebar component. This copy is needed here at App level, 
   * so we can pass it to the component responsible for filtering/rendering the data.
   */
  sidebarState = {
    portfolio: '',

    dataGridContent: C.SIDEBAR_SLEEVE_EOD_WEIGHT,
    security: ''
  };

  /* This is the main data received from the server, and StatusSummary data is derived from it */
  data = {
    /* Data from the server */
    sleeves: [],
    weights: [],
    rows: [],

   /*
    * Instance of StatusSummary class.
    *
    * It contains aggregation Status Summary counts (numbers) populated when the data is first loaded 
    * for a given collapsed sim target portfolio. This is used to render Aggregation Status Summary table
    * It also contains selection state for each count, originally set to false but can change based on 
    * user interaction with the Aggregation Status Summary table cells.
    */
    statusSummary: null,
    sortedBy: {index: -1, ascending: true}, // sleeve index by which rendered data is sorted

    /* 
     * Next is the data (sorted and filtered) which is rendered to the browser 
     * It is a subset of rows
     */
    rowsToRender: [],
    renderedCount: 0, // number of rows visible to user this moment
    totalRenderCount: 0 // number of rows to be visible to users after all rows are rendered
  }

  /*
   * hashmap where uid is the key and the value is object with security properties (symbol, currency, etc.)
   */
  selectedSecurity = Object.create(null);

  sidebarStateUpdateHandler = newSidebarState => {
    this.sidebarState = {...this.sidebarState, ...newSidebarState};
    this.renderTableData();
    //console.log(this.sidebarState);
  }

  loadPortfolioData = portfolio => {
    this.clearMainAreaFilters();
    console.log('Loading Portfolio ' + portfolio + ' from backend');

    // Next two lines bring the spinner in the main area
    this.data.sleeves = []; // show the spinner
    this.setState({renderTableDataOnly: false}); // trigger rendering

    setTimeout(() => {
      const data = G.getData(portfolio);
      this.data.sleeves = data.sleeves;
      this.data.weights = data.weights;
      this.data.rows = data.rows;

      this.data.statusSummary = D.computeStatusSummary(this.data.rows);
      //console.log(this.data.statusSummary);
      console.log('Loaded Portfolio ' + portfolio + ' with ' + this.data.rows.length + ' rows');
      this.renderTableData();
    }, 1000); // VADIM -- emulates Ajax call
  }

  clearMainAreaFilters = () => {
    this.data.sortedBy.index = -1;
  }

  renderTableData = () => {
    this.data.rowsToRender = D.sortAndFilter(this.data.rows, this.data.statusSummary, this.data.sortedBy, this.sidebarState);
    this.data.totalRenderCount = this.data.rowsToRender.length;
    this.data.renderedCount = 0;
    this.selectedSecurity = Object.create(null);
    //console.log("this.setState({renderTableDataOnly: true})");
    this.setState({renderTableDataOnly: true});
  }

  sleeveClickedHandler = i => {
    if (this.data.sortedBy.index === i) {
      this.data.sortedBy.ascending = !this.data.sortedBy.ascending;
    } else {
      this.data.sortedBy.index = i;
      this.data.sortedBy.ascending = true;
    }
    this.renderTableData();
  }

  aggStatusSummaryClickedHandler = (status, i, isTotal) => {
    if (isTotal) {
      this.data.statusSummary[status].totalSelected = !this.data.statusSummary[status].totalSelected;
    } else {
      this.data.statusSummary[status].countsPerSleeveSelected[i] = !this.data.statusSummary[status].countsPerSleeveSelected[i];
    }
    D.reconcileStatusSummarySelections(this.data.statusSummary, status, i, isTotal);
    this.renderTableData();
  }

  setRenderedRowsCountHandler = rendered => {
    this.data.renderedCount = rendered;
    this.setState({renderTableDataOnly: false}); // to cause the sidebar to update this count
  }

  resetFiltersHandler = () => {
    this.clearMainAreaFilters();
    this.data.statusSummary.clearAllSelections();
    this.renderTableData();
  }

  rowClickGlobalHandler = (isSelected, security) => {
    if (isSelected) {
      this.selectedSecurity[security.uid] = security; // add to the map
    } else {
      delete this.selectedSecurity[security.uid]; // remove from the map
    }
    console.log(this.selectedSecurity);
    this.setState({renderTableDataOnly: false}); // to cause the sidebar to update the legend
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.renderTableDataOnly) {
      console.log("Resetting renderTableDataOnly to false");
      this.setState({renderTableDataOnly: false});
    }
  }

  render() {
    return (
      <main className="app">

        <div className="app-title"><h2>PIR Sleeve Aggregator</h2></div>
        <div className="sidebar-main-container">
          <Sidebar
            sidebarStateUpdate={this.sidebarStateUpdateHandler}
            loadPortfolioData={this.loadPortfolioData}
            renderTableDataOnly={this.state.renderTableDataOnly}
            resetFilters={this.resetFiltersHandler} 
            renderedCount={this.data.renderedCount}
            totalRenderCount={this.data.totalRenderCount}
            selectedSecurity={this.selectedSecurity}  />

          {this.data.sleeves.length === 0 ? <div className="loader">Loading...</div> : 
            <MainArea 
              data={this.data}
              renderTableDataOnly={this.state.renderTableDataOnly}
              sidebarState={this.sidebarState}
              sleeveClicked={this.sleeveClickedHandler}
              aggStatusSummaryClicked={this.aggStatusSummaryClickedHandler}
              setRenderedRowsCount={this.setRenderedRowsCountHandler}
              securityClick={this.rowClickGlobalHandler}
          />}

        </div>

      </main>
    );
  }
}

export default App;
