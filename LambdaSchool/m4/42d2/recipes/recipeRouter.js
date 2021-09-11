const express = require('express');

const Recipes = require('./recipeModel.js');

const router = express.Router();

router.get('/', (req, res) => {
	Recipes.getRecipes()
		.then(recipes => {
			res.json(recipes);
		})
		.catch(err => {
			res.status(500).json({ message: 'Failed to get recipes' });
		});
});

router.get('/:id/shoppingList', (req, res) => {
	const id = req.params.id;

	Recipes.getShoppingList(id)
		.then(recipe => {
			if (recipe) {
				res.json(recipe);
			} else {
				res.status(404).json({ message: 'Could not find recipe with given id.' });
			}
		})
		.catch(err => {
			res.status(500).json({ message: 'Failed to get Recipes' });
		});
});

router.get('/:id/instructions', (req, res) => {
	const { id } = req.params;

	Recipes.getInstructions(id)
		.then(instructions => {
			if (instructions.length) {
				res.json(instructions);
			} else {
				res.status(404).json({ message: 'Could not find instructions for given recipe' });
			}
		})
		.catch(err => {
			res.status(500).json({ message: 'Failed to get instructions' });
		});
});
router.get('/ingredients/:id/recipes', (req, res) => {
	const { id } = req.params;
	Recipes.getIngredientRecipes(id)
		.then(recipelist => {
			if (recipelist.length) {
				res.json(recipelist);
			} else {
				res.status(404).json({ message: 'Could not find recipes for given ingredient' });
			}
		})
		.catch(err => {
			res.status(500).json({ message: 'Failed to get recipes' });
		});
});

router.post('/', (req, res) => {
	const recipeData = req.body;

	Recipes.add(recipeData)
		.then(recipe => {
			res.status(201).json(recipe);
		})
		.catch(err => {
			res.status(500).json({ message: 'Failed to create new recipe' });
		});
});

router.post('/:id/steps', (req, res) => {
	const stepData = req.body;
	const { id } = req.params;

	Recipes.findById(id)
		.then(recipe => {
			if (recipe) {
				Recipes.addStep(stepData, id).then(step => {
					res.status(201).json(step);
				});
			} else {
				res.status(404).json({ message: 'Could not find recipe with given id.' });
			}
		})
		.catch(err => {
			res.status(500).json({ message: 'Failed to create new step' });
		});
});

router.put('/:id', (req, res) => {
	const { id } = req.params;
	const changes = req.body;

	Recipes.findById(id)
		.then(recipe => {
			if (recipe) {
				Recipes.update(changes, id).then(updatedRecipe => {
					res.json(updatedRecipe);
				});
			} else {
				res.status(404).json({ message: 'Could not find scheme with given id' });
			}
		})
		.catch(err => {
			res.status(500).json({ message: 'Failed to update scheme' });
		});
});

router.delete('/:id', (req, res) => {
	const { id } = req.params;

	Recipes.remove(id)
		.then(deleted => {
			if (deleted) {
				res.json({ removed: deleted });
			} else {
				res.status(404).json({ message: 'Could not find scheme with given id' });
			}
		})
		.catch(err => {
			res.status(500).json({ message: 'Failed to delete scheme' });
		});
});

module.exports = router;
