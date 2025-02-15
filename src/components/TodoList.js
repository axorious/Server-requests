import React from 'react';
import styles from './TodoList.module.css';
import { useTodo } from '../TodoContext';

const TodoList = () => {
	const {
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
	} = useTodo();

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
						{editingTodoId === todo.id ? (
							<>
								<input
									type="text"
									value={editingTodoText}
									onChange={(e) => setEditingTodoText(e.target.value)}
								/>
								<button onClick={() => updateTodoText(todo.id)}>
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
										updateTodoStatus(todo.id, todo.completed)
									}
								>
									{todo.title}
								</span>
								<div>
									<button onClick={() => setEditingTodoId(todo.id)}>
										изменить
									</button>
									<button onClick={() => deleteTodo(todo.id)}>
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
