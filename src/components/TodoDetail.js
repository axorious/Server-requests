import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './TodoDetails.module.css';

const TodoDetail = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [todo, setTodo] = useState(null);
	const [editingTodoText, setEditingTodoText] = useState('');
	const [isNotFound, setIsNotFound] = useState(false);

	const fetchTodo = useCallback(async () => {
		try {
			const response = await axios.get(`http://localhost:3005/todos/${id}`);
			setTodo(response.data);
			setEditingTodoText(response.data.title);
		} catch (error) {
			if (error.response && error.response.status === 404) {
				setIsNotFound(true);
			} else {
				console.error('Ошибка при загрузке данных', error);
			}
		}
	}, [id]);

	useEffect(() => {
		fetchTodo();
	}, [fetchTodo]);

	const updateTodoText = async () => {
		try {
			await axios.patch(`http://localhost:3005/todos/${id}`, {
				title: editingTodoText,
			});
			fetchTodo();
		} catch (error) {
			console.error('Ошибка при обновлении текста дела:', error);
		}
	};

	const deleteTodo = async () => {
		try {
			await axios.delete(`http://localhost:3005/todos/${id}`);
			navigate('/');
		} catch (error) {
			console.error('Ошибка при удалении дела:', error);
		}
	};

	if (isNotFound) {
		navigate('/not-found', { replace: true });
		return null;
	}

	if (!todo) return <div>Загрузка...</div>;

	return (
		<div className={styles.container}>
			<button className={styles.backButton} onClick={() => navigate(-1)}>
				Назад
			</button>
			<h1 className={styles.title}>Детали задачи</h1>
			<h2 className={styles.taskTitle}>{todo.title}</h2>
			<input
				type="text"
				value={editingTodoText}
				onChange={(e) => setEditingTodoText(e.target.value)}
				className={styles.editInput}
			/>
			<button className={styles.saveButton} onClick={updateTodoText}>
				Сохранить
			</button>
			<button className={styles.deleteButton} onClick={deleteTodo}>
				Удалить
			</button>
		</div>
	);
};

export default TodoDetail;
