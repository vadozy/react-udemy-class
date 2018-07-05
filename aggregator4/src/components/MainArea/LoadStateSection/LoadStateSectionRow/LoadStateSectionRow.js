import React from 'react';

import C from '../../../../util/constants';

const loadStateSectionRow = props => {

  let bgColor = ''

  switch(props.status) {
      case C.AGG_STATUS_AGGREGATED:
          bgColor = 'aggregated';
          break;
      case C.AGG_STATUS_READY:
          bgColor = 'approved';
          break;
      case C.AGG_STATUS_PROGRESS:
          bgColor = 'in-progress';
          break;
      case C.AGG_STATUS_REJECTED:
          bgColor = 'reject';
          break;
      case C.AGG_STATUS_NOT_LOADED:
          bgColor = 'not-loaded';
          break;
      default:
          break;
  }

  return (
    <tr>

      {props.firstRow ? <td className="px120 aggregation-status" colSpan="3" rowSpan="6">AGGREGATION STATUS SUMMARY</td> : null}
      <td className={"px140 " + bgColor} colSpan="2">{props.title}</td>

      {props.row.countsPerSleeve.map((v, index) => {

        const selected = props.row.countsPerSleeveSelected[index] ? "selected" : "";

        return (<td 
          key={index}
          className={"selectable " + selected}
          onClick={() => props.aggStatusSummaryClicked(props.status, index)} >{v}</td>);

      })}

      <td className="empty-cell"></td>
      <td className={"selectable " + (props.row.totalSelected ? "selected" : "")}
        onClick={() => props.aggStatusSummaryClicked(props.status, -1, true)}>{props.row.total}</td>

    </tr>
  );
}

export default loadStateSectionRow;
