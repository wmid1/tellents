const initialState = { auth: false };

export default function(state = initialState, action) {
  switch (action.type) {
    case 'AUTH_CHANGE':
      console.log(action.payload);

      return { ...state, auth: action.payload };
    default:
      return state;
  }
}
