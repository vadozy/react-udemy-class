import React, { Component } from 'react';
import './App.css';
import ValidationComponent from './ValidationComponent/ValidationComponent';
import CharComponent from './CharComponent/CharComponent';


class App extends Component {

  state = {
    input: "",
    inputLength: 0
  }

  refreshInputState = event => {
    this.setState({
        input: event.target.value,
        inputLength: event.target.value.length
    });
  }

  removeCharAt = n => {
    const a1 = this.state.input.split('');
    a1.splice(n, 1);
    const s1 = a1.join('')
    this.setState({
        input: s1,
        inputLength: s1.length
    });
  }

  render() {

    //let charComponents = null;

    const a1 = this.state.input.split('');

    const charComponents = (
      <div>
        {a1.map((c, index) => {
          return <CharComponent char={c} key={index} click={() => this.removeCharAt(index)} />
        })}
      </div>
    );

    return (
      <div className="App">
        <p>Enter some text below:</p>
        <input type="text" onChange={this.refreshInputState} value={this.state.input} />
        <p>Text length: {this.state.inputLength}</p>
        <ValidationComponent textLength={this.state.inputLength}/>
        <CharComponent char='x' />
        {charComponents}
      </div>
    );
  }
}

export default App;
