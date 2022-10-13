import {TasksStateType} from '../App';
import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeStatusTaskActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTitleTaskActionType = ReturnType<typeof changeTaskTitleAC>

type ActionsType = RemoveTaskActionType
  | AddTaskActionType
  | ChangeStatusTaskActionType
  | ChangeTitleTaskActionType
  | AddTodolistActionType
  | RemoveTodolistActionType

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
  switch (action.type) {
    case 'REMOVE-TASK':
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
      }
    case 'ADD-TASK':
      return {
        ...state,
        [action.payload.todolistId]: [{
          id: v1(),
          title: action.payload.title,
          isDone: false
        }, ...state[action.payload.todolistId]]
      }
    case 'CHANGE-STATUS-TASK':
      const {isDone} = action.payload
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId]
          .map(t => t.id === action.payload.taskId ? {...t, isDone} : t)
      }
    case 'CHANGE-TITLE-TASK':
      const {title} = action.payload
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId]
          .map(t => t.id === action.payload.taskId ? {...t, title} : t)
      }
    case 'ADD-TODOLIST':
      return {
        ...state,
        [action.payload.todolistId]: []
      }

    case 'REMOVE-TODOLIST':
      const {[action.payload.todoListId]: [], ...rest} = {...state}
      return rest
    // let copyState = {...state}
    // delete copyState[action.id]
    // return copyState

    default:
      throw new Error("I don't understand this type")
  }
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
  return {type: 'REMOVE-TASK', taskId, todolistId} as const
}
export const addTaskAC = (title: string, todolistId: string) => {
  return {type: 'ADD-TASK', payload: {title, todolistId}} as const
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
  return {type: 'CHANGE-STATUS-TASK', payload: {taskId, isDone, todolistId}} as const
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
  return {type: 'CHANGE-TITLE-TASK', payload: {taskId, title, todolistId}} as const
}
