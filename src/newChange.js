// src/newChange.js
import inquirer from "inquirer";
import fs from "fs-extra";
import { v4 as uuid } from "uuid";

/**
 * Guides the user to select an existing prompt and describe a change related to it.
 * A new change record is created and saved to the 'ctx.json' file.
 */
export async function handleNewChange() {
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

  // Check if there are any prompts to attach a change to. If not, log a warning and exit.
  if (data.prompts.length === 0) {
    console.log("⚠️  No prompts found. Please create a new prompt first.");
    return;
  }

  // Use inquirer to prompt the user to select an existing prompt.
  const { promptId } = await inquirer.prompt({
    type: "list",
    name: "promptId",
    message: "Select prompt to attach change:",
    // Map the prompts array to create a list of choices for the user.
    choices: data.prompts.map((p) => ({
      name: `${p.task} [${p.category}]`, // Display a descriptive name.
      value: p.id, // Use the prompt's ID as the value for internal logic.
    })),
  });

  // Prompt the user to describe the change.
  const { description } = await inquirer.prompt({
    type: "input",
    name: "description",
    message: "Describe the change:",
  });

  // Find the selected prompt object from the data using the promptId.
  const prompt = data.prompts.find((p) => p.id === promptId);

  // Create a new change object with a unique ID, promptId, category, timestamp, and description.
  data.changes.push({
    id: uuid(),
    promptId,
    category: prompt.category,
    timestamp: new Date().toISOString(), // Record the current time in ISO format.
    description,
  });

  // Write the updated data back to the ctx.json file, formatted with 2 spaces.
  await fs.writeJson(file, data, { spaces: 2 });

  // Log a success message to the console.
  console.log("✅  Change recorded.");
}
