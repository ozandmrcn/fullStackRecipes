const reqFields = [
  "recipeName",
  "category",
  "recipeTime",
  "servingSuggestion",
  "ingredients",
  "instructions",
];

export const isInValid = (data) => {
  if (!data) return true;

  // Check if any required field is missing, if missing return true
  return reqFields.some((field) => !data[field]);
};

export default isInValid;
