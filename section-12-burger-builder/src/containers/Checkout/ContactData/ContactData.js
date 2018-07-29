import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';

import axios from '../../../axios-orders';

class ContactData extends Component {
	state = {
		name: '', 
		email: '', 
		address: {
			street: '',
			postalCode: ''
		},
		loading: false
	}

	orderHandler = event => {
		event.preventDefault();
		console.log(this.props.ingredients);

		this.setState({loading: true});
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.totalPrice, // should be computed on the server, where products are stored
			customer: {
				name: 'Vadim Storozhuk',
				address: {
					street: 'Test Street 01',
					zip: '12345',
					country: 'Portugal'
				},
				email: 'test@test.com'
			},
			deliveryMethod: 'very fast'
		};
		axios.post('/orders.json', order) // .json is the firebase requirement
			.then(response => {
				console.log(response);
				this.setState({loading: false});
				this.props.history.push('/');
			})
			.catch(error => {
				console.log("Something went wrong %s", error)	;
				this.setState({loading: false});
			});
		
	}

	render () {

		let form = (
			<div className={classes.ContactData}>
				<h4>Enter your Contact Data</h4>
				<form>
					<input className={classes.Input} type="text" name="name" placeholder="Your Name" />
					<input className={classes.Input} type="text" name="email" placeholder="Your Email" />
					<input className={classes.Input} type="text" name="street" placeholder="Street" />
					<input className={classes.Input} type="text" name="postal" placeholder="Postal Code" />
					<Button btnType="Success" clicked={this.orderHandler} >Order</Button>
				</form>
			</div>
		);

		if (this.state.loading) {
			form = <Spinner />
		}
		return form;
	}
}

export default ContactData;