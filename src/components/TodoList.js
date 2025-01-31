import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './TodoList.module.css';

const TodoList = () => {
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		axios
			.get('https://jsonplaceholder.typicode.com/todos')
			.then((response) => {
				setTodos(response.data);
			})
			.catch((error) => {
				console.error('Ошибка при загрузке данных:', error);
			});
	}, []);

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Todo List</h1>
			<ul className={styles.list}>
				{todos.map((todo) => (
					<li key={todo.id} className={styles.listItem}>
						<span
							className={
								todo.completed ? styles.completed : styles.notCompleted
							}
						>
							{todo.title}
						</span>
					</li>
				))}
			</ul>
		</div>
	);
};

export default TodoList;
