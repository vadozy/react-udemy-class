import React, { Component } from 'react';

class TableBodyChunk extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.shouldUpdate;
  }

  render() {

  	return (
      this.props.rows.map((row, index1) => {

        let securityName = row.name;
        if(securityName.length > 19) securityName = securityName.substring(0,18) + "...";

        const totalClasses = ['nowrap', 'bold', row.total.status];
        return (
          <tr key={row.uid}>
            <td className="nowrap">{row.uid}</td>
            <td className="nowrap">{row.currency}</td>
            <td className="nowrap left">{row.symbol}</td>
            <td className="nowrap left">{row.bb}</td>
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
      })
    )
  }

}

export default TableBodyChunk;