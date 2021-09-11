# **Users Feature Packet**

## **Models**

- Database Info Goes Here -

---

## **Endpoints**

| Endpoint                      | Method | Action                            |
| ----------------------------- | ------ | --------------------------------- |
| /users                        | GET    | Returns list of all Users in DB   |
| /users/new                    | POST   | Create a new User                 |
| /users/:id                    | GET    | Lookup User by ID                 |
| /users/:id/edit               | PUT    | Edit User Information             |
| /users/:id/delete             | DELETE | Delete Account                    |
| /users/:id/followers          | GET    | Retrieves all Followers of a User |
| /users/articles/all-endpoints | ---    | ---                               |

---

## **Templates**

| Template           | Location                           |
| ------------------ | ---------------------------------- |
| user-form.pug      | Form for Signing Up                |
| user-articles.pug  | Renders all self-pubished Articles |
| user-followers.pug | Renders list of all followed Users |

---

## **Sketches**

---
