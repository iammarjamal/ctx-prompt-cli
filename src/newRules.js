// src/newRules.js
import inquirer from "inquirer";
import fs from "fs-extra";
import { v4 as uuid } from "uuid";

/**
 * Prompts the user for a new rule's details and saves it to the 'ctx.json' file.
 */
export async function handleNewRules() {
  const file = "ctx.json";

  // Check if the configuration file exists. If not, log an error and exit.
  if (!(await fs.pathExists(file))) {
    console.error(
      '❌  Error: The ctx.json file does not exist. Please run "init" first.'
    );
    return;
  }

  // Read the entire contents of the ctx.json file.
  const data = await fs.readJson(file);

  // Prompt the user to enter a description for the new rule.
  const { description } = await inquirer.prompt({
    type: "input",
    name: "description",
    message: "Enter rule description:",
  });

  // Check for duplicate rule (case-insensitive)
  const isDuplicate = data.rules.some(
    (rule) =>
      rule.description.toLowerCase().trim() === description.toLowerCase().trim()
  );

  if (isDuplicate) {
    console.error("❌  Error: A rule with this description already exists.");
    return;
  }

  // Prompt the user to select a category for the rule from a predefined list.
  // The 'Other (custom)' option allows for the creation of a new category.
  const { category } = await inquirer.prompt({
    type: "list",
    name: "category",
    message: "Select a category:",
    choices: [...data.categories, "Other (custom)"],
  });

  let finalCategory = category;

  // If the user selects 'Other (custom)', prompt for the new category name.
  if (category === "Other (custom)") {
    const { newCategory } = await inquirer.prompt({
      type: "input",
      name: "newCategory",
      message: "Enter new category name:",
    });
    finalCategory = newCategory.trim();

    // Add the new category to the categories list if it doesn't already exist.
    if (!data.categories.includes(finalCategory)) {
      data.categories.push(finalCategory);
    }
  }

  // Create a new rule object with a unique ID, description, and category.
  data.rules.push({
    id: uuid(),
    description: description.trim(),
    category: finalCategory,
  });

  // Write the updated data back to the ctx.json file, formatted with 2 spaces.
  await fs.writeJson(file, data, { spaces: 2 });
  console.log(`✅  Rule added to category "${finalCategory}".`);
}
