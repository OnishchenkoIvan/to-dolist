import { FilterValuesType, TodoListType } from "../App";
import { v1 } from "uuid";

export type RemoveTodolistActionType = ReturnType<typeof RemoveTodolistAC>;

export type AddTodolistActionType = ReturnType<typeof AddTodolistAC>;

export type ChangeTodolistFilterActionType = ReturnType<typeof ChangeTodolistFilterAC>;

export type ChangeTodolistTitleActionType = ReturnType<typeof ChangeTodolistTitleAC>;

export type ActionType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistFilterActionType
  | ChangeTodolistTitleActionType;

export const todolistsReducer = (
  todolists: TodoListType[],
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

export const RemoveTodolistAC = (id: string) => {
  return {
    type: "REMOVE-TODOLIST",
    payload: { todoListId: id },
  } as const;
};

export const AddTodolistAC = (title: string) => {
  return {
    type: "ADD-TODOLIST",
    payload: { title: title, todolistId: v1() },
  } as const;
};

export const ChangeTodolistFilterAC = (
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

export const ChangeTodolistTitleAC = (title: string, todoListId: string) => {
  return {
    type: "CHANGE-TODOLIST-TITLE",
    payload: {
      todoListId,
      title,
    },
  } as const;
};
