import React, { Component } from 'react';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import CSSTransition from 'react-transition-group/CSSTransition';

import './List.css';

class List extends Component {

    globalCounter = 0;

    state = {
        items: [++this.globalCounter, ++this.globalCounter, ++this.globalCounter]
    }

    addItemHandler = () => {
        this.setState((prevState) => {
            return {
                items: prevState.items.concat(++this.globalCounter)
            };
        });
    }

    removeItemHandler = (selIndex) => {
        this.setState((prevState) => {
            return {
                items: prevState.items.filter((item, index) => index !== selIndex)
            };
        });
    }

    render () {
        const listItems = this.state.items.map( (item, index) => (
            <CSSTransition
                key={index}
                classNames='fade'
                timeout={300}>
                    <li 
                        className="ListItem" 
                        onClick={() => this.removeItemHandler(index)}>{item}</li>
            </CSSTransition>
        ) );

        return (
            <div>
                <button className="Button" onClick={this.addItemHandler}>Add Item</button>
                <p>Click Item to Remove.</p>
                <TransitionGroup component='ul' className='List'>
                    {listItems}
                </TransitionGroup>
            </div>
        );
    }
}

export default List;
