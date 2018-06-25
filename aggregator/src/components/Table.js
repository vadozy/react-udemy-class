import React from 'react';
import TableBody from './TableBody';

const table = props => (

  <table className="agg-table" style={{width: props.tableWidth}}>
    <thead>
      <tr className="top-weight-row">
        <td className="px40 nowrap"></td>
        <td className="px30 nowrap"></td>
        <td className="px40 nowrap"></td>
        <td className="px50 nowrap"></td>
        <td className="px90 nowrap"><span className="sleeve-weight">Sleeve Weight (%)</span></td>

        {props.data.weights.map((v, index) => (
          <td key={index} className="top-row-td-shifted nowrap">{v}</td>
        ))}

        <td className="px4 nowrap"></td>
        <td className="top-row-td-shifted nowrap px10" >{props.data.weights.reduce((total, n) => total + n).toFixed(1)}</td>
        <td className="px40 nowrap"></td>
        <td className="px40 nowrap"></td>
      </tr>

      <tr>
        <th>UID</th>
        <th>Curr</th>
        <th>Symbol</th>
        <th>Bberg</th>
        <th>Name</th>

        {props.data.sleeves.map((s, index) => {

          const sleeveSelected = props.filters.selectedSleeves.indexOf(s) < 0 ? "" : "sleeve-selected"; 
          return (
            <th key={index} className="rotated"><div onClick={() => props.sleeveClick(s)} title="Select to find securities for this sleeve" className={['selectable', sleeveSelected].join(' ')}><span>{s}</span></div></th>
          );

        })}

        <th></th>
        <th className="px40">Total</th>
        <th className="px40">{props.multisleeve.portfolio}</th>
        <th className="px40">Trade</th>
      </tr>

    </thead>

    <TableBody {...props} />
  </table>

)

export default table;