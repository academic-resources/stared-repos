function flatten(data) {
  return data.reduce(function(result, next) {
    result.push(next);
    if (next.objectKey) {
      result = result.concat(flatten(next.objectKey));
      next.objectKey = [];
    }
    return result;
  }, []);
}
