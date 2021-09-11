# Pokedex Backend

This is the backend for the Pokedex exercises.

## Getting started

1. Clone this repository
2. Install dependencies
3. Create a **.env** file based on the example with proper settings for your
   local environment
4. Create a database user with the same name and password as found in your
   **.env** file with CREATEDB privileges
5. Run
   - `npm run db:create`
   - `npm run db:migrate`
   - `npm run db:seed:all`
   - `npm start`

## The security API

Your application will need to login a player or sign the player up. Here are the
two methods for doing that.

### Login: POST /api/session

There are three existing players in the database after seeding, all with the
password "password":

| Email              | Name        |
| ------------------ | ----------- |
| demo@example.com   | Demo-lition |
| yusuke@example.com | Yusuke      |
| petra@example.com  | Peta        |

Expected payload sent to server:

```json
{
  "email": "email@example.com",
  "password": "password"
}
```

Successful response:

```json
{
  "token": "the token to use in your follow-up requests",
  "player": {
    "createdAt": "2019-05-01T08:33:40.799Z",
    "email": "yusuke@example.com",
    "id": 2,
    "name": "Yusuke",
    "updatedAt": "2019-05-01T08:33:40.799Z"
  }
}
```

### Sign-up: POST /api/players

Expected payload sent to server:

```json
{
  "name": "Marco",
  "password": "pwd",
  "email": "marco@example.com"
}
```

Successful response:

```json
{
  "token": "the token to use in your follow-up requests",
  "player": {
    "createdAt": "2019-05-01T08:33:40.799Z",
    "email": "marco@example.com",
    "id": 4,
    "name": "Marco",
    "updatedAt": "2019-05-01T08:33:40.799Z"
  }
}
```

### Logout: DELETE /api/session

You need to include the token received from logging in or signing up in this
call as a _Bearer_ token for the _Authorization_ header. Set that on the
header of the `fetch` call for this endpoint.

```js
// Example code snippet
fetch(url, { headers: { Authorization: `Bearer ${token}` } });
```

Successful response:

```json
{
  "message": "success"
}
```

## Images

Some of the API results have image URLs associated with them. You can get them
from this service. For example, if the service is hosted at
`http://localhost:8000`, then `http://localhost:8000/images/pokemon_snaps/5.svg`
will show the image for the Pokemon with the image URL
`/images/pokemon_snaps/5.svg`.

## The Pokemon API

This is all about listing and creating Pokemon.

### List Pokemon types: GET /api/pokemon/types

You need to include the token received from logging in or signing up in this
call as a _Bearer_ token for the _Authorization_ header. Set that on the
header of the `fetch` call for this endpoint.

```js
// Example code snippet
fetch(url, { headers: { Authorization: `Bearer ${token}` } });
```

Successful response:

```json
[
  "fire",
  "electric",
  "normal",
  "ghost",
  "psychic",
  "water",
  "bug",
  "dragon",
  "grass",
  "fighting",
  "ice",
  "flying",
  "poison",
  "ground",
  "rock",
  "steel"
]
```

### List Pokemon: GET /api/pokemon

You need to include the token received from logging in or signing up in this
call as a _Bearer_ token for the _Authorization_ header. Set that on the
header of the `fetch` call for this endpoint.

```js
// Example code snippet
fetch(url, { headers: { Authorization: `Bearer ${token}` } });
```

Successful response looks like this with more entries:

```json
[
  {
    "imageUrl": "/images/pokemon_snaps/1.svg",
    "name": "Bulbasaur",
    "updatedAt": "2019-05-01T08:33:40.799Z"
  }
]
```

### Pokemon details: GET /api/pokemon/:id

You need to include the token received from logging in or signing up in this
call as a _Bearer_ token for the _Authorization_ header. Set that on the
header of the `fetch` call for this endpoint.

```js
// Example code snippet
fetch(url, { headers: { Authorization: `Bearer ${token}` } });
```

Successful response looks like this for the given id:

```json
{
  "attack": 90,
  "defense": 55,
  "imageUrl": "/images/pokemon_snaps/26.svg",
  "name": "Raichu5",
  "type": "electric",
  "moves": ["thundershock", "thunderbolt"],
  "items": [],
  "owner": {
    "id": 2,
    "name": "Yusuke"
  }
}
```

### Create a new Pokemon: POST /api/pokemon

You need to include the token received from logging in or signing up in this
call as a _Bearer_ token for the _Authorization_ header. Set that on the
header of the `fetch` call for this endpoint.

```js
// Example code snippet
fetch(url, { headers: { Authorization: `Bearer ${token}` } });
```

The payload that you must send looks like this.

```json
{
  "attack": 90,
  "defense": 55,
  "imageUrl": "/images/pokemon_snaps/26.svg",
  "name": "Billy goat gruff",
  "type": "food",
  "moves": ["eating trash", "eating anything"]
}
```

Successful response looks like this:

```json
{
  "attack": 90,
  "defense": 55,
  "imageUrl": "/images/pokemon_snaps/26.svg",
  "name": "Billy goat gruff",
  "type": "food",
  "moves": ["eating trash", "eating anything"],
  "items": [
    {
      "name": "Ergonomic Cotton Keyboard",
      "price": 37,
      "happiness": 36,
      "imageUrl": "/images/pokemon_berry.svg"
    },
    {
      "name": "Tasty Concrete Pants",
      "price": 79,
      "happiness": 74,
      "imageUrl": "/images/pokemon_egg.svg"
    },
    {
      "name": "Fantastic Metal Bacon",
      "price": 80,
      "happiness": 61,
      "imageUrl": "/images/pokemon_super_potion.svg"
    }
  ],
  "owner": {
    "id": 2,
    "name": "Yusuke"
  }
}
```
