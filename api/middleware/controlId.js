import { readRecipes } from "../model/recipeModel.js";

export const controlId = (req, res, next) => {
  const data = readRecipes();
  const found = data.find((item) => item.id === req.params.id);

  if (!found) {
    return res.status(404).json({ message: "Recipe not found" });
  }

  req.foundRecipe = found;

  next();
};
