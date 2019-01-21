const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'AUTHENTICATION':
      return action.payload;
    default:
      return state;
  }
}
