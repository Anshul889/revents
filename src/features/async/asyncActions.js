import { ASYNC_ACTION_START, ASYNC_ACTION_FINISH, ASYNC_ACTION_ERROR } from "./asyncConstant"

export const aysncActionStart = () => {
  return {
    type: ASYNC_ACTION_START
  }
}

export const aysncActionFinish = () => {
  return {
    type: ASYNC_ACTION_FINISH
  }
}

export const aysncActionError = () => {
  return {
    type: ASYNC_ACTION_ERROR
  }
}