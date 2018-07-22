import React, { Component } from 'react';

import C from '../../../../../util/constants';

class Tr extends Component {

  state = {
    selected: false
  }

  rowClickHandler = () => {
    const newState = {selected: !this.state.selected};
    this.setState(newState);

    const row = this.props.row;
    this.props.securityClick(newState.selected, {
      uid: row.uid,
      currency: row.currency,
      symbol: row.symbol
    });
  }

  render() {

    const row = this.props.row;

    let securityName = row.name;
    if(securityName.length > 18) securityName = securityName.substring(0,17) + "...";
    const totalClasses = ['nowrap', 'bold', C.AGG_STATUS_CSS_COLOR[row.total.status]];
    const rowClasses = ['selectable'];

    if (this.state.selected) rowClasses.push('selected');

    return (
      <tr className={rowClasses.join(' ')} onClick={this.rowClickHandler} >
        <td className="px40 nowrap">{row.uid}</td>
        <td className="px30 nowrap">{row.currency}</td>
        <td className="px50 nowrap left">{row.symbol}</td>
        <td className="px50 nowrap left">{row.bb}</td>
        <td className="px90 nowrap left security-name">{securityName}</td>

        {row.rowData.map((cell, index2) => {
          const classes = ["px35"];
          if (cell.value < 0) classes.push("negative");
          classes.push(C.AGG_STATUS_CSS_COLOR[cell.status]);

          return(
            <td key={index2} className={classes.join(" ")}>{cell[this.props.sidebarState.dataGridContent]}</td>
          )
        })}

        <td className="empty-cell"></td>
        <td className={totalClasses.join(' ')} >{row.total.value}</td>
        <td className="nowrap bold">{row.portfolio}</td>
        <td className="nowrap bold">{row.trade}</td>

      </tr>
    );
  }

}

export default Tr;