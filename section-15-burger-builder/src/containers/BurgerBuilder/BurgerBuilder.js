import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7
}

class BurgerBuilder extends Component {

	state = {
		ingredients: null,
		totalPrice: 4, // base proce
		purchasable: false, // enables/disables the Order button
		purchasing: false,  // shows/hides the modal with order summary
		loading: false, // used to display the spinner
		error: false
	}

	componentDidMount() {
		console.log(this.props);
		axios.get('/ingredients.json')
			.then(response => {
				this.setState({ingredients: response.data});
			})
			.catch(error => {
				console.log("Something went wrong %s", error)	;
				this.setState({loading: false, purchasing: false, error: true});
			});
	}

	updatePurchaseState(ingredients) {
		const sum = Object.keys(ingredients).reduce((acc, ing) => acc + ingredients[ing], 0);
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
		const queryParams = [];
		for (let i in this.state.ingredients) {
			queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
		}
		queryParams.push('price=' + this.state.totalPrice);
		const queryString = queryParams.join('&');
		this.props.history.push({
			pathname: '/checkout',
			search: '?' + queryString
		});
	}

	render () {

		const disabledInfo = {
			...this.state.ingredients
		};
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0; // convert numbers to boolean
		}

		let orderSummary = null;
		if (this.state.ingredients) {
			orderSummary = <OrderSummary
				ingredients={this.state.ingredients}
				purchaseCancelled={this.purchaseCancelHandler}
				purchaseContinued={this.purchaseContinueHandler}
				totalPrice={this.state.totalPrice} />;
		}
		if (this.state.loading) {
			orderSummary = <Spinner />;
		}

		let burger = this.state.error ? <p>Ingredients Can't be loaded!</p> : <Spinner />
		if (this.state.ingredients) {
			burger = (
				<Aux>
					<Burger ingredients={this.state.ingredients} />
					<BuildControls 
						ingredientAdded={this.addIngredientHandler} 
						ingredientRemoved={this.removeIngredientHandler} 
						disabled={disabledInfo} 
						purchasable={this.state.purchasable}
						ordered={this.purchaseHandler}
						price={this.state.totalPrice} />
				</Aux> );
		}


		return (
			<Aux>
				<Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler} >
					{orderSummary}
				</Modal>
				{burger}
			</Aux>
		);
	}
}

export default withErrorHandler(BurgerBuilder, axios);
