import React from 'react';

const legend = props => {

  const selectedRows = [];

  props.selectedSecurities.forEach(row => selectedRows.push(row));

  let ss_jsx = null;

  if (selectedRows.length > 0) {
    ss_jsx = (
        <li className="item">
          Selected Securities
          {selectedRows.map(row => { return <div key={row.uid} >
              <span style={{margin: "5px"}}>{row.uid}</span>
              <span style={{margin: "5px"}}>{row.currency}</span>
              <span style={{margin: "5px"}}>{row.symbol}</span>
            </div>;})}
        </li>
    );
  }

  return(
    <section className="sidebar-section">
      <h4>Legend</h4>

      <ul className="legend-list">
        <li className="item">
          Click a sim title to sort
        </li>
        <li className="item">
          Use UID lookup to find a security
        </li>
        <li className="item">
          Click Aggregate button to save net fund weight for collapsed PIR sim target load
        </li>
        <li className="item">
          Rows {props.renderedCount} / {props.totalRenderCount}
        </li>
        {ss_jsx}
      </ul>

    </section>
  );
}

export default legend;
