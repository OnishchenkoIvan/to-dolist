import { v1 } from "uuid";
import { FilterValuesType, TodoListType } from "../App";
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  todolistsReducer,
} from "./todolists-reducer";

let todolistId2: string;
let todolistId1: string
let startState: Array<TodoListType>

beforeEach(() => {

todolistId1 = v1();
todolistId2 = v1();

startState = [
  { id: todolistId1, title: "What to learn", filter: "all" },
  { id: todolistId2, title: "What to buy", filter: "all" },
];
})

test("correct todolist should be removed", () => {


  const endState = todolistsReducer(startState, removeTodolistAC(todolistId1));

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});

test("correct todolist should be added", () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let newTodolistTitle = "New Todolist";

  const startState: Array<TodoListType> = [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ];

  const endState = todolistsReducer(
    startState,
    addTodolistAC(newTodolistTitle)
  );

  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe(newTodolistTitle);
});

test("correct filter of todolist should be changed", () => {
  let newFilter: FilterValuesType = "completed";

  const endState = todolistsReducer(
    startState,
    changeTodolistFilterAC(newFilter, todolistId2)
  );

  expect(endState[0].filter).toBe("all");
  expect(endState[1].filter).toBe(newFilter);
});

test("correct todolist should change its name", () => {
  let newTodolistTitle = "New Todolist";

  const endState = todolistsReducer(
    startState,
    changeTodolistTitleAC(newTodolistTitle, todolistId2)
  );

  expect(endState[0].title).toBe("What to learn");
  expect(endState[1].title).toBe(newTodolistTitle);
});