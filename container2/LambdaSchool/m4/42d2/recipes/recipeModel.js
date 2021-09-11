const db = require('../data/db-config');

module.exports = {
	getRecipes,
	getShoppingList,
	getInstructions,
	getIngredientRecipes,
	add,
	update,
	remove
};
// `getRecipes()`: should return a list of all recipes in the database.
function getRecipes() {
	return db('recipes');
}
// `getShoppingList(recipe_id)`: should return a list of all ingredients and quantities for a given recipe

/*
SELECT ingredients.ingredientname
FROM ingredients 
JOIN recipesingredients ON recipesingredients.ingredientsid=ingredients.ingredientsid
JOIN recipes ON recipesingredients.recipeid=recipes.recipeid
WHERE recipes.recipeid=1;
*/
function getShoppingList(recipeid) {
	return db('recipes')
		.select('ingredients.ingredientname')
		.join('recipesingredients', 'recipes.recipeid', 'recipesingredients.recipeid')
		.join('ingredients', 'recipesingredients.ingredientsid', 'ingredients.ingredientsid')
		.where({ 'recipes.recipeid': recipeid });
}
// `getInstructions(recipe_id)`: should return a list of step by step instructions for preparing a recipe
/*
SELECT instructions.instruction, instructions.stepnumber
FROM instructions 
JOIN recipesinstructions ON recipesinstructions.instructionsid=instructions.instructionsid
JOIN recipes ON recipesinstructions.recipeid=recipes.recipeid
WHERE recipes.recipeid=1
Order BY instructions.stepnumber

*/
function getInstructions(recipeid) {
	return db('recipes')
		.select('instructions.instruction', 'instructions.stepnumber')
		.join('recipesinstructions', 'recipes.recipeid', 'recipesinstructions.recipeid')
		.join('instructions', 'recipesinstructions.instructionsid', 'instructions.instructionsid')
		.where({ 'recipes.recipeid': recipeid })
		.orderBy('instructions.stepnumber');
}

/*
SELECT recipes.recipename
FROM recipes
JOIN recipesingredients ON recipesingredients.recipeid=recipes.recipeid
JOIN ingredients ON recipesingredients.ingredientsid=ingredients.ingredientsid
WHERE ingredients.ingredientsid=3
Order BY recipes.recipename;

- [X] `GET /api/ingredients/:id/recipes`: all recipes in the system that utilize a single ingredient 
*/
function getIngredientRecipes(ingredientid) {
	return db('recipes')
		.select('recipes.recipename')
		.join('recipesingredients', 'recipesingredients.recipeid', 'recipes.recipeid')
		.join('ingredients', 'recipesingredients.ingredientsid', 'ingredients.ingredientsid')
		.where({ 'ingredients.ingredientsid': ingredientid })
		.orderBy('recipes.recipename');
}

/*
function add(recipe) {
	db('recipes')
		.insert(recipe)
		.then(ids => {
			return findById(ids[0]);
		});
}
function update(newrecipe, id) {
	db('recipes')
		.where({ id })
		.update(newrecipe)
		.then(ids => {
			return ids;
		});
}

function remove(id) {
	let recipe = findById(id);
	db('recipes')
		.delete()
		.where({ id: id })
		.then(ids => {
			return recipe;
		});
}

function update(id, changes) {
	return db('users')
		.where({ id })
		.update(changes);
}
*/
