import React from 'react';

import C from '../../../util/constants';

const dataGridContent = props => {
  return(
    <section className="sidebar-section">
      <h4>Data Grid Content</h4>

      <ul className="data-grid-content">
        <li
          className={props.dataGridContent === C.SIDEBAR_SLEEVE_EOD_WEIGHT ? 'active' : null}
          onClick={() => props.clicked(C.SIDEBAR_SLEEVE_EOD_WEIGHT)} >
            {C.SIDEBAR_SLEEVE_TITLE[C.SIDEBAR_SLEEVE_EOD_WEIGHT]}
        </li>
        <li
          className={props.dataGridContent === C.SIDEBAR_SLEEVE_TRADE ? 'active' : null}
          onClick={() => props.clicked(C.SIDEBAR_SLEEVE_TRADE)} >
            {C.SIDEBAR_SLEEVE_TITLE[C.SIDEBAR_SLEEVE_TRADE]}
        </li>
        {/*
        <li
          className={props.dataGridContent === C.SIDEBAR_SLEEVE_EOD_WEIGHT_CONTRIB ? 'active' : null}
          onClick={() => props.clicked(C.SIDEBAR_SLEEVE_EOD_WEIGHT_CONTRIB)} >
            {C.SIDEBAR_SLEEVE_TITLE[C.SIDEBAR_SLEEVE_EOD_WEIGHT_CONTRIB]}
        </li>
        <li
          className={props.dataGridContent === C.SIDEBAR_SLEEVE_TRADE_CONTRIB ? 'active' : null}
          onClick={() => props.clicked(C.SIDEBAR_SLEEVE_TRADE_CONTRIB)} >
            {C.SIDEBAR_SLEEVE_TITLE[C.SIDEBAR_SLEEVE_TRADE_CONTRIB]}
        </li>
        */}
      </ul>

      <div className="uid-filter">
        <input placeholder="UID or Symbol" value={props.security} onChange={ev => props.securityChange(ev.target.value)} />
      </div>

    </section>
  );
}

export default dataGridContent;
