import {
	FETCH_TODOS,
	ADD_TODO,
	UPDATE_TODO_STATUS,
	UPDATE_TODO_TEXT,
	DELETE_TODO,
	SET_LOADING,
} from '../action';

const initialState = {
	todos: [],
	isLoading: false,
};

const todosReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_LOADING:
			return {
				...state,
				isLoading: action.payload,
			};
		case FETCH_TODOS:
			return {
				...state,
				todos: action.payload,
				isLoading: false,
			};
		case ADD_TODO:
			return {
				...state,
				todos: [...state.todos, action.payload],
				isLoading: false,
			};
		case UPDATE_TODO_STATUS:
			return {
				...state,
				todos: state.todos.map((todo) =>
					todo.id === action.payload
						? { ...todo, completed: !todo.completed }
						: todo,
				),
				isLoading: false,
			};
		case UPDATE_TODO_TEXT:
			return {
				...state,
				todos: state.todos.map((todo) =>
					todo.id === action.payload.id
						? { ...todo, title: action.payload.title }
						: todo,
				),
				isLoading: false,
			};
		case DELETE_TODO:
			return {
				...state,
				todos: state.todos.filter((todo) => todo.id !== action.payload),
				isLoading: false,
			};
		default:
			return state;
	}
};

export default todosReducer;
