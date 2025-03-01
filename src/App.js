import React from 'react';
import TodoList from './components/TodoList';
import { Provider } from 'react-redux';
import store from './store';

function App() {
	return (
		<Provider store={store}>
			<div className="App">
				<TodoList />
			</div>
		</Provider>
	);
}

export default App;
