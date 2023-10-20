import { loginFailure, logout } from "./actions/auth.action";

const authMiddleware = (store) => (next) => (action) => {
  if (action.type === "API_REQUEST") {
    // Check if the user info is valid
    const state = store.getState();
    const user = state.user;

    if (!user || !user.token || !user.email || !user.userId) {
      // User info is invalid or missing, dispatch logout action
      store.dispatch(logout());
      return;
    }
  }

  return next(action);
};

export default authMiddleware;