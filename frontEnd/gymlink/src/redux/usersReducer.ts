import { UserModel } from "../models/userModel";

export class UserState {
  public user: UserModel | null = null;
}

export enum UserActionType {
  updateUser = "updateUser",
  logInUser = "logInUser",
  logOutUser = "logOutUser",
}

export interface UserAction {
  type: UserActionType;
  payload?: any;
}

export function updateUser(newUser: UserModel): UserAction {
  return {
    type: UserActionType.updateUser,
    payload: newUser,
  };
}

export function logInUser(loggedUser: UserModel): UserAction {
  return {
    type: UserActionType.logInUser,
    payload: loggedUser,
  };
}

export function logOutUser(): UserAction {
  return {
    type: UserActionType.logOutUser,
  };
}

export const UserReducer = (
  currentState: UserState = new UserState(),
  action: UserAction
): UserState => {
  const newState: UserState = { ...currentState };
  switch (action.type) {
    case UserActionType.updateUser:
      newState.user = action.payload;
      break;
    case UserActionType.logInUser:
      newState.user = action.payload;
      break;
    case UserActionType.logOutUser:
      newState.user = null;
      break;
  }
  return newState;
};
