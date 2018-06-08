import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7
}

class BurgerBuilder extends Component {

	state = {
		ingredients: {
			salad: 0,
			bacon: 0,
			cheese: 0,
			meat: 0
		},
		totalPrice: 4, // base proce
		purchasable: false, // enables/disables the Order button
		purchasing: false  // shows/hides the modal with order summary
	}

	updatePurchaseState(ingredients) {
		const sum = Object.keys(ingredients).reduce((acc, ing) => acc + ingredients[ing], 0);
		console.log(sum);
		this.setState({purchasable: sum > 0});
	}

	addIngredientHandler = type => {
		const oldCount = this.state.ingredients[type];
		const newCount = oldCount + 1;
		const updatedIngredients = {
			...this.state.ingredients
		}; // copy the object
		updatedIngredients[type] = newCount;
		const priceAddition = INGREDIENT_PRICES[type];
		const newPrice = this.state.totalPrice + priceAddition;
		this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
		this.updatePurchaseState(updatedIngredients);
	}

	removeIngredientHandler = type => {
		const oldCount = this.state.ingredients[type];
		if (oldCount <= 0) return;
		const newCount = oldCount - 1;
		const updatedIngredients = {
			...this.state.ingredients
		}; // copy the object
		updatedIngredients[type] = newCount;
		const priceAddition = INGREDIENT_PRICES[type];
		const newPrice = this.state.totalPrice - priceAddition;
		this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
		this.updatePurchaseState(updatedIngredients);
	}

	purchaseHandler = () => {
		this.setState({purchasing: true});
	}

	purchaseCancelHandler = () => {
		this.setState({purchasing: false});
	}

	purchaseContinueHandler = () => {
		alert('Continue!');
	}

	render () {

		const disabledInfo = {
			...this.state.ingredients
		};
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0; // convert numbers to boolean
		}

		return (
			<Aux>
				<Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler} >
					<OrderSummary
						ingredients={this.state.ingredients}
						purchaseCancelled={this.purchaseCancelHandler}
						purchaseContinued={this.purchaseContinueHandler} />
				</Modal>
				<Burger ingredients={this.state.ingredients} />
				<BuildControls 
					ingredientAdded={this.addIngredientHandler} 
					ingredientRemoved={this.removeIngredientHandler} 
					disabled={disabledInfo} 
					purchasable={this.state.purchasable}
					ordered={this.purchaseHandler}
					price={this.state.totalPrice} />
			</Aux>
		);
	}
}

export default BurgerBuilder;
