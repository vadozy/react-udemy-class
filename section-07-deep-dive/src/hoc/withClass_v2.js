import React, { Component } from 'react';

//    // next is a normal js function that returns a function which is a functional component
//    const withClass = (WrappedComponent, className) => {
//    	return (props) => (
//    		<div className={className}>
//    			<WrappedComponent {...props} />
//    		</div>
//    	);
//    };

// next is a normal js function that returns a function which is a functional component
const withClass = (WrappedComponent, className) => {
	return class extends Component {

		render() {
			return 	(
				<div className={className}>
					<WrappedComponent {...this.props} />
				</div>
			);
		}

	};
};


export default withClass;