// TodoList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './TodoList.module.css';

const TodoList = () => {
	const [todos, setTodos] = useState([]);
	const [newTodo, setNewTodo] = useState('');
	const [searchTerm, setSearchTerm] = useState('');
	const [isSort, setIsSort] = useState(false);

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

	const filteredTodos = todos.filter((todo) =>
		todo.title.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	const sortedTodos = isSort
		? [...filteredTodos].sort((a, b) => a.title.localeCompare(b.title))
		: filteredTodos;

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Todo List</h1>
			<form onSubmit={addTodo} className={styles.inputGroup}>
				<input
					type="text"
					value={newTodo}
					onChange={(e) => setNewTodo(e.target.value)}
					placeholder="добавить новое дело"
				/>
				<button type="submit">добавить</button>
			</form>
			<input
				type="text"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				placeholder="поиск дел"
				className={styles.searchInput}
			/>
			<button onClick={() => setIsSort(!isSort)} className={styles.sortButton}>
				{isSort ? 'отменить сортировку' : 'сортировать по алфавиту'}
			</button>
			<ul className={styles.list}>
				{sortedTodos.map((todo) => (
					<li key={todo.id} className={styles.listItem}>
						<Link to={`/task/${todo.id}`}>
							<span
								className={
									todo.completed
										? styles.completed
										: styles.notCompleted
								}
								onClick={() => updateTodoStatus(todo.id, todo.completed)}
							>
								{todo.title.length > 25
									? `${todo.title.substring(0, 25)}...`
									: todo.title}
							</span>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default TodoList;
