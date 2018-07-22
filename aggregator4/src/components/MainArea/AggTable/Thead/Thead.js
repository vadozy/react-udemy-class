import React from 'react';

import C from '../../../../util/constants';

const thead = props => {
  return (
    <thead>

      <tr>
        <th className="nowrap px40">UID</th>
        <th className="nowrap px30">Curr</th>
        <th className="nowrap px40">Symbol</th>
        <th className="nowrap px50">Bberg</th>
        <th className="nowrap px90">Name</th>
        <th colSpan={props.data.sleeves.length}>{C.SIDEBAR_SLEEVE_TITLE[props.sidebarState.dataGridContent]}</th>
        <th className="empty-cell"></th>
        <th className="nowrap px50">Total</th>
        <th className="px50">{props.sidebarState.portfolio}</th>
        <th className="nowrap px50">Trade</th>
      </tr>

    </thead>
  );
}

export default thead;