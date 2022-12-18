// Import libraries
import { v4 } from 'uuid';
const getLocalStorage = JSON.parse(localStorage.getItem('todos'));

// 1. InitialState
export const initialState = {
    todoInput: '',
    todoArr: getLocalStorage ?? [],
    todoStatus: 'all',
    todoFilter: [],
    isEdit: 'false',
    checkAll: false,
};

// 3. Reducer
const reducer = (state, action) => {
    let newState;
    const newTodo = [...state.todoArr];

    switch (action.type) {
        case 'set_todo':
            newState = {
                ...state,
                todoInput: action.payload,
            };
            break;
        case 'add_todo':
            newState = {
                ...state,
                todoArr: [{ id: v4(), name: state.todoInput, isCompleted: false }, ...state.todoArr],
            };
            break;
        case 'delete_todo':
            const deleteTodo = newTodo.filter((todo) => action.payload !== todo.id);

            newState = {
                ...state,
                todoArr: deleteTodo,
            };
            break;
        case 'update_todo':
            const updateTodo = newTodo.map((todo) => {
                if (action.payload === todo.id) {
                    return {
                        ...todo,
                        isCompleted: !todo.isCompleted,
                    };
                }
                return todo;
            });

            newState = {
                ...state,
                todoArr: updateTodo,
            };
            break;
        case 'filter_todo':
            if (action.payload === 'completed') {
                const filter = newTodo.filter((todo) => todo.isCompleted === true);
                newState = {
                    ...state,
                    todoStatus: action.payload,
                    todoFilter: filter,
                };
            } else if (action.payload === 'uncompleted') {
                const filter = newTodo.filter((todo) => todo.isCompleted === false);
                newState = {
                    ...state,
                    todoStatus: action.payload,
                    todoFilter: filter,
                };
            } else {
                const filter = newTodo.filter((todo) => todo);
                newState = {
                    ...state,
                    todoStatus: action.payload,
                    todoFilter: filter,
                };
            }
            break;
        case 'edit_todo':
            const edit = newTodo.map((todo) => {
                if (todo.id === action.payload_id) {
                    todo.name = action.payload_value;
                }
                return todo;
            });
            newState = {
                ...state,
                todoArr: edit,
            };
            break;
        case 'checkAll_todo':
            const checkState = {
                ...state,
                checkAll: action.payload,
            };

            const check = newTodo.map((todo) => {
                return {
                    ...todo,
                    isCompleted: checkState.checkAll,
                };
            });

            newState = {
                ...checkState,
                todoArr: check,
            };
            break;
        case 'deleteAll_todo':
            const deleteAll = newTodo.filter((todo) => {
                return todo.isCompleted === false;
            });

            newState = {
                ...state,
                checkAll: false,
                todoArr: deleteAll,
            };
            break;
        default:
            throw new Error('invalid action');
    }

    return newState;
};

export default reducer;
