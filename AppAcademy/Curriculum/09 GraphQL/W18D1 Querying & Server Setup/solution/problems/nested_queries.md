Practice your query syntax using GraphiQL to get a feel for how schemas are set up in GraphQL. For some of the below problems you need may need to perform more than one query to gather the information needed.

1. Query for all wizards whose patronus takes the form of a doe (id: 6)

```js
{
  patronus(id: 6) {
    form
    wizards {
      name
    }
  }
}
```

2. Query for the wood, length, and core of all wands belonging to wizards in House Gryffindor (use multiple queries to do this).

```js
// find the `id` of Gryffindor
{
  houses {
    id,
    name
  }
}

//  Found the house, now find the wands!
{
  house(id: 1) {
    // we need to go through wizards to get to wands
    wizards {
      wands{
        wood,
        core,
        length
      }
    }
  }
}
```

3. Find the name of all the wizards whose patronus form is unknown (id 9).

```js
{
	patronus(id: 9) {
  	form,
    wizards {
      name
    }
  }
}
```

4. Query for the patronus of each wizard in House Ravenclaw

```js
// find the `id` of Ravenclaw
{
  houses {
    id,
    name
  }
}

//  Found the house, now find the patronus!
{
  house(id: 4) {
    name
    wizards {
      name,
      patronus{
        form
      }
    }
  }
}
```

5. Starting from the elder wand (id 1), query for the owner, their house, and all other members of that house.

```js
{
	wand(id: 1) {
    wizard {
      name,
      house {
      	name,
        wizards {
          name
        }
      }
    }
  }
}
```

6. List all of the Patronuses with the name of each wizard who the patronus belongs to, along with the name of their house.

```js
{
  patronuses {
    form,
    wizards {
      name,
      house {
        name
      }
    }
  }
}
```

7. Starting from the wand with a core of a Phoenix Feather (id: 18), query for the owner, their patronus form, the founder of their house.

```js
{
	wand(id: 18) {
	  id,
    core
    wizard {
      name,
      patronus{
        form
      },
      house{
        founder
      }
    }
	}
}
```

8. Find the core and length of all the wands that belong to the wizards of the Hufflepuff house (id: 3).

```js
{
  house(id: 3) {
    id,
    name,
    wizards {
      wands {
        core
      }
    }
  }
}
```

9. List the name for the wizard with an id of 1, along with the core(s) of their wand(s), their house name, and the patronus form of all the other members of that house.

```js
{
	wizard(id: 1) {
    name,
    wands {
      core
    },
    house {
      name,
      wizards {
        patronus {
          form
        }
      }
    }
  }
}
```

10. Query for the wizard Voldemort's (id 16) house, the wizards in that house, the patronus of each of those wizards, the associated wizards patronus forms, and each wizard's respective house.

```js
{
  wizard(id: 16) {
		house{
      name,
      wizards {
        name,
        patronus {
          form
        },
        house{
          name
        }
      }
    }
  }
}
```
