export default (options) => {
  const {key, slicer, actions} = options;

  return ({getState}) => (next) => (action) => {
    const result = next(action);

    if (~actions.indexOf(action.type)) {
      localStorage.setItem(key, JSON.stringify(slicer(getState())));
    }

    return result;
  };
};

export function restore(key) {
  return JSON.parse(localStorage.getItem(key));
}
