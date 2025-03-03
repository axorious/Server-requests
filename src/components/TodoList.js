import React, { useEffect, useState } from 'react';
import styles from './TodoList.module.css';
import {
	fetchTodos,
	addTodo,
	updateTodoStatus,
	updateTodoText,
	deleteTodo,
} from '../action';
import { useSelector, useDispatch } from 'react-redux';

const TodoList = () => {
	const dispatch = useDispatch();
	const todos = useSelector((state) => state.todos.todos);
	const isLoading = useSelector((state) => state.todos.isLoading);
	const [newTodo, setNewTodo] = useState('');
	const [searchTerm, setSearchTerm] = useState('');
	const [isSort, setIsSort] = useState(false);
	const [editingTodoId, setEditingTodoId] = useState(null);
	const [editingTodoText, setEditingTodoText] = useState('');

	useEffect(() => {
		dispatch(fetchTodos());
	}, [dispatch]);

	const handleAddTodo = (e) => {
		e.preventDefault();
		if (newTodo.trim() === '') return;
		dispatch(addTodo(newTodo));
		setNewTodo('');
	};

	const handleUpdateTodoStatus = (id, completed) => {
		dispatch(updateTodoStatus(id, completed));
	};

	const handleUpdateTodoText = (id) => {
		dispatch(updateTodoText(id, editingTodoText));
		setEditingTodoId(null);
		setEditingTodoText('');
	};

	const handleDeleteTodo = (id) => {
		dispatch(deleteTodo(id));
	};

	const filteredTodos = searchTerm
		? todos.filter((todo) =>
				todo.title.toLowerCase().includes(searchTerm.toLowerCase()),
			)
		: todos;

	const sortedTodos = isSort
		? [...filteredTodos].sort((a, b) => a.title.localeCompare(b.title))
		: filteredTodos;

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Todo List</h1>
			{isLoading && <div className={styles.loader}>Загрузка...</div>}
			<form onSubmit={handleAddTodo} className={styles.inputGroup}>
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
						{editingTodoId === todo.id ? (
							<>
								<input
									type="text"
									value={editingTodoText}
									onChange={(e) => setEditingTodoText(e.target.value)}
								/>
								<button onClick={() => handleUpdateTodoText(todo.id)}>
									сохранить
								</button>
								<button onClick={() => setEditingTodoId(null)}>
									отмена
								</button>
							</>
						) : (
							<>
								<span
									className={
										todo.completed
											? styles.completed
											: styles.notCompleted
									}
									onClick={() =>
										handleUpdateTodoStatus(todo.id, todo.completed)
									}
								>
									{todo.title}
								</span>
								<div>
									<button onClick={() => setEditingTodoId(todo.id)}>
										изменить
									</button>
									<button onClick={() => handleDeleteTodo(todo.id)}>
										удалить
									</button>
								</div>
							</>
						)}
					</li>
				))}
			</ul>
		</div>
	);
};

export default TodoList;
