// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TodoList from './components/TodoList';
import TodoDetail from './components/TodoDetail';
import NotFound from './components/NotFound';

const App = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<TodoList />} />
				<Route path="/task/:id" element={<TodoDetail />} />
				<Route path="/NotFound" element={<NotFound />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Router>
	);
};

export default App;
