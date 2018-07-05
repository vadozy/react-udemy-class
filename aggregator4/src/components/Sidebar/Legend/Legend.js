import React from 'react';

const legend = props => {

  let ss = null;
  if (Object.keys(props.selectedSecurity).length > 0) {
    ss = (
        <li className="item">
          Selected Securities
          {Object.keys(props.selectedSecurity).map(el => <div key={props.selectedSecurity[el].uid} >
              <span style={{margin: "5px"}}>{props.selectedSecurity[el].uid}</span>
              <span style={{margin: "5px"}}>{props.selectedSecurity[el].currency}</span>
              <span style={{margin: "5px"}}>{props.selectedSecurity[el].symbol}</span>
            </div>)}
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
        {ss}
      </ul>

    </section>
  );
}

export default legend;
