// Import files
import {
    SET_TODO,
    ADD_TODO,
    DELETE_TODO,
    EDIT_TODO,
    FILTER_TODO,
    UPDATE_TODO,
    CHECKALL_TODO,
    DELETEALL_TODO,
} from './constant';

// 2. Actions
export const setTodo = (payload) => {
    return {
        type: SET_TODO,
        payload: payload,
    };
};

export const addTodo = (payload) => {
    return {
        type: ADD_TODO,
        payload: payload,
    };
};

export const deleteTodo = (payload) => {
    return {
        type: DELETE_TODO,
        payload: payload,
    };
};

export const updateTodo = (payload) => {
    return {
        type: UPDATE_TODO,
        payload: payload,
    };
};

export const filterTodo = (payload) => {
    return {
        type: FILTER_TODO,
        payload: payload,
    };
};

export const editTodo = (payload_id, payload_value) => {
    return {
        type: EDIT_TODO,
        payload_id: payload_id,
        payload_value: payload_value,
    };
};

export const checkAllTodo = (payload) => {
    return {
        type: CHECKALL_TODO,
        payload: payload,
    };
};

export const deleteAllTodo = (payload) => {
    return {
        type: DELETEALL_TODO,
        payload: payload,
    };
};
