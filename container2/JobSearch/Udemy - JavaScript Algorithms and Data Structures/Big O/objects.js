let instrcutor = {
  firstName: "Kelly",
  isInstructor: true,
  favoriteNumbers: [1,2,3,4]
}
//       X               X                    X
//   firstName     isInstructor        favoriteNumbers

// When to use objects
// - when you don't need order
// - when you need fast access / insertion and removal
// Big O of Objects
// - Insertion - O(1)
// - Removal - O(1)
// - Searching - O(n)
// - Access - O(1)
// When you don't need any ordering, objects are an excellent choice!
// You can't insert at the beginning or end of an object
// Big O of Object.methods
// - Object.keys - O(n)
// - Object.values - O(n)
// - Object.entries - O(n)  // returns key and value
// - hasOwnProperty - O(1)  // boolean if exists