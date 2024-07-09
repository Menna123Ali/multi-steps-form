import dotProp from "dot-prop-immutable";
export const ACTION_TYPES = {
  UPDATE_PROP: "UPDATE_PROP",
  MERGE_PROP: "MERGE_PROP",
  DELETE_PROP: "DELETE_PROP",
};
const reducer = (state, action) => {
  const { UPDATE_PROP, DELETE_PROP, MERGE_PROP } = ACTION_TYPES;
  let newState = state;
  for (let i = 0; i < action.payload.length; i++) {
    switch (action.payload[i].type) {
      case UPDATE_PROP: {
        newState = dotProp.set(
          newState,
          action.payload[i].prop,
          action.payload[i].value
        );
        break;
      }
      case DELETE_PROP: {
        newState = dotProp.delete(newState, action.payload[i].prop);
        break;
      }
      case MERGE_PROP: {
        newState = dotProp.merge(
          newState,
          action.payload[i].prop,
          action.payload[i].value
        );
        break;
      }
    }
  }
  return newState;
};
export default reducer;
