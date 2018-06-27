import React, { Component } from 'react';

class TableBody extends Component {

  shouldComponentUpdate(nextProps, nextState) {
      if (nextProps.refreshTable) {
        console.log("UPDATING");
        return true;
      } else {
        console.log("SKIPPING UPDATE");
        return false;
      }
  }

  render() {

    const selectedSleevesIndexes = this.props.filters.selectedSleeves.map(s => this.props.data.sleeves.indexOf(s));

    function hideRow(row, filters) {

      const s = filters.security.trim();
      if (s.length > 0 && String(row.uid).indexOf(s) < 0 && row.symbol.toUpperCase().indexOf(s.toUpperCase()) < 0) {
        return true;
      }

      if (!filters.all && !(
              (filters.aggregated && (row.total.status === 'aggregated')) ||
              (filters.ready && (row.total.status  === 'approved')) ||
              (filters.progress && (row.total.status  === 'in-progress')) ||
              (filters.rejected && (row.total.status  === 'reject'))
          )) {
        return true;
      }

      if ( selectedSleevesIndexes.length > 0 && 
          !selectedSleevesIndexes.reduce((result, i) => result || row.rowData[i].status, false) ) {
        return true;
      }

      return false;
    }

    return (
      <tbody>

        {this.props.data.rows.map((row, index) => {

          let securityName = row.name;
          if(securityName.length > 19) securityName = securityName.substring(0,18) + "...";

          if (hideRow(row, this.props.filters)) return null;

          const totalClasses = ['nowrap', 'bold', row.total.status];
          return (
            <tr key={index}>
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
        })}

      </tbody>
    );

  }

}

export default TableBody;