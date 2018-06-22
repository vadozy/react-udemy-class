import React from 'react';

const table = props => {
  return (
    <div className="table-wrapper">
      <div className="uid-filter">
        <input placeholder="Find UID or Symbol"/>
      </div>

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
            <th className="px40">nimulti</th>
            <th className="px40">Trade</th>
          </tr>

        </thead>
        <tbody>

          {props.data.rows.map((row, index) => {

            let securityName = row.name;
            if(securityName.length > 19) securityName = securityName.substring(0,18) + "...";

            const totalClasses = ['nowrap', 'bold', row.total.status];

            if (index > 300) return null;

            return (
              <tr key={index}>
                <td className="nowrap">{row.uid}</td>
                <td className="nowrap">{row.currency}</td>
                <td className="nowrap">{row.symbol}</td>
                <td className="nowrap">{row.bb}</td>
                <td className="nowrap security-name">{securityName}</td>

                {row.rowData.map((cell, index2) => {
                  const classes = [];
                  if (cell.value < 0) classes.push("negative");
                  classes.push(cell.status);

                  return(
                    <td key={index2} className={classes.join(" ")}>{cell.value}</td>
                  )
                })}

                <td className="empty-cell"></td>

                <td className={totalClasses.join(' ')} >{row.total.value}</td>
                <td className="nowrap bold">{row.portfolio}</td>
                <td className="nowrap bold">{row.trade}</td>

              </tr>
            );
          })}

          <tr>
            <td>456789</td>
            <td>USD</td>
            <td>TWTR</td>
            <td className="nowrap">TWTR US</td>
            <td className="nowrap security-name">Twitter Name</td>
            <td></td>
            <td></td>
            <td className="aggregated">100</td>
            <td></td>
            <td></td>
            <td></td>
            <td className="aggregated">150</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td className="aggregated">300</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td className="aggregated">105</td>
            <td></td>
            <td></td>
            <td></td>
            <td className="empty-cell"></td>
            <td className="bold aggregated">655</td>
            <td className="bold">-???</td>
            <td className="bold">-???</td>
          </tr>

          <tr>
            <td>123456</td>
            <td>USD</td>
            <td>AAPL</td>
            <td className="nowrap">AAPL US</td>
            <td className="nowrap security-name">Apple Name</td>
            <td className="negative approved">-42</td>
            <td className="approved">42</td>
            <td></td>
            <td></td>
            <td></td>
            <td className="negative approved">-3</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td className="negative approved">-105</td>
            <td></td>
            <td className="empty-cell"></td>
            <td className="bold negative approved">-108</td>
            <td className="bold">-???</td>
            <td className="bold">-???</td>
          </tr>

        </tbody>
      </table>

    </div>
  );
};

export default table;