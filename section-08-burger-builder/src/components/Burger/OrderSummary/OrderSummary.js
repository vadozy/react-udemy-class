import React, { Component } from 'react';

import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

	constructor(props){
		super(props);
		this.escFunction = this.escFunction.bind(this);
	}

	escFunction(event){
		if(event.keyCode === 27) {
			this.props.purchaseCancelled();
		}
	}

	componentDidMount() {
		document.addEventListener("keydown", this.escFunction, false);
	}

	componentWillUnmount(){
		document.removeEventListener("keydown", this.escFunction, false);
	}

	render() {
		const ingredientSummary = Object.keys(this.props.ingredients)
			.map(igKey => {
				return <li key={igKey} ><span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}</li>
			});

		return (
			<Aux>
				<h3>Your Order</h3>
				<p>A delicious burger with the following ingredients:</p>
				<ul>
					{ingredientSummary}
				</ul>
				<p><strong>Total Price: {this.props.totalPrice.toFixed(2)}</strong></p>
				<p>Continue to Checkout?</p>
				<Button clicked={this.props.purchaseCancelled} btnType='Danger'>CANCEL</Button>
				<Button clicked={this.props.purchaseContinued} btnType='Success'>CONTINUE</Button>
			</Aux>
		);
	}
}

export default OrderSummary;