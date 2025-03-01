import {
	FETCH_TODOS,
	ADD_TODO,
	UPDATE_TODO_STATUS,
	UPDATE_TODO_TEXT,
	DELETE_TODO,
} from '../../action';

const initialState = {
	todos: [],
};

const todosReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_TODOS:
			return {
				...state,
				todos: action.payload,
			};
		case ADD_TODO:
			return {
				...state,
				todos: [...state.todos, action.payload],
			};
		case UPDATE_TODO_STATUS:
			return {
				...state,
				todos: state.todos.map((todo) =>
					todo.id === action.payload
						? { ...todo, completed: !todo.completed }
						: todo,
				),
			};
		case UPDATE_TODO_TEXT:
			return {
				...state,
				todos: state.todos.map((todo) =>
					todo.id === action.payload.id
						? { ...todo, title: action.payload.title }
						: todo,
				),
			};
		case DELETE_TODO:
			return {
				...state,
				todos: state.todos.filter((todo) => todo.id !== action.payload),
			};
		default:
			return state;
	}
};

export default todosReducer;
