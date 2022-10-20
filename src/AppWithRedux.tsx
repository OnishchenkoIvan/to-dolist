import React from "react";
import "./App.css";
import { TaskType } from "./TodoList";
import { Input } from "./components/Input";
import { ButtonAppBar } from "./components/ButtonAppBar";
import { Container, Grid, Paper } from "@mui/material";
import { addTodolistAC } from "./reducers/todolists-reducer";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "./state/store";
import TodolistWithRedux from "./TodolistWithRedux";

export type FilterValuesType = "all" | "active" | "completed";
export type TodoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};
export type TasksStateType = {
  [todoListId: string]: Array<TaskType>;
};

function AppWithRedux() {
  const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(
    (state) => state.todolists
  );

  const dispatch = useDispatch();

  const addTodolist = (newTitle: string) => {
    dispatch(addTodolistAC(newTitle));
  };

  const todoListsComponents = todoLists.map((tl) => {
    return (
      <Grid key={tl.id} item>
        <Paper style={{ padding: "10px" }}>
          <TodolistWithRedux
            todolistId={tl.id}
            filter={tl.filter}
            title={tl.title}
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

export default AppWithRedux;
