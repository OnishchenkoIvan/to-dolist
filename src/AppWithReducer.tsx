import React, { useReducer } from "react";
import "./App.css";
import TodoList, { TaskType } from "./TodoList";
import { v1 } from "uuid";
import { Input } from "./components/Input";
import { ButtonAppBar } from "./components/ButtonAppBar";
import { Container, Grid, Paper } from "@mui/material";
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  todolistsReducer,
} from "./reducers/todolists-reducer";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  tasksReducer,
} from "./reducers/tasks-reducer";

export type FilterValuesType = "all" | "active" | "completed";
export type TodoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};
export type TasksStateType = {
  [todoListId: string]: Array<TaskType>;
};

function AppWithReducer() {
  //BLL:
  const todoListId_1 = v1();
  const todoListId_2 = v1();

  const [todoLists, dispatchToTodolist] = useReducer(todolistsReducer, [
    { id: todoListId_1, title: "What to learn today", filter: "all" },
    { id: todoListId_2, title: "What to buy", filter: "all" },
  ]);
  const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
    [todoListId_1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS&TS", isDone: true },
      { id: v1(), title: "REACT", isDone: false },
    ],
    [todoListId_2]: [
      { id: v1(), title: "BEER", isDone: true },
      { id: v1(), title: "MEAT", isDone: true },
      { id: v1(), title: "FISH", isDone: false },
    ],
  });

  const removeTask = (taskId: string, todoListId: string) => {
    dispatchToTasks(removeTaskAC(taskId, todoListId));
  };

  const addTask = (title: string, todoListId: string) => {
    dispatchToTasks(addTaskAC(title, todoListId));
  };

  const changeStatus = (
    taskId: string,
    isDone: boolean,
    todoListId: string
  ) => {
    dispatchToTasks(changeTaskStatusAC(taskId, isDone, todoListId));
  };

  const changeFilter = (filter: FilterValuesType, todoListId: string) => {
    dispatchToTodolist(changeTodolistFilterAC(filter, todoListId));
  };

  const removeTodoList = (todoListId: string) => {
    const action = removeTodolistAC(todoListId);
    dispatchToTodolist(action);
    dispatchToTasks(action);
  };

  //UI:
  const getTasksForTodoList = (
    filter: FilterValuesType,
    tasks: Array<TaskType>
  ) => {
    switch (filter) {
      case "active":
        return tasks.filter((t) => !t.isDone);
      case "completed":
        return tasks.filter((t) => t.isDone);
      default:
        return tasks;
    }
  };

  const addTodolist = (newTitle: string) => {
    const action = addTodolistAC(newTitle);
    dispatchToTodolist(action);
    dispatchToTasks(action);
  };

  const changeTask = (
    todoListId: string,
    taskID: string,
    currentTitle: string
  ) => {
    dispatchToTasks(changeTaskTitleAC(todoListId, taskID, currentTitle));
  };

  const editTodoList = (todoListId: string, currentTitle: string) => {
    dispatchToTodolist(changeTodolistTitleAC(todoListId, currentTitle));
  };

  const todoListsComponents = todoLists.map((tl) => {
    const tasksForTodoList = getTasksForTodoList(tl.filter, tasks[tl.id]);
    return (
      <Grid item>
        <Paper style={{ padding: "10px" }}>
          <TodoList
            key={tl.id}
            todoListId={tl.id}
            filter={tl.filter}
            title={tl.title}
            tasks={tasksForTodoList}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeStatus={changeStatus}
            removeTodoList={removeTodoList}
            changeTask={changeTask}
            editTodoList={editTodoList}
          />
        </Paper>
      </Grid>
    );
  });

  return (
    <div className="App">
      <ButtonAppBar />
      <Container fixed>
        <Grid container style={{ padding: "20px" }}>
          <Input callBack={addTodolist} />
        </Grid>
        <Grid container spacing={3}>
          {todoListsComponents}
        </Grid>
      </Container>
    </div>
  );
}

export default AppWithReducer;
