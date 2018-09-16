import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import axios from '../../axios-orders';

import * as ACTION_TYPE from '../../store/actions';

class BurgerBuilder extends Component {

	state = {
		purchasing: false,  // shows/hides the modal with order summary
		loading: false, // used to display the spinner
		error: false
	}

	componentDidMount() {
		console.log(this.props);
		// axios.get('/ingredients.json')
		// 	.then(response => {
		// 		this.setState({ingredients: response.data});
		// 	})
		// 	.catch(error => {
		// 		console.log("Something went wrong %s", error)	;
		// 		this.setState({loading: false, purchasing: false, error: true});
		// 	});
	}

	purchaseState(ingredients) {
		const sum = Object.keys(ingredients).reduce((acc, ing) => acc + ingredients[ing], 0);
		return sum > 0;
	}

	purchaseHandler = () => {
		this.setState({purchasing: true});
	}

	purchaseCancelHandler = () => {
		this.setState({purchasing: false});
	}

	purchaseContinueHandler = () => {
		this.props.history.push('/checkout');
	}

	render () {

		const disabledInfo = {
			...this.props.ings
		};
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0; // convert numbers to boolean
		}

		let orderSummary = null;
		if (this.props.ings) {
			orderSummary = <OrderSummary
				ingredients={this.props.ings}
				purchaseCancelled={this.purchaseCancelHandler}
				purchaseContinued={this.purchaseContinueHandler}
				totalPrice={this.props.price} />;
		}
		if (this.state.loading) {
			orderSummary = <Spinner />;
		}

		let burger = this.state.error ? <p>Ingredients Can't be loaded!</p> : <Spinner />
		if (this.props.ings) {
			burger = (
				<Aux>
					<Burger ingredients={this.props.ings} />
					<BuildControls 
						ingredientAdded={this.props.onIngredientAdded} 
						ingredientRemoved={this.props.onIngredientRemoved} 
						disabled={disabledInfo} 
						purchasable={this.purchaseState(this.props.ings)}
						ordered={this.purchaseHandler}
						price={this.props.price} />
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

const mapStateToProps = state => {
	return {
		ings: state.ingredients,
		price: state.totalPrice
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onIngredientAdded:   ing => dispatch({type: ACTION_TYPE.ADD_INGREDIENT, ingredientName: ing}),
		onIngredientRemoved: ing => dispatch({type: ACTION_TYPE.REMOVE_INGREDIENT, ingredientName: ing})
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
