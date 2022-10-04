import React, { useState } from "react";
import "./App.css";
import TodoList, { TaskType } from "./TodoList";
import { v1 } from "uuid";
import { Input } from "./components/Input";
import { ButtonAppBar } from "./components/ButtonAppBar";
import { Container, Grid, Paper } from "@mui/material";
// CLI
// GUI => CRUD
// C+
// R+++....
// U++!
// D+

export type FilterValuesType = "all" | "active" | "completed";
type TodoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};
type TasksStateType = {
  [todoListId: string]: Array<TaskType>;
};

function App() {
  //BLL:
  const todoListId_1 = v1();
  const todoListId_2 = v1();

  const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
    { id: todoListId_1, title: "What to learn today", filter: "all" },
    { id: todoListId_2, title: "What to buy", filter: "all" },
  ]);
  const [tasks, setTasks] = useState<TasksStateType>({
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
    setTasks({
      ...tasks,
      [todoListId]: tasks[todoListId].filter((t) => t.id !== taskId),
    });
  };

  const addTask = (title: string, todoListId: string) => {
    setTasks({
      ...tasks,
      [todoListId]: [
        { id: v1(), title: title, isDone: false },
        ...tasks[todoListId],
      ],
    });
  };

  const changeStatus = (
    taskId: string,
    isDone: boolean,
    todoListId: string
  ) => {
    setTasks({
      ...tasks,
      [todoListId]: tasks[todoListId].map((t) =>
        t.id === taskId ? { ...t, isDone: isDone } : t
      ),
    });
  };

  const changeFilter = (filter: FilterValuesType, todoListId: string) => {
    setTodoLists(
      todoLists.map((tl) =>
        tl.id === todoListId ? { ...tl, filter: filter } : tl
      )
    );
  };

  const removeTodoList = (todoListId: string) => {
    setTodoLists(todoLists.filter((tl) => tl.id !== todoListId));
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
    const newTodolistId = v1();
    const newTodolist: TodoListType = {
      id: newTodolistId,
      title: newTitle,
      filter: "all",
    };
    setTodoLists([newTodolist, ...todoLists]);
    setTasks({ ...tasks, [newTodolistId]: [] });
  };

  const changeTask = (
    todoListId: string,
    taskID: string,
    currentTitle: string
  ) => {
    setTasks({
      ...tasks,
      [todoListId]: tasks[todoListId].map((el) =>
        el.id === taskID ? { ...el, title: currentTitle } : el
      ),
    });
  };

  const editTodoList = (todoListId: string, currentTitle: string) => {
    setTodoLists(
      todoLists.map((el) =>
        el.id === todoListId ? { ...el, title: currentTitle } : el
      )
    );
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

export default App;
