const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DogSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  breed: {
    type: String,
    required: true
  },
  toys: [
    {
      type: Schema.Types.ObjectId,
      ref: "toy"
    }
  ]
});

DogSchema.statics.addnewToy = (dogId, toyId) => {
  const Dog = mongoose.model("dog");
  const Toy = mongoose.model("toy");

  return Dog.findById(dogId).then(foundDog => {
    return Toy.findById(toyId).then(foundToy => {
      foundDog.toys.push(foundToy);
      foundToy.dogs.push(foundDog);
      return Promise.all([foundDog.save(), foundToy.save()]).then(
        ([savedDog, savedToy]) => savedDog
      );
    });
  });
};

const Dog = mongoose.model("dog", DogSchema);
module.exports = Dog;
