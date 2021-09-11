# Query Docs

List of available querys with examples.

## Products

### Create Product

```graphql
mutation {
  createProduct(
    productInput: {
      title: "myProduct"
      description: "test product desc"
      price: 11.00
      categoryId: "5f08a8850b85d76a960c49be"
    }
  ) {
    _id
    title
  	description
    createdAt
   	category {
      _id
      title
    }
  } 
}
```

### Get Products

```graphql
query {
  products {
    _id
    title
    description
    createdAt
    category {
      _id
      title
      description
    }
  }
}
```

## Users

### Create Users

```graphql
mutation {
  createUser(
    userInput: {
      email: "test@example.com",
      password:"test"
    }
  ) {
    _id
    email
    password
  } 
}
```

## Categories

### Create Category

```graphql
mutation {
  createCategory(categoryInput:{
    title: "test"
    description:"test description"
  }) {
    title
    description
  }
}
```

### Get Categories

```graphql
query {
  categories {
    _id
    title
    description
  }
}
```