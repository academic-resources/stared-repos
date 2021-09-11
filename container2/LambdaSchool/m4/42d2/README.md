# Recipe Book

## Topics

- database modeling.
- migration scripts.
- seeding.
- knex.



## Assignment

Design the **data model** for a _recipe book_ application, then use `Knex migrations and seeding` functionality to build a `SQLite3` database based on the model and seed it with test data.

The requirements for the system, as stated by the client are:

- have a way to manage recipes.
- have a way to manage ingredients.
- a **recipe** could have more than one **ingredient** and the same **ingredient** can be used in multiple recipes. Examples are _"cup of corn flour"_ or _"gram of butter"_.
- when saving the ingredients for a **recipe** capture the quantity required for that **ingredient** as a floating number.
- have a way to save step by step instructions for preparing a recipe.

**Hint**: Before writing any code, write out all desired tables in the data model and determine all relationships between tables. 

    https://dbdesigner.page.link/EVj5c1nyiUBmGpri6

### Migrations and Seeds

- [X] Write a migration file that creates all tables necessary to model this data
- [X] Write seed files to populate the tables with test data. **Hint**: Keep your recipes *very* simple or this step could become extremely time consuming.

### Data Access

In addition to the `migrations` and `seeding` scripts, write a data access file that **exports** an object with the following functions:

- [X] `getRecipes()`: should return a list of all recipes in the database.
- [X] `getShoppingList(recipe_id)`: should return a list of all ingredients and quantities for a given recipe
- [X] `getInstructions(recipe_id)`: should return a list of step by step instructions for preparing a recipe

Organize and name your files anyway you see fit.

## Stretch Problem

Build the following endpoints. Write any additional data access helpers as needed.

- [X] `GET /api/recipes/`: all recipes (without details about ingredients or steps)
- [X] `GET /api/recipes/:id/shoppingList`: a list of ingredients and quantites for a single recipe
- [X] `GET /api/recipes/:id/instructions`: a correctly ordered list of how to prepare a single recipe
- [X] `GET /api/ingredients/:id/recipes`: all recipes in the system that utilize a single ingredient 
