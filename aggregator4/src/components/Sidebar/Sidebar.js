import React, { Component } from 'react';

import C from '../../util/constants';
import CollapsedSimTarget from './CollapsedSimTarget/CollapsedSimTarget';
import DataGridContent from './DataGridContent/DataGridContent';
import Actions from './Actions/Actions';
import Legend from './Legend/Legend';

class Sidebar extends Component {

  state = {
    portfolios: [], // portfolios drop-down values (will come from server)
    portfolio: '', // currently selected value in the portfolios drop-down (will come from server)

    dataGridContent: C.SIDEBAR_SLEEVE_EOD_WEIGHT,
    security: ""
  };

  componentDidMount() {
    console.log("Loading Collapsed Sim Targets from server");
    setTimeout(this.loadPortfolios, 1000); // VADIM -- emulates Ajax call
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !nextProps.renderTableDataOnly;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.security !== prevState.security || 
        this.state.dataGridContent !== prevState.dataGridContent ||
        this.state.portfolio !== prevState.portfolio) {
      this.props.sidebarStateUpdate(this.state);
    }
  }

  loadPortfolios = () => {
    const ps = ['10sleeves', 'nimulti-east', '30sleeves', '50sleeves'];
    console.log("Loaded " + ps.length + " Collapsed Sim Targets from server!");
    this.setState({
      portfolios: ps,
      portfolio: 'nimulti-east'
    });
    this.props.loadPortfolioData('nimulti-east');
  }

  portfolioChangeHandler = event => {
    this.setState({portfolio: event.target.value});
    this.props.loadPortfolioData(event.target.value);
  }

  dataGridClickHandler = v => {
    this.setState({dataGridContent: v});
  }

  securityChangeHandler = v => {
    this.setState({security: v});
  }

  resetFilters = v => {
    const newState = {
      dataGridContent: C.SIDEBAR_SLEEVE_EOD_WEIGHT,
      security: ""
    };
    this.setState(newState);
    this.props.sidebarStateUpdate(newState);
    this.props.resetFilters(); // to propagate the reset to the parent and therefore to other components
  }

  render() {
    //console.log('Inside Sidebar.render()');
    return (

      <div className="sidebar">

        <CollapsedSimTarget 
          portfolio={this.state.portfolio}
          portfolios={this.state.portfolios}
          portfolioChange={this.portfolioChangeHandler} />

        <DataGridContent 
          dataGridContent={this.state.dataGridContent}
          clicked={this.dataGridClickHandler}
          security={this.state.security}
          securityChange={this.securityChangeHandler} />

        <Actions 
          resetFilters={this.resetFilters} />

        <Legend
          renderedCount={this.props.renderedCount}
          totalRenderCount={this.props.totalRenderCount} 
          selectedSecurity={this.props.selectedSecurity} />

      </div>

    );
  }
}

export default Sidebar;
