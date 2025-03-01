import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import todosReducer from './components/reducers/reducers';

const rootReducer = combineReducers({
	todos: todosReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
