const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'AUTHENTICATION':
      console.log(action.payload);

      return action.payload;
    default:
      return state;
  }
}
