import React, { Component } from 'react';

import C from '../../../util/constants';
import LoadStateSectionRow from './LoadStateSectionRow/LoadStateSectionRow';

class LoadStateSection extends Component {

  render() {
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
              const sleeveSorted = this.props.data.sortedBy.index === index ? "sorted" : ""; 
              return (
                <th key={index} className="rotated"><div title="Click to sort" onClick={() => this.props.sleeveClicked(index)} className={['sortable', sleeveSorted].join(' ')}><span>{s}</span></div></th>
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

            {this.props.data.weights.map((v, index) => (
              <td key={index} className="bold">{v}</td>
            ))}

            <td className="empty-cell"></td>
            <td className="px50 nowrap bold">{this.props.data.weights.reduce((total, n) => total + n, 1).toFixed(1)}%</td>
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
            status={C.AGG_STATUS_ALL}
            aggStatusSummaryClicked={this.props.aggStatusSummaryClicked}
          />

          <LoadStateSectionRow 
            firstRow={false}
            title="Aggregated"
            row={this.props.data.statusSummary[C.AGG_STATUS_AGGREGATED]}
            status={C.AGG_STATUS_AGGREGATED}
            aggStatusSummaryClicked={this.props.aggStatusSummaryClicked}
          />

          <LoadStateSectionRow 
            firstRow={false}
            title="Ready for Aggregation"
            row={this.props.data.statusSummary[C.AGG_STATUS_READY]}
            status={C.AGG_STATUS_READY}
            aggStatusSummaryClicked={this.props.aggStatusSummaryClicked}
          />

          <LoadStateSectionRow 
            firstRow={false}
            title="In Progress"
            row={this.props.data.statusSummary[C.AGG_STATUS_PROGRESS]}
            status={C.AGG_STATUS_PROGRESS}
            aggStatusSummaryClicked={this.props.aggStatusSummaryClicked}
          />

          <LoadStateSectionRow 
            firstRow={false}
            title="Rejected"
            row={this.props.data.statusSummary[C.AGG_STATUS_REJECTED]}
            status={C.AGG_STATUS_REJECTED}
            aggStatusSummaryClicked={this.props.aggStatusSummaryClicked}
          />

          <LoadStateSectionRow 
            firstRow={false}
            title="Not Loaded"
            row={this.props.data.statusSummary[C.AGG_STATUS_NOT_LOADED]}
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
