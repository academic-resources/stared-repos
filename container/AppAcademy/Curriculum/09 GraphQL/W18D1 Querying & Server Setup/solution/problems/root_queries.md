Practice your query syntax using GraphiQL to get a feel for how schemas are set up in GraphQL. For some of the below problems you need may need to perform more than one query to gather the information needed. Feel free to use this file to write out your queries before you copy and paste them into GraphiQL.

1. Use the `wizards` RootType to query for the id and name of every Wizard.

```js
{
  wizards{
    id,
    name
  }
}
```

2. Use the `houses` RootType to query for the id and name of every House.

```js
{
  houses{
    id,
    name
  }
}
```

3. List all of the `houses` along with the `name`, `founder`, `ghost`, and `animal` for each house.

```js
{
  houses{
    id,
    name,
    founder,
    ghost,
    animal
  }
}
```

4. List the `id` and `form` for every Patronus.

```js
{
  patronuses{
    id,
    form
  }
}
```

5. List all the wands with their `wood` and `id`.

```js
{
  wands{
    id,
    wood
  }
}
```

6. Find the `form` for the Patronus with the `id` of 5.

```js
{
  patronus(id: 5) {
    form
  }
}
```

7. Find the `founder` of the house with the `id` of 3.

```js
{
  house(id: 3) {
    founder
  }
}
```

8. List the length for the wand with the `id` of 9.

```js
{
  wand(id: 1) {
    length
  }
}
```

9.  List the patronus `form` for the wizard with the `id` of 8.

```js
{
  wizard(id: 8) {
    patronus{
      form
    }
  }
}
```

10. Find the `id` for the wizard named `Newton Scamander`, then find what house he belongs to.

```js
// Find the name and id of all wizards and locate `Newton Scamander`
{
  wizards{
    id,
    name
  }
}

// the query for just him
{
  wizard(id: 13) {
    house {
      name
    }
  }
}
```
