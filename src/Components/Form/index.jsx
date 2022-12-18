// Import libraries
import { useReducer, createContext, useEffect, useRef, useCallback } from 'react';

import Todolist from '../TodoList';

// Import files
import reducer, { initialState } from '../../reducer/reducer';
import {
    setTodo,
    addTodo,
    deleteTodo,
    updateTodo,
    filterTodo,
    editTodo,
    checkAllTodo,
    deleteAllTodo,
} from '../../reducer/actions';

// 0. Context
export const todoContext = createContext();

function Form() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { todoInput, todoStatus, todoArr, todoFilter, checkAll } = state;

    const todoInputRef = useRef();
    const statusInputRef = useRef();

    useEffect(() => {
        const temp = JSON.stringify(todoArr);
        localStorage.setItem('todos', temp);
    }, [todoArr]);

    useEffect(() => {
        handleFilter();
    }, [todoStatus, todoArr]);

    // Handle
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(setTodo(''));
        todoInputRef.current.focus();
    };

    const handleAdd = () => {
        dispatch(addTodo(todoInput));
    };

    const handleDelete = (id) => {
        dispatch(deleteTodo(id));
    };

    const handeUpdate = (id) => {
        dispatch(updateTodo(id));
    };

    const handleFilter = useCallback(() => {
        dispatch(filterTodo(statusInputRef.current.value));
    }, [statusInputRef]);

    const handleEdit = (id, value) => {
        dispatch(editTodo(id, value));
    };

    const handleCheckAll = (value) => {
        dispatch(checkAllTodo(value));
    };

    const handleDeleteAll = () => {
        dispatch(deleteAllTodo());
    };
    return (
        <todoContext.Provider value={{ todoArr, todoFilter, checkAll, handleDelete, handeUpdate, handleEdit }}>
            <form className="flex items-center mt-10 border p-2 rounded-xl" onSubmit={handleSubmit}>
                <input
                    ref={todoInputRef}
                    type="text"
                    id="todo-input"
                    name="todo-input"
                    placeholder="Nhập việc cần làm..."
                    className="outline-none px-4 py-2"
                    autoComplete="off"
                    value={todoInput}
                    onChange={(e) => dispatch(setTodo(e.target.value))}
                />
                <button
                    className="transition-colors uppercase font-bold text-[#ccc] hover:text-[#000]"
                    onClick={handleAdd}
                >
                    thêm
                </button>
            </form>
            <select className="outline-none mt-5 border p-2" onChange={(e) => handleFilter()} ref={statusInputRef}>
                <option value="all">Tất cả</option>
                <option value="completed">Hoàn thành</option>
                <option value="uncompleted">Chưa hoàn thành</option>
            </select>
            <div className="flex justify-between  w-full p-5 border-b">
                <input checked={checkAll} type="checkbox" onChange={() => handleCheckAll(!checkAll)} />
                <button className="font-bold text-red-500" onClick={handleDeleteAll}>
                    CLEAR
                </button>
            </div>
            <Todolist />
        </todoContext.Provider>
    );
}

export default Form;
