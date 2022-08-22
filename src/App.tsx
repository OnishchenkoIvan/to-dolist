import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";

export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {
  //BLL:
  const todoListTitle: string = "What to learn today"
  const [tasks, setTasks] = useState<Array<TaskType>>([
    {id: 1, title: "HTML&CSS", isDone: true},
    {id: 2, title: "JS&TS", isDone: true},
    {id: 3, title: "REACT", isDone: false},
  ])
  const [filter, setFilter] = useState<FilterValuesType>('all')

  const removeTask = (taskID: number) => {
    setTasks(tasks.filter(t => t.id !== taskID))
  }
  const changeFilter = (filter: FilterValuesType) => {
    setFilter(filter)
  }

  const getTasksForTodoList = () => {
    switch (filter) {
      case "active":
        return tasks.filter(t => !t.isDone)
      case 'completed':
        return tasks.filter(t => t.isDone);
      default:
        return tasks
    }

    // let tasksForTodoList = tasks
    // if (filter === 'active') {
    //   tasksForTodoList = tasks.filter(t => !t.isDone)
    // }
    // if (filter === 'completed') {
    //   tasksForTodoList = tasks.filter(t => t.isDone)
    // }
    // return tasksForTodoList
  }
  //UI:

  return (
    <div className="App">
      <TodoList title={todoListTitle}
                tasks={getTasksForTodoList()}
                removeTask={removeTask}
                changeFilter={changeFilter}/>
    </div>
  );
}

export default App;
