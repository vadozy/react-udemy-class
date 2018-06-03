import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { id: 'person_id_01', name: 'Max', age: 28 },
      { id: 'person_id_02', name: 'Manu', age: 29 },
      { id: 'person_id_03', name: 'Stephanie', age: 26 }
    ],
    otherState: 'some other value',
    showPersons: false
  }
  
  deletePersonHandler = (personIndex) => {
    //const persons = this.state.persons.slice(); // slice() creates a copy -- good practice
    const persons = [...this.state.persons]; // same as above
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  nameChangedHandler = (value, id) => {
    const persons = [...this.state.persons]; // copy
    const person = persons.find(p => p.id === id); // should be a copy instead?
    person.name = value;
    this.setState({persons: persons});
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  render() {

    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };

    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((p, index) => {
            return <Person
              click={() => this.deletePersonHandler(index)}
              changed={event => this.nameChangedHandler(event.target.value, p.id)}
              name={p.name}
              age={p.age} 
              key={p.id} />
          })}
        </div>
      );
    }

    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p>This is really working!</p>
        <button 
          style={style}
          onClick={this.togglePersonsHandler}>Toggle Persons</button>

        {persons}

      </div>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }

}

export default App;
