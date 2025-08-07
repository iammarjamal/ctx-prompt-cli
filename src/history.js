// src/history.js
import fs from "fs-extra";

/**
 * Retrieves and displays the most recent changes from the 'ctx.json' file.
 * It can filter the changes by a specific category provided as an argument.
 *
 * @param {string} categoryArg - An optional argument to filter the changes, e.g., "--frontend".
 */
export async function handleHistory(categoryArg) {
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

  // Initialize a variable to hold the category for filtering.
  let filterCategory = null;
  // If an argument is provided and starts with '--', extract the category name.
  if (categoryArg && categoryArg.startsWith("--")) {
    filterCategory = categoryArg.slice(2);
  }

  // Start with the full list of changes.
  let changes = data.changes;

  // If a filter category is specified, apply the filter.
  if (filterCategory) {
    // Check if the provided category is valid.
    if (!data.categories.includes(filterCategory)) {
      console.error(`❌  Error: Category "${filterCategory}" not found.`);
      return;
    }
    // Filter the changes array to include only those matching the category.
    changes = changes.filter((c) => c.category === filterCategory);
  }

  // Get the last five changes from the (potentially filtered) list.
  const lastFive = changes.slice(-5);

  // If there are no changes to display, log a message and exit.
  if (lastFive.length === 0) {
    console.log("⚠️  No changes found.");
    return;
  }

  // Print the recent changes to the console.
  console.log("\n📜 Recent Changes:");
  lastFive.forEach((c) => {
    console.log(`- [${c.category}] ${c.description} (${c.timestamp})`);
  });
}