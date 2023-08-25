export const currentUserSelector = (state: any) =>
  state.authentication.currentUser;

export const userNameSelector = (state: any) =>
  state.authentication.currentUser?.username;
