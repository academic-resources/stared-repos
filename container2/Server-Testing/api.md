# <a name="0"></a>Food API Documentation

Our web API helps people find the tastiest food.  🍕 🌭 🍔 🍟 🥙 🌮 🌯 🥗 🥘 🍝 🍜 🍲 🍣 🍱 🍛 🥓 🥞
***
### Index
┣━[Requests](#1)  
┣━[Responses](#2)  
┗━[Endpoints](#2)  
***
## <a name="1"></a>Requests →
### Base URL

All calls are made to the base URL, along with the specific resource path:

```
http://localhost:3030/food/
```

[↑](#0)
***
## <a name="2"></a>Responses →
### Content Type
All responses are JSON by default.

### Errors
Errors will be returned with a `status` and `error` message, as in the following example:
```
HTTP/1.1 422 Unprocessable Entity
Content-Type: application/json; charset=utf-8

{ 
  "status": "Unprocessable Entity",
  "error": "You dun goofed."
}
```

### Response Codes

HTTP Code | Name                  | Description                     
----------|-----------------------|---------------------------------
200       | OK                    | Everything's gucci. A normal response.
400       | Bad Request, Bad!           | There was something wrong with the request, probably due to a missing resource.
404       | Not found             | There's nothing at the endpoint requested.
422       | Unprocessable Entity          | The request could not be authorized, probably due to invalid or missing validation.
500       | Internal Server Error | It's not your fault. There was a problem at the server with fulfilling the request. My bad.  

[↑](#0)
***
## <a name="3"></a>Endpoints →
### Get an Array of Food
```
GET /food
```
Returns a list of all the foods in the database.

### Add a Food Item
```
POST /food
```
#### Request
```
{
  "name": "Pizza"
}
```
#### Response
```
{
  "name": "Pizza"
}
```

### Update a Specific Food Item
Field        | Type        | Note      | Description              
-------------|-------------|-----------|-------------------------
`id`         | `integer`   | read-only | The unique API food ID.

```
PUT /food/:id
```
#### Request
```
{
  "name": "Taquito"
}
```
#### Response
```
{
  "name": "Taquito"
}
```
### Delete a Specific Food Item
```
DELETE /food/:id
```
#### Response
```
{
  "Success": "Food removed"
}
```
[↑](#0)