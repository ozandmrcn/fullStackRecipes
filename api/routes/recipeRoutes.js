import express from "express";
import {
  createRecipes,
  deleteRecipe,
  getAllRecipes,
  getRecipe,
  updateRecipe,
} from "../controllers/recipeControllers.js";
import { controlId } from "../middleware/controlId.js";

// Router setup
const router = express.Router();

// Routes
router.route("/api/v1/recipes").get(getAllRecipes).post(createRecipes);

router
  .route("/api/v1/recipes/:id")
  .get(controlId, getRecipe)
  .patch(controlId, updateRecipe)
  .delete(controlId, deleteRecipe);

export default router;
