Practice your query syntax using GraphiQL to get a feel for how schemas are set up in GraphQL. Feel free to use this file to write out your queries before you copy and paste them into GraphiQL. For problems that accept variables make sure to test each answer you come up with with multiple `id`s to make sure they work.

1. Write a query that will return the name, founder, ghost, and animal of Gryffindor (id: 1) and Ravenclaw (id: 4). Remember to alias - then DRY up your query with a fragment!

```js
//without a fragment
{
	gryffindor: house(id: 3) {
    name,
    founder,
    ghost,
    animal
  }
  ravenclaw: house(id: 4) {
    name,
    founder,
    ghost,
    animal
  }
}

// with a fragment

{
	gryf: house(id: 3) {
		...houseFields
  }
  ravenclaw: house(id: 4) {
		...houseFields
  }
}

fragment houseFields on House {
    name,
    founder,
    ghost,
    animal
}
```

2. Write a query that will return the core, length, owner name, and the name of the owner's house for both the wand with the `id` of 7 and the wand with the `id` of 10. Then use a fragment to DRY it up!

```js
// without a fragment
{
	firstWand: wand(id: 7) {
		core,
    length,
    wizard {
      name,
      house {
        name
      }
    }
  }
  secondWand: wand(id: 10) {
		core,
    length,
    wizard {
      name,
      house {
        name
      }
    }
  }
}

// with a fragment
{
	firstWand: wand(id: 7) {
    ...FindWizardAndHouse
  }
  secondWand: wand(id: 10) {
    ...FindWizardAndHouse
  }
}

fragment FindWizardAndHouse on Wand {
  core,
  length,
  wizard {
    name,
    house {
      name
    }
  }
}

```

3. Create a query that will accept an `id` variable and will return the patronus form associated with that `id`.

```js
query FindPatronus($id: Int) {
  patronus(id: $id) {
    form
  }
}

// passing in query variables like so
{
  "id": 5
}
```

4. Write a query with the operation name of `FetchWizardandWand` that will accept two variables, one for a wizard to be fetched(`$wizardId`) and one for a wand to be fetched(`$wandId`). For the wizard return their name and house name. For the wand return the core, length, and the wizard's patronus form.

```js
query FetchWizardandWand($wizardId: Int, $wandId:Int) {
  wizard(id: $wizardId) {
    name,
    house {
      name
    }
  },
  wand(id: $wandId) {
    core,
    length,
    wizard {
      patronus {
        form
      }
    }
  }
}
```

5. Now let's use variables, aliases and fragments! Write a query that will accept the `id` of two patronus. For each patronus return the form of that patronus, along with the name of the wizard that patronus belongs to.

```
query FetchTwoPatronus($firstId: Int, $secondId:Int) {
  firstForm: patronus(id: $firstId) {
		...PatronusFromWizardName
  },
  secondForm:patronus(id: $secondId) {
		...PatronusFromWizardName
  }
}

fragment PatronusFromWizardName on Patronus {
  form,
  wizards {
  	name
  }
}
```

6. Write a query that accepts two variables for the `id`s of two houses. For each house return the names of all the wizards of that house along with the core of their wands and their patronus forms. Use a fragment!

```js
query FetchPatronusandWandForHouses($firstHouse: Int, $secondHouse:Int) {
  firstHouse: house(id: $firstHouse) {
		...FetchPatronusandWandForOneHouse
  },
  secondHouse:house(id: $secondHouse) {
		...FetchPatronusandWandForOneHouse
  }
}

fragment FetchPatronusandWandForOneHouse on House {
	wizards{
    name,
    wands{
      core
    },
    patronus {
      form
    }
  }
}
```

7. Write a query that accepts three variables for the `id` for three separate wizards. For the first wizard return their name, house name and patronus form. For the second wizard return their name, their house name, and their wand core. For the third wizard return their name, their house name, their patronus form, and their wand core. Though you are returning different information for each wizard you are still returning the name and house name of each wizard meaning you could use a fragment to DRY this up!

```js
query FetchThreeWizards ($firstId: Int, $secondId:Int, $thirdId:Int){
	wizardandform: wizard(id: $firstId)  {
    ...NameandHouse,
    patronus {
      form
    }
  },
  wizardandcore: wizard(id: $secondId)  {
    ...NameandHouse,
    wands {
      core
    }
  },
  wizardcoreandform: wizard(id: $thirdId)  {
    ...NameandHouse,
    patronus{
      form
    },
    wands {
      core
    }
  }
}

fragment NameandHouse on Wizard {
  name,
  house {
    name
  }
}
```

8. Write a query that will accept three variables for a query that can be broken down into three parts. The first variable will be the `id` for a house where you will return the name, founder, and patronus forms of all the wizards in that house. The second variable will be to fetch the length of a particular wand. The third variable will query to find the name, and patronus form for the wizard with the specified id.

```js
query FetchHouseWandWizard($houseId:Int, $wandId: Int, $wizardId: Int) {
	house(id: $houseId) {
    name,
    founder,
    wizards{
      patronus{
        form
      }
    }
  }
  wand(id: $wandId) {
    length
  }
  wizard(id:$wizardId) {
  	name,
    patronus {
      form
    }
  }
}
```
