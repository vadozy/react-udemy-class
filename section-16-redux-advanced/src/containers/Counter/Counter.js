import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ACTION_TYPE from '../../store/actions';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

class Counter extends Component {

    render () {
        //console.log('Inside render()');
        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter}  />
                <CounterControl label="Add 5" clicked={() => this.props.onAddCounter(5)}  />
                <CounterControl label="Subtract 5" clicked={() => this.props.onSubtractCounter(5)}  />
                <hr />
                <button onClick={() => this.props.onStoreResult(this.props.ctr)} >Store Result</button>
                <ul>
                    {this.props.storedResults.map(r => <li key={r.id} onClick={() => this.props.onDeleteResult(r.id)} >{r.value}</li>)}
                </ul>
            </div>
        );
    }
}

// Redux configuration for the given container
// parameter "state" is the one managed by redux (see reducer.js)
const mapStateToProps = state => {
    return {
        ctr: state.ctr.counter,
        storedResults: state.res.results
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIncrementCounter: () => dispatch({type: ACTION_TYPE.INCREMENT}),
        onDecrementCounter: () => dispatch({type: ACTION_TYPE.DECREMENT}),
        onAddCounter:        v => dispatch({type: ACTION_TYPE.ADD, value: v}),
        onSubtractCounter:   v => dispatch({type: ACTION_TYPE.SUBTRACT, value: v}),

        onStoreResult:  result => dispatch({type: ACTION_TYPE.STORE_RESULT, result: result}),
        onDeleteResult:     id => dispatch({type: ACTION_TYPE.DELETE_RESULT, resultId: id})
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);