function spiral(n) {
  const results = [];

  // Initialize the block of arrays
  for (let i = 0; i < n; i++) {
    results.push([]);
  }

  // The numbers being added to each block
  let counter = 1;

  let startColumn = 0;
  let endColumn = n -1;

  let startRow = 0;
  let endRow = n - 1;

  while(startColumn <= endColumn && startRow <= endRow) {
    // Top row
    for (let i = startColumn; i <= endColumn; i++) {
      results[startRow][i] = counter;
      counter++;
    }

    startRow++;

    // Right column
    for (let i = startRow; i <= endRow; i++) {
      results[i][endColumn] = counter;
      counter++
    }

    endColumn--;

    // Bottom row
    for (let i = endColumn; i >= startColumn; i--) {
      results[endRow][i] = counter;
      counter++
    }

    endRow--;

    // Left column
    for (let i = endRow; i >= startRow; i--) {
      results[i][startColumn] = counter;
      counter++
    }

    startColumn++;
  }
  return results;
}
