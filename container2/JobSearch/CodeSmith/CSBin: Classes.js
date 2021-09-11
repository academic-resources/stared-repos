
function User(name, score) {
  const newUser = Object.create(functions)
  newUser.name = name
  newUser.score = score
  return newUser
}
const functions = {
  increment : function () { this.score++ }
}

class UserFromClass {
  constructor(name, score) {
    this.name = name
    this.score = score
  }

  increment() { this.score++ }
}


const user1 = User("oli", 5)
console.log(user1)
user1.increment()
console.log(user1.score)

const user2 = new User ("oli", 7)
console.log(user2)
user2.increment()
console.log(user2.score)