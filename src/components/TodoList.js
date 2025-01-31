import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './TodoList.module.css';

const TodoList = () => {
	const [todos, setTodos] = useState([]);
	const [newTodo, setNewTodo] = useState('');
	const [searchTerm, setSearchTerm] = useState('');
	const [sort, setSort] = useState(false);

	useEffect(() => {
		fetchTodos();
	}, []);

	const fetchTodos = async () => {
		try {
			const response = await axios.get('http://localhost:3005/todos');
			setTodos(response.data);
		} catch (error) {
			console.error('ошибка при загрухзке данных', error);
		}
	};

	const addTodo = async () => {
		if (newTodo.trim() === '') return;
		try {
			const response = await axios.post('http://localhost:3005/todos', {
				title: newTodo,
				completed: false,
			});
			setTodos([...todos, response.data]);
			setNewTodo('');
		} catch (error) {
			console.error('ошибка при добавление дела:', error);
		}
	};

	const updateTodo = async (id, completed) => {
		try {
			await axios.patch(`http://localhost:3005/todos/${id}`, {
				completed: !completed,
			});
			fetchTodos();
		} catch (error) {
			console.error('ошибка при обновление дела:', error);
		}
	};

	const deleteTodo = async (id) => {
		try {
			await axios.delete(`http://localhost:3005/todos/${id}`);
			setTodos(todos.filter((todo) => todo.id !== id));
		} catch (error) {
			console.log('ошибка при удаление дела:', error);
		}
	};

	const filteredTodos = todos.filter((todo) =>
		todo.title.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	const sortedTodos = sort
		? [...filteredTodos].sort((a, b) => a.title.localeCompare(b.title))
		: filteredTodos;

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Todo List</h1>
			<div className={styles.inputGroup}>
				<input
					type="text"
					value={newTodo}
					onChange={(e) => setNewTodo(e.target.value)}
					placeholder="добавить новое дело"
				/>
				<button onClick={addTodo}>добавить</button>
			</div>
			<input
				type="text"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				placeholder="поиск дел"
				className={styles.searchInput}
			/>
			<button onClick={() => setSort(!sort)} className={styles.sortButton}>
				{sort ? 'отменить сортировку' : 'сортировать по алфавиту'}
			</button>
			<ul className={styles.list}>
				{sortedTodos.map((todo) => (
					<li key={todo.id} className={styles.listItem}>
						<span
							className={
								todo.completed ? styles.completed : styles.notCompleted
							}
							onClick={() => updateTodo(todo.id, todo.completed)}
						>
							{todo.title}
						</span>
						<button onClick={() => deleteTodo(todo.id)}>удалить</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default TodoList;
