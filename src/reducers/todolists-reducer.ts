import { FilterValuesType, TodoListType } from "../App";
import { v1 } from "uuid";

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;

export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>;

export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>;

export type ActionType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistFilterActionType
  | ChangeTodolistTitleActionType;

const intitialState: Array<TodoListType> = []

export const todolistsReducer = (
  todolists = intitialState,
  action: ActionType
): TodoListType[] => {
  switch (action.type) {
    case "REMOVE-TODOLIST":
      return todolists.filter((tl) => tl.id !== action.payload.todoListId);

    case "ADD-TODOLIST":
      return [
        ...todolists,
        { id: action.payload.todolistId, title: action.payload.title, filter: "all" },
      ];

    case "CHANGE-TODOLIST-FILTER":
      return todolists.map((tl) =>
        tl.id === action.payload.todoListId
          ? { ...tl, filter: action.payload.filter }
          : tl
      );

    case "CHANGE-TODOLIST-TITLE":
      return todolists.map((tl) =>
        tl.id === action.payload.todoListId
          ? { ...tl, title: action.payload.title }
          : tl
      );
    default:
      return todolists;
  }
};

export const removeTodolistAC = (id: string) => {
  return {
    type: "REMOVE-TODOLIST",
    payload: { todoListId: id },
  } as const;
};

export const addTodolistAC = (title: string) => {
  return {
    type: "ADD-TODOLIST",
    payload: { title: title, todolistId: v1() },
  } as const;
};

export const changeTodolistFilterAC = (
  filter: FilterValuesType,
  todoListId: string
) => {
  return {
    type: "CHANGE-TODOLIST-FILTER",
    payload: {
      todoListId: todoListId,
      filter: filter,
    },
  } as const;
};

export const changeTodolistTitleAC = (title: string, todoListId: string) => {
  return {
    type: "CHANGE-TODOLIST-TITLE",
    payload: {
      todoListId,
      title,
    },
  } as const;
};
