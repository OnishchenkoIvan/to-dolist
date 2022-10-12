import { FilterValuesType, TodoListType } from "../App";
import { v1 } from "uuid";

type RemoveTodoListAT = ReturnType<typeof RemoveTodoListAC>;

type AddTodoListAT = ReturnType<typeof AddTodoListAC>;

type ChangeTodoListFilterAT = ReturnType<typeof ChangeTodoListFilterAC>;

type ChangeTodoListTitleAT = ReturnType<typeof ChangeTodoListTitleAC>;

type ActionType =
  | RemoveTodoListAT
  | AddTodoListAT
  | ChangeTodoListFilterAT
  | ChangeTodoListTitleAT;

export const todolistsReducer = (
  todolists: TodoListType[],
  action: ActionType
): TodoListType[] => {
  switch (action.type) {
    case "REMOVE-TODOLIST":
      return todolists.filter((tl) => tl.id !== action.payload.todoListId);

    case "ADD-TODOLIST":
      const newTodoListId: string = v1();
      return [
        ...todolists,
        { id: newTodoListId, title: action.payload.title, filter: "all" },
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

export const RemoveTodoListAC = (id: string) => {
  return {
    type: "REMOVE-TODOLIST",
    payload: { todoListId: id },
  } as const;
};

export const AddTodoListAC = (title: string) => {
  return {
    type: "ADD-TODOLIST",
    payload: { title: title },
  } as const;
};

export const ChangeTodoListFilterAC = (
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

export const ChangeTodoListTitleAC = (title: string, todoListId: string) => {
  return {
    type: "CHANGE-TODOLIST-TITLE",
    payload: {
      todoListId,
      title,
    },
  } as const;
};
