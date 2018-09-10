import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import counterReducer from './store/reducers/counter';
import resultReducer from './store/reducers/result';

const rootReducer = combineReducers({
	ctr: counterReducer,
	res: resultReducer
});

// This is middleware
const logger = store => {
	console.log("1");
	return next => {
		console.log("2");
		return action => {
			console.log('store: ', store);
			console.log('next: ', next);
			console.log('[Middleware] Dispatching', action);
			console.log('[Middleware] prev state', store.getState());
			const result = next(action);
			console.log('[Middleware] next state', store.getState());
			console.log('result: ', result);
			return result;
		};
	};
};

// composeEnhancers is for development only, it enabled Chrome Redux devtools to see this store.
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, thunk)));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
