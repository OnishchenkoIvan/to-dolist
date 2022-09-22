import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    todoListId: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskID: string, todoListId: string) => void
    changeFilter: (filter: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeStatus: (taskID: string, isDone: boolean, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
}

const TodoList = (props: TodoListPropsType) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    let tasksItems: any = <span>Tasks list is empty</span>
    if (props.tasks.length) {
        tasksItems = props.tasks.map(task => {
            return (
                <li key={task.id} className={task.isDone ? "isDone" : ""}>
                    <input
                        onChange={(e) => props.changeStatus(task.id, e.currentTarget.checked, props.todoListId)}
                        type="checkbox"
                        checked={task.isDone}
                    />
                    <span>{task.title}</span>
                    <button onClick={() => props.removeTask(task.id, props.todoListId)}>x</button>
                </li>
            )
        })
    }

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        if (error) setError(false)
        setTitle(e.currentTarget.value)
    }
    const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") addTask()
    }
    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle, props.todoListId)
        } else {
            setError(true)
        }

        setTitle("")
    }
    const handlerCreator = (filter: FilterValuesType, todoListId: string) => {
        return () => props.changeFilter(filter, todoListId)
    }
    const userMessage =
        error
            ? <div style={{color: "hotpink"}}>Title is required!</div>
            : <div>Please, create list item</div>

    return (
        <div>
            <h3>
                {props.title}
                <button onClick={()=>props.removeTodoList(props.todoListId)}>x</button>
            </h3>
            <div>
                <input
                    className={error ? "error" : ""}
                    value={title}
                    onChange={changeTitle}
                    onKeyDown={onKeyDownAddTask}
                />
                <button onClick={addTask}>+</button>
                {userMessage}
            </div>
            <ul>
                {tasksItems}
            </ul>
            <div>
                <button
                    className={props.filter === "all" ? "btn-active btn" : "btn"}
                    onClick={() => props.changeFilter("all", props.todoListId)}>All
                </button>
                <button
                    className={props.filter === "active" ? "btn-active btn" : "btn"}
                    onClick={handlerCreator("active", props.todoListId)}>Active
                </button>
                <button
                    className={props.filter === "completed" ? "btn-active btn" : "btn"}
                    onClick={handlerCreator("completed", props.todoListId)}>Completed
                </button>
            </div>
        </div>
    );
};

export default TodoList;