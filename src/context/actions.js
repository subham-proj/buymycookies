export const loginStart = (userData) => ({
  type: "LOGIN_START",
});

export const loginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

export const loginFail = () => ({
  type: "LOGIN_FAILED",
});

export const logout = () => ({
  type: "LOGOUT",
});
