import { readRecipes, writeRecipes } from "../model/recipeModel.js";
import isInValid from "../utils/isInValid.js";
import crypto from "crypto";

export const getAllRecipes = (req, res) => {
  const data = readRecipes();
  let recipes = [...data];

  // Filter by search query
  const search = req.query?.search?.toLowerCase();

  if (search) {
    recipes = data.filter((recipe) =>
      recipe.recipeName.toLowerCase().includes(search),
    );
  }

  // Order by recipe name
  if (req.query.order === "asc") {
    recipes.sort((a, b) => a.recipeTime - b.recipeTime);
  } else {
    recipes.sort((a, b) => b.recipeTime - a.recipeTime);
  }

  res.status(200).json({
    message: "All recipes fetched successfully",
    results: recipes.length,
    recipes: recipes,
  });
};

export const createRecipes = (req, res) => {
  // Get the body from the request
  let newRecipe = req.body;

  // Check if the body is valid
  if (isInValid(newRecipe)) {
    return res.status(404).json({ message: "Missing required fields" });
  }

  // Add photo and id
  newRecipe = {
    ...newRecipe,
    id: crypto.randomUUID(),
    image: `https://picsum.photos/seed/${crypto.randomUUID()}/500/500`,
  };

  // Read current recipes
  const currentRecipes = readRecipes();

  // Add new recipe to the data
  currentRecipes.push(newRecipe);

  // Update json file
  writeRecipes(currentRecipes);

  res.status(201).json({
    message: "Recipe created successfully",
    recipe: newRecipe,
  });
};

export const getRecipe = (req, res) => {
  res.status(200).json({
    message: "Recipe found",
    recipe: req.foundRecipe,
  });
};

export const updateRecipe = (req, res) => {
  const data = readRecipes();

  const updatedRecipe = {
    ...req.foundRecipe,
    ...req.body,
  };

  // Get the index of the recipe to update
  const index = data.findIndex((recipe) => recipe.id === req.params.id);

  // Update the recipe
  data.splice(index, 1, updatedRecipe);

  // Update the json file
  writeRecipes(data);

  res.status(200).json({
    message: "Recipe updated",
    recipe: updatedRecipe,
  });
};

export const deleteRecipe = (req, res) => {
  const data = readRecipes();

  // Get the index of the recipe to delete
  const index = data.findIndex((recipe) => recipe.id === req.params.id);

  // Remove the recipe from the array
  data.splice(index, 1);

  // Update the json file
  writeRecipes(data);

  res.status(204).json({});
};
