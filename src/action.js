import axios from 'axios';

export const FETCH_TODOS = 'FETCH_TODOS';
export const ADD_TODO = 'ADD_TODO';
export const UPDATE_TODO_STATUS = 'UPDATE_TODO_STATUS';
export const UPDATE_TODO_TEXT = 'UPDATE_TODO_TEXT';
export const DELETE_TODO = 'DELETE_TODO';

export const fetchTodos = () => async (dispatch) => {
	try {
		const response = await axios.get('http://localhost:3005/todos');
		dispatch({ type: FETCH_TODOS, payload: response.data });
	} catch (error) {
		console.error('ошибка при загрузке данных', error);
	}
};

export const addTodo = (title) => async (dispatch) => {
	try {
		const response = await axios.post('http://localhost:3005/todos', {
			title,
			completed: false,
		});
		dispatch({ type: ADD_TODO, payload: response.data });
	} catch (error) {
		console.error('ошибка при добавлении дела:', error);
	}
};

export const updateTodoStatus = (id, completed) => async (dispatch) => {
	try {
		await axios.patch(`http://localhost:3005/todos/${id}`, {
			completed: !completed,
		});
		dispatch({ type: UPDATE_TODO_STATUS, payload: id });
	} catch (error) {
		console.error('ошибка при обновлении статуса дела:', error);
	}
};

export const updateTodoText = (id, title) => async (dispatch) => {
	try {
		await axios.patch(`http://localhost:3005/todos/${id}`, {
			title,
		});
		dispatch({ type: UPDATE_TODO_TEXT, payload: { id, title } });
	} catch (error) {
		console.error('ошибка при обновлении текста дела:', error);
	}
};

export const deleteTodo = (id) => async (dispatch) => {
	try {
		await axios.delete(`http://localhost:3005/todos/${id}`);
		dispatch({ type: DELETE_TODO, payload: id });
	} catch (error) {
		console.error('ошибка при удалении дела:', error);
	}
};
