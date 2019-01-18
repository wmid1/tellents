export function authentication(header) {
  return {
    type: 'AUTHENTICATION',
    payload: header,
  };
}
export function authChange(auth) {
  return {
    type: 'AUTH_CHANGE',
    payload: auth,
  };
}
