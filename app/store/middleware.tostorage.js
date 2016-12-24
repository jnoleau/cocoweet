export default (options) => {
  const {key, slicer, actions} = options;

  const middleware = ({getState}) => (next) => (action) => {
    const result = next(action);

    if (~actions.indexOf(action.type)) {
      localStorage.setItem(key, JSON.stringify(slicer(getState())));
    }

    return result;
  };

  return {
    restore: () => JSON.parse(localStorage.getItem(key)),
    middleware
  };
};
