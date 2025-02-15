import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
	const [todos, setTodos] = useState([]);
	const [newTodo, setNewTodo] = useState('');
	const [searchTerm, setSearchTerm] = useState('');
	const [isSort, setIsSort] = useState(false);
	const [editingTodoId, setEditingTodoId] = useState(null);
	const [editingTodoText, setEditingTodoText] = useState('');

	useEffect(() => {
		fetchTodos();
	}, []);

	const fetchTodos = async () => {
		try {
			const response = await axios.get('http://localhost:3005/todos');
			setTodos(response.data);
		} catch (error) {
			console.error('ошибка при загрузке данных', error);
		}
	};

	const addTodo = async (e) => {
		e.preventDefault();
		if (newTodo.trim() === '') return;
		try {
			const response = await axios.post('http://localhost:3005/todos', {
				title: newTodo,
				completed: false,
			});
			setTodos([...todos, response.data]);
			setNewTodo('');
		} catch (error) {
			console.error('ошибка при добавлении дела:', error);
		}
	};

	const updateTodoStatus = async (id, completed) => {
		try {
			await axios.patch(`http://localhost:3005/todos/${id}`, {
				completed: !completed,
			});
			fetchTodos();
		} catch (error) {
			console.error('ошибка при обновлении статуса дела:', error);
		}
	};

	const updateTodoText = async (id) => {
		try {
			await axios.patch(`http://localhost:3005/todos/${id}`, {
				title: editingTodoText,
			});
			setEditingTodoId(null);
			setEditingTodoText('');
			fetchTodos();
		} catch (error) {
			console.error('ошибка при обновлении текста дела:', error);
		}
	};

	const deleteTodo = async (id) => {
		try {
			await axios.delete(`http://localhost:3005/todos/${id}`);
			setTodos(todos.filter((todo) => todo.id !== id));
		} catch (error) {
			console.error('ошибка при удалении дела:', error);
		}
	};

	return (
		<TodoContext.Provider
			value={{
				todos,
				newTodo,
				searchTerm,
				isSort,
				editingTodoId,
				editingTodoText,
				setNewTodo,
				setSearchTerm,
				setIsSort,
				setEditingTodoId,
				setEditingTodoText,
				addTodo,
				updateTodoStatus,
				updateTodoText,
				deleteTodo,
			}}
		>
			{children}
		</TodoContext.Provider>
	);
};

export const useTodo = () => {
	const context = useContext(TodoContext);
	if (!context) throw new Error('useTodo должен использоваться внутри TodoProvider');
	return context;
};
