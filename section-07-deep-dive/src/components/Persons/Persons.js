import React from 'react';
import Person from './Person/Person';

const persons = (props) => props.persons.map((p, index) => {
    return <Person
      click={() => props.personClicked(index)} // deletePersonHandler
      changed={event => props.personChanged(event.target.value, p.id)} // nameChangedHandler
      name={p.name}
      age={p.age} 
      key={p.id} />
    });

export default persons;