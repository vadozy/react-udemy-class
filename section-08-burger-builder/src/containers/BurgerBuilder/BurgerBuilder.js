import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

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
		totalPrice: 4 // base proce
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
				<Burger ingredients={this.state.ingredients} />
				<BuildControls 
					ingredientAdded={this.addIngredientHandler} 
					ingredientRemoved={this.removeIngredientHandler} 
					disabled={disabledInfo} 
					price={this.state.totalPrice} />
			</Aux>
		);
	}
}

export default BurgerBuilder;
