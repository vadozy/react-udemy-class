import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {

	// Vadim's solution
	//let ings = [];
	//for (let ing in props.ingredients) {
	//	for (let i = 0; i < props.ingredients[ing]; i++) {
	//		ings.push( <BurgerIngredient type={ing} key={ings.length} /> );
	//	}
	//}

	//Author's solution
	let ings = Object.keys(props.ingredients)
		.map(igKey => {
			return  [...Array(props.ingredients[igKey])].map((_, i) => {
				return <BurgerIngredient type={igKey} key={igKey + i} />;
			});
		})
		.reduce((arr, el) => [...arr, ...el], []); // flattening the array of 4 arrays

	if (ings.length === 0) {
		ings = <p>Please start adding ingredients!</p>;
	}

	return (
		<div className={classes.Burger} >
			<BurgerIngredient type="bread-top" />
			{ings}
			<BurgerIngredient type="bread-bottom" />
		</div>
	);
};

export default burger;