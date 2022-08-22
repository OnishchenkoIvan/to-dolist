import React from 'react';

export type TaskType = {
  id: number
  title: string
  isDone: boolean
}

type TodoListPorpsType = {
  title: string
  tasks: Array<TaskType>
}

const TodoList = (props: TodoListPorpsType) => {
  const tasksItems = props.tasks.map(task => {
    return (
      <li key={task.id}>
        <input type="checkbox" checked={task.isDone}/>
        <span>{task.title}</span>
      </li>
    )
  })
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input/>
        <button>+</button>
      </div>
      <ul>
        {tasksItems}
      </ul>
      <div>
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
      </div>
    </div>
  );
};

export default TodoList;