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

	const WithClass = class extends Component {
		render() {
			return 	(
				<div className={className}>
					<WrappedComponent ref={this.props.forwardedRef} {...this.props} />
				</div>
			);
		}
	}

	return React.forwardRef((props, ref) => {
		return <WithClass {...props} forwardedRef={ref} />
	});
};


export default withClass;