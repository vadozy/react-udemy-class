import React, { Component } from 'react';

import C from '../../../util/constants';
import LoadStateSectionRow from './LoadStateSectionRow/LoadStateSectionRow';

class LoadStateSection extends Component {

  render() {

    const disabled = this.props.data.sleeves.map(s => s.status === C.SLEEVE_DISABLED);

    return (

    <section className="load-state-section">
      <table className="agg-table">

        <thead>

          <tr>
            <th className="nowrap px40"></th>
            <th className="nowrap px30"></th>
            <th className="nowrap px50"></th>
            <th className="nowrap px50"></th>
            <th className="nowrap px90"></th>

            {this.props.data.sleeves.map((s, index) => {
              const classes = ['sortable'];
              if (this.props.data.sortedBy.index === index) classes.push("sorted"); 
              if (s.status === C.SLEEVE_DISABLED) classes.push("disabled-sleeve");
              const clickHandler = s.status === C.SLEEVE_DISABLED ? null : () => this.props.sleeveClicked(index);
              return (
                <th key={index} className="rotated"><div title="Click to sort" onClick={clickHandler} className={classes.join(' ')}><span>{s.name}</span></div></th>
              );
            })}

            <th className="empty-cell"></th>
            <th className="nowrap px50 right">Total</th>
          </tr>

        </thead>

        <tbody>

          <tr>
            <td colSpan="3" className="px120 empty-cell"></td>
            <td colSpan="2" className="px140 sleeve-weight">Sleeve Weight (%)</td>

            {this.props.data.sleeves.map((s, index) => {
              const classes = ['bold'];
              if (s.status === C.SLEEVE_DISABLED) classes.push("disabled-sleeve"); 
              return <td key={index} className={classes.join(' ')}>{s.weight}</td>
            })}

            <td className="empty-cell"></td>
            <td className="px50 nowrap bold">{this.props.data.sleeves.map(s => s.weight).reduce((total, n) => total + n, 1).toFixed(1)}%</td>
          </tr>

          <tr>
            <td colSpan={5 + this.props.data.sleeves.length} style={{border: "1px none #FFFFFF"}}></td>
            <td className="empty-cell"></td>
            <td className="empty-cell"></td>
          </tr>

          <LoadStateSectionRow 
            firstRow={true}
            title="All"
            row={this.props.data.statusSummary[C.AGG_STATUS_ALL]}
            disabled={disabled}
            status={C.AGG_STATUS_ALL}
            aggStatusSummaryClicked={this.props.aggStatusSummaryClicked}
          />

          <LoadStateSectionRow 
            firstRow={false}
            title="Aggregated"
            row={this.props.data.statusSummary[C.AGG_STATUS_AGGREGATED]}
            disabled={disabled}
            status={C.AGG_STATUS_AGGREGATED}
            aggStatusSummaryClicked={this.props.aggStatusSummaryClicked}
          />

          <LoadStateSectionRow 
            firstRow={false}
            title="Ready for Aggregation"
            row={this.props.data.statusSummary[C.AGG_STATUS_READY]}
            disabled={disabled}
            status={C.AGG_STATUS_READY}
            aggStatusSummaryClicked={this.props.aggStatusSummaryClicked}
          />

          <LoadStateSectionRow 
            firstRow={false}
            title="In Progress"
            row={this.props.data.statusSummary[C.AGG_STATUS_PROGRESS]}
            disabled={disabled}
            status={C.AGG_STATUS_PROGRESS}
            aggStatusSummaryClicked={this.props.aggStatusSummaryClicked}
          />

          <LoadStateSectionRow 
            firstRow={false}
            title="Rejected"
            row={this.props.data.statusSummary[C.AGG_STATUS_REJECTED]}
            disabled={disabled}
            status={C.AGG_STATUS_REJECTED}
            aggStatusSummaryClicked={this.props.aggStatusSummaryClicked}
          />

          <LoadStateSectionRow 
            firstRow={false}
            title="Not Loaded"
            row={this.props.data.statusSummary[C.AGG_STATUS_NOT_LOADED]}
            disabled={disabled}
            status={C.AGG_STATUS_NOT_LOADED}
            aggStatusSummaryClicked={this.props.aggStatusSummaryClicked}
          />

        </tbody>
      </table>
    </section>

    );
  }
}

export default LoadStateSection;
