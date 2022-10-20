import React from "react";
import { FilterValuesType } from "./App";
import { Input } from "./components/Input";
import { EditableSpan } from "./components/EditableSpan";
import { Button, Checkbox, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type TodoListPropsType = {
  todoListId: string;
  title: string;
  tasks: Array<TaskType>;
  filter: FilterValuesType;
  removeTask: (taskID: string, todoListId: string) => void;
  changeFilter: (filter: FilterValuesType, todoListId: string) => void;
  addTask: (title: string, todoListId: string) => void;
  changeStatus: (taskID: string, isDone: boolean, todoListId: string) => void;
  removeTodoList: (todoListId: string) => void;
  changeTask: (
    todoListId: string,
    taskID: string,
    currentTitle: string
  ) => void;
  editTodoList: (todoListId: string, currentTitle: string) => void;
};

const TodoList = (props: TodoListPropsType) => {
  let tasksItems: any = <span>Tasks list is empty</span>;

  const changeTaskHandler = (taskID: string, currentTitle: string) => {
    props.changeTask(props.todoListId, taskID, currentTitle);
  };

  if (props.tasks.length) {
    tasksItems = props.tasks.map((task) => {
      return (
        <li key={task.id} className={task.isDone ? "isDone" : ""}>
          <Checkbox
            defaultChecked
            onChange={(e) =>
              props.changeStatus(
                task.id,
                e.currentTarget.checked,
                props.todoListId
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
            onClick={() => props.removeTask(task.id, props.todoListId)}
          >
            <Delete />
          </IconButton>
        </li>
      );
    });
  }

  const handlerCreator = (filter: FilterValuesType, todoListId: string) => {
    return () => props.changeFilter(filter, todoListId);
  };

  const addTaskHandler = (trimmedTitle: string) => {
    props.addTask(trimmedTitle, props.todoListId);
  };

  const editTodoListHandler = (currentTitle: string) => {
    props.editTodoList(props.todoListId, currentTitle);
  };
  return (
    <div>
      <h3>
        <EditableSpan title={props.title} callBack={editTodoListHandler} />
        <IconButton
          aria-label={"delete"}
          onClick={() => props.removeTodoList(props.todoListId)}
        >
          <Delete />
        </IconButton>
      </h3>
      <Input callBack={addTaskHandler} />
      <ul>{tasksItems}</ul>
      <div>
        <Button
          variant={props.filter === "all" ? "outlined" : "contained"}
          color="success"
          onClick={() => props.changeFilter("all", props.todoListId)}
        >
          All
        </Button>
        <Button
          variant={props.filter === "active" ? "outlined" : "contained"}
          color="error"
          onClick={handlerCreator("active", props.todoListId)}
        >
          Active
        </Button>
        <Button
          variant={props.filter === "completed" ? "outlined" : "contained"}
          color="secondary"
          onClick={handlerCreator("completed", props.todoListId)}
        >
          Completed
        </Button>
      </div>
    </div>
  );
};

export default TodoList;
