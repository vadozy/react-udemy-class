import React, { PureComponent } from 'react';
import classes from './App.css'; // classes was added after ejecting and tweaking config
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';

class App extends PureComponent {

  constructor(props) {
    super(props);
    console.log('[App.js] Inside constructor(%o)', props);
    /* Optional state initialization:
     * 
     * this.state = {...}
     */
  }

  componentWillMount() {
    console.log('[App.js] Inside componentWillMount()');
  }

  componentDidMount() {
    console.log('[App.js] Inside componentDidMount()');
  }

  // ....

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('[UPDATE App.js] Inside shouldComponentUpdate(%o, %o)', nextProps, nextState);
  //   //return true;
  //   return nextState.persons !== this.state.persons ||
  //     nextState.showPersons !== this.state.showPersons;
  // }

  componentWillUpdate(nextProps, nextState) {
    console.log('[UPDATE App.js] Inside componentWillUpdate(%o, %o)', nextProps, nextState);
  }

  componentDidUpdate() {
    console.log('[UPDATE App.js] Inside componentDidUpdate()');
  }

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

    console.log('[App.js] Inside render()');
    let persons = null;

    if (this.state.showPersons) {
      persons = <Persons 
        persons={this.state.persons}
        personClicked={this.deletePersonHandler}
        personChanged={this.nameChangedHandler} />
    }

    return (
      <div className={classes.App}>

        <button onClick={() => {this.setState({showPersons: true})}}>Show Persons</button>
        <Cockpit
          appTitle={this.props.title}
          showPersons={this.state.showPersons}
          persons={this.state.persons}
          buttonClicked={this.togglePersonsHandler}
        />
        {persons}

      </div>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }

}

export default App;
