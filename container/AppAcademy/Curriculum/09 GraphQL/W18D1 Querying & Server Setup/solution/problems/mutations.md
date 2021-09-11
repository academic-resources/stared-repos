

1. Create 3 new wizards and make sure you can view their name, house, and patronus information:
```js
mutation {
  addWizard(name: "Harry Trotter", houseId:1, patronusId: 2) {
    id,
    name,
    house {
      name
    },
    patronus {
      form
    }
  }
}

// wizard 2
mutation {
  addWizard(name: "Legolas TotallyNotAnElf", houseId:1, patronusId: 5) {
    id,
    name,
    house {
      name
    },
    patronus {
      form
    }
  }
}

// wizard 3
mutation {
  addWizard(name: "Party Parrot", houseId:4, patronusId: 6) {
    id,
    name,
    house {
      name
    },
    patronus {
      form
    }
  }
}
```


2. Edit the name of a wizard and verify that no other value has changed on that wizard.

```js
// updateWizard
mutation {
  updateWizard(id: 1, name:"Totally Not Harry Potter") {
    id,
    name,
    house {
      name
    },
    patronus {
      form
    }
  }
}
```

3. Edit the house `id` and patronus `id` of a wizard and verify their name did not change. (You'll need to provide an `id` for the wizard you'd like to mutate).

```js
mutation {
  updateWizard(id: 1, houseId: 4, patronusId: 3) {
    id,
    name,
    house {
      name
    },
    patronus {
      form
    }
  }
}
```

4. Delete two wizards (just make sure you are deleting wizards who exist! You can query the `wizards` root type for a list of all wizards.)


```js
// wizard 1
mutation {
  deleteWizard(id:1){
  }
}

// wizard 2
mutation {
  deleteWizard(id:2){
  }
}
```