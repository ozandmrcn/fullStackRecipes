import fs from "fs";

export const readRecipes = () => {
  try {
    const data = fs.readFileSync(new URL("../data.json", import.meta.url), "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
};

export const writeRecipes = (data) => {
  try {
    fs.writeFileSync(new URL("../data.json", import.meta.url), JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};
