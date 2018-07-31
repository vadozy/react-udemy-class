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
    sleeves: [], // array of objects like {name: 'sleeve1', weight: 0.2, status: 'NOT AVAILABLE'}
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
   * set of row(s) selected on screen
   */
  selectedSecurities        = new Set();
  // shift selects state
  shiftSelectedSecurityFrom = null;      // row used for Shift Selects
  shiftSelectedSecurityTo   = null;      // row used for Shift Selects
  shiftSelectedSecurities   = new Set(); // rows currently Shift Selected

  sidebarStateUpdateHandler = newSidebarState => {
    if (this.sidebarState.security !== newSidebarState.security) {
      this._unselectAllRows();
    }
    this.sidebarState = {...this.sidebarState, ...newSidebarState};
    this.renderTableData();
  }

  loadPortfolioData = portfolio => {
    this.clearSleeveSorting();
    this.selectedSecurities.clear();
    console.log('Loading Portfolio ' + portfolio + ' from backend');

    // Next two lines bring the spinner in the main area
    this.data.sleeves = []; // show the spinner
    this.setState({renderTableDataOnly: false}); // trigger rendering

    setTimeout(() => {
      const data = G.getData(portfolio);
      this.data.sleeves = data.sleeves;
      this.data.rows = data.rows;

      this.data.statusSummary = D.computeStatusSummary(this.data.rows);
      console.log('Loaded Portfolio ' + portfolio + ' with ' + this.data.rows.length + ' rows');
      this.renderTableData();
    }, 1000); // VADIM -- emulates Ajax call
  }

  clearSleeveSorting = () => {
    this.data.sortedBy.index = -1;
  }

  _unselectAllRows = () => {

    this.selectedSecurities.forEach(row => {
      row.selected = false;
      this._setRowReactComponentState(row, false)});

    this.selectedSecurities.clear();

    // Clear shift select state
    this.shiftSelectedSecurityFrom = null;
    this.shiftSelectedSecurityTo   = null;
    this.shiftSelectedSecurities.clear();
  }

  _replaceShiftRows = rows => {

    this.shiftSelectedSecurities.forEach(row => {
      row.selected = false;
      this.selectedSecurities.delete(row);
      this._setRowReactComponentState(row, false)});

    this.shiftSelectedSecurities.clear();

    rows.forEach(row => {
      row.selected = true;
      this.selectedSecurities.add(row);
      this.shiftSelectedSecurities.add(row);
      this._setRowReactComponentState(row, true);
    });
  }

  _findRowsBetween = (row1, row2) => {
    const ret = [];
    let between = false;

    const allRows = this.data.rowsToRender;
    for (let i = 0; i < allRows.length; i++) {
      if (allRows[i] === row1 || allRows[i] === row2) {
        ret.push(allRows[i]);
        if (between) break;
        between = true;
      } else {
        if (between) ret.push(allRows[i]);
      }
    }
    return ret;
  }

  renderTableData = () => {
    this.data.rowsToRender = D.sortAndFilter(this.data.rows, this.data.statusSummary, this.data.sortedBy, this.sidebarState);
    this.data.totalRenderCount = this.data.rowsToRender.length;
    this.data.renderedCount = 0;
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

    // Next single line, if commeneted out, will make the Aggregation Status Summary multi-select
    this.data.statusSummary.clearAllSelections();

    if (isTotal) {
      this.data.statusSummary[status].totalSelected = !this.data.statusSummary[status].totalSelected;
    } else {
      this.data.statusSummary[status].countsPerSleeveSelected[i] = !this.data.statusSummary[status].countsPerSleeveSelected[i];
    }
    D.reconcileStatusSummarySelections(this.data.statusSummary, status, i, isTotal);
    this._unselectAllRows();
    this.renderTableData();
  }

  setRenderedRowsCountHandler = rendered => {
    this.data.renderedCount = rendered;
    this.setState({renderTableDataOnly: false}); // to cause the sidebar to update this count
  }

  resetFiltersHandler = () => {
    this.clearSleeveSorting();
    this.data.statusSummary.clearAllSelections();
    this._unselectAllRows();
    this.renderTableData();
  }

  selectAllRowsHandler = () => {
    this.data.rowsToRender.forEach(row => {
      row.selected = true;
      this.selectedSecurities.add(row);
      this._setRowReactComponentState(row, true);
    });
    this.setState({renderTableDataOnly: false}); // to cause the sidebar to update the legend
  }

  _setRowReactComponentState = (row, selected) => {
      if (row.reactComponent) {
        row.reactComponent.setState({selected: selected});
      }
  }

  rowClickGlobalHandler = (row, ctrlKey, shiftKey, altKey, metaKey) => {

    if (shiftKey) {
      this.shiftSelectedSecurityTo = row;
      const rows = this._findRowsBetween(row, this.shiftSelectedSecurityFrom);
      this._replaceShiftRows(rows);
    } else {
      if (!ctrlKey && !metaKey) {
        this._unselectAllRows();
        this._setRowState(row, true);
      } else if (ctrlKey || metaKey) {
        this._setRowState(row, !row.selected);
      }
      this.shiftSelectedSecurityFrom = row;
      this.shiftSelectedSecurityTo = null;
      this.shiftSelectedSecurities.clear();
    }
    this.setState({renderTableDataOnly: false}); // to cause the sidebar to update the legend
  }

  _setRowState = (row, selected) => {
    row.selected = selected;
    this._setRowReactComponentState(row, selected);
    if (selected) {
      this.selectedSecurities.add(row); // add to the set
    } else {
      delete this.selectedSecurities.delete(row); // remove from the set
    }
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
            selectedSecurities={this.selectedSecurities}  />

          {this.data.sleeves.length === 0 ? <div className="loader">Loading...</div> : 
            <MainArea 
              data={this.data}
              renderTableDataOnly={this.state.renderTableDataOnly}
              sidebarState={this.sidebarState}
              sleeveClicked={this.sleeveClickedHandler}
              aggStatusSummaryClicked={this.aggStatusSummaryClickedHandler}
              setRenderedRowsCount={this.setRenderedRowsCountHandler}
              securityClick={this.rowClickGlobalHandler}
              selectAllRows={this.selectAllRowsHandler}
          />}

        </div>

      </main>
    );
  }
}

export default App;
