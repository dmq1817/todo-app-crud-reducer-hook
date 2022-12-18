// Import libraries
import React, { useContext, useState } from 'react';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';

// Import files
import { todoContext } from '../Form';

function Todolist() {
    const todoData = useContext(todoContext);
    return (
        <React.Fragment>
            <ul className="list-none w-full flex flex-col gap-y-6 max-h-[200px] overflow-y-auto mb-4 p-5">
                {todoData.todoFilter.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        todoData={todoData}
                        todo={todo}
                        handleEdit={todoData.handleEdit}
                        checkAll={todoData.checkAll}
                    />
                ))}
            </ul>
            <span className="font-bold text-md text-gray-500 mt-auto  pt-5 border-t">
                Bạn có {todoData.todoArr.length} công việc cần làm.
            </span>
        </React.Fragment>
    );
}

function TodoItem({ todoData, todo, handleEdit, checkAll }) {
    const [onEdit, setOnEdit] = useState(false);
    const [editValue, setEditValue] = useState('');

    const handleEditTodo = (value) => {
        setOnEdit(true);
        setEditValue(value);
    };

    const handleSaveTodo = (id) => {
        setOnEdit(false);
        handleEdit(id, editValue);
    };

    if (onEdit) {
        return (
            <li className="flex flex-row justify-between items-center">
                <div className="flex flex-row items-center gap-x-4">
                    <input
                        type="text"
                        name="todo-edit"
                        id="todo-edit"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                    />
                </div>
                <button className="transition-colors hover:text-sky-500" onClick={() => handleSaveTodo(todo.id)}>
                    <AiFillEdit size="1.2rem" />
                </button>
            </li>
        );
    } else {
        return (
            <li key={todo.id} className="flex flex-row justify-between items-center">
                <div className="flex flex-row items-center gap-x-4">
                    <input
                        type="checkbox"
                        name="todo-checkbox"
                        id="todo-checkbox"
                        checked={todo.isCompleted}
                        onChange={() => todoData.handeUpdate(todo.id)}
                    />
                    <span className={`block ${todo.isCompleted ? 'line-through text-gray-500' : 'no-underline'}`}>
                        {todo.name}
                    </span>
                </div>
                <div className="flex flex-row items-center gap-x-6">
                    <button
                        className={`${todo.isCompleted ? 'text-gray-400' : 'transition-colors hover:text-sky-500'}`}
                        onClick={() => handleEditTodo(todo.name)}
                        disabled={todo.isCompleted}
                    >
                        <AiFillEdit size="1.2rem" />
                    </button>
                    <button
                        className="transition-colors hover:text-red-500"
                        onClick={() => todoData.handleDelete(todo.id)}
                    >
                        <AiFillDelete size="1.2rem" />
                    </button>
                </div>
            </li>
        );
    }
}

export default Todolist;
