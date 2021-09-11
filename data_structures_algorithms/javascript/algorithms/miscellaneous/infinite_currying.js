// Can be used for infinite currying of a multiplication function but
// the reduce call would need an accumulator initialized to 1 rather
// than 0
const infiniteCurrying = func => {
  const next = (...args) => {
    // 'x' refers to the next curried argument
    return x => {
      // If no arguments have been passed in the next curried arg,
      // use the array reduce method to aggregate results
      if (!x) {
        return args.reduce((acc, result)  => {
          // Call the function that was passed as the first param to
          // the infinite currying function
          return func(acc, result);
        }, 0)
      }
      // If there is a following curried arg, return
      // the following arg as a list with the previous args
      return next(...args, x);
    };
  };
  // Next initializes with no arguments
  return next();
}

const infiniteSum = infiniteCurrying((x, y) => x + y);
