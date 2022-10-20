import React from "react";
import { FilterValuesType } from "./App";
import { Input } from "./components/Input";
import { EditableSpan } from "./components/EditableSpan";
import { Button, Checkbox, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "./state/store";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
} from "./reducers/tasks-reducer";
import {
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
} from "./reducers/todolists-reducer";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type TodoListPropsType = {
  todolistId: string;
  title: string;
  filter: FilterValuesType;
};

const TodolistWithRedux = ({
  todolistId,
  title,
  filter,
}: TodoListPropsType) => {
  let tasksItems: any = <span>Tasks list is empty</span>;

  let tasksForTodolist = useSelector<AppRootStateType, Array<TaskType>>(
    (state) => state.tasks[todolistId]
  );
  const dispatch = useDispatch();

  const changeTaskHandler = (taskID: string, currentTitle: string) => {
    dispatch(changeTaskTitleAC(taskID, currentTitle, todolistId));
  };

  const handlerFilterTask = (filter: FilterValuesType, todoListId: string) => {
    return () => dispatch(changeTodolistFilterAC(filter, todoListId));
  };

  const addTaskHandler = (trimmedTitle: string) => {
    dispatch(addTaskAC(trimmedTitle, todolistId));
  };

  const removeTodolist = () => {
    dispatch(removeTodolistAC(todolistId));
  };

  const editTodoListHandler = (currentTitle: string) => {
    dispatch(changeTodolistTitleAC(currentTitle, todolistId));
  };

  if (filter === "active") {
    tasksForTodolist = tasksForTodolist.filter((t) => !t.isDone);
  }
  if (filter === "completed") {
    tasksForTodolist = tasksForTodolist.filter((t) => t.isDone);
  }

  if (tasksForTodolist.length) {
    tasksItems = tasksForTodolist.map((task) => {
      return (
        <li key={task.id} className={task.isDone ? "isDone" : ""}>
          <Checkbox
            // defaultChecked
            onChange={(e) =>
              dispatch(
                changeTaskStatusAC(task.id, e.currentTarget.checked, todolistId)
              )
            }
            checked={task.isDone}
          />
          <EditableSpan
            title={task.title}
            callBack={(newTitle: string) =>
              changeTaskHandler(task.id, newTitle)
            }
          />
          <IconButton
            aria-label={"delete"}
            onClick={() => dispatch(removeTaskAC(task.id, todolistId))}
          >
            <Delete />
          </IconButton>
        </li>
      );
    });
  }

  return (
    <div>
      <h3>
        <EditableSpan title={title} callBack={editTodoListHandler} />
        <IconButton aria-label={"delete"} onClick={removeTodolist}>
          <Delete />
        </IconButton>
      </h3>
      <Input callBack={addTaskHandler} />
      <ul>{tasksItems}</ul>
      <div>
        <Button
          variant={filter === "all" ? "outlined" : "contained"}
          color="success"
          onClick={handlerFilterTask("all", todolistId)}
        >
          All
        </Button>
        <Button
          variant={filter === "active" ? "outlined" : "contained"}
          color="error"
          onClick={handlerFilterTask("active", todolistId)}
        >
          Active
        </Button>
        <Button
          variant={filter === "completed" ? "outlined" : "contained"}
          color="secondary"
          onClick={handlerFilterTask("completed", todolistId)}
        >
          Completed
        </Button>
      </div>
    </div>
  );
};

export default TodolistWithRedux;
