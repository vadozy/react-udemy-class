import React from 'react';

const collapsedSimTarget = props => {
  return(
    <section className="sidebar-section">
      <div className="vertical-container">
        <div className="label">
          Collapsed Sim Target
        </div>
          <div className="field">
            {props.portfolios.length === 0 ? <div className="loader" style={{position: "absolute", margin: "10px 0 0 60px", fontSize: "4px"}}>Loading...</div> : null}
              <select value={props.portfolio} onChange={props.portfolioChange} >
                {props.portfolios.map(v => (<option key={v} value={v}>{v}</option>))}
              </select>
          </div>
      </div>
    </section>
  );
}

export default collapsedSimTarget;
