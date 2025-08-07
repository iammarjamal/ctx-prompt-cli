// src/newPrompt.js
import inquirer from "inquirer";
import fs from "fs-extra";
import { v4 as uuid } from "uuid";

/**
 * Creates a new prompt by selecting a category and combining relevant rules.
 * The prompt includes both standard rules and category-specific rules.
 */
export async function handleNewPrompt() {
  const file = "ctx.json";

  // Check if the configuration file exists. If not, log an error and exit.
  if (!(await fs.pathExists(file))) {
    console.error(
      '❌ Error: The ctx.json file does not exist. Please run "init" first.'
    );
    return;
  }

  // Read the entire contents of the ctx.json file.
  const data = await fs.readJson(file);

  // Prompt the user to select a category for the new prompt.
  const { category } = await inquirer.prompt({
    type: "list",
    name: "category",
    message: "Select a category for the prompt:",
    choices: data.categories,
  });

  // Prompt the user to enter a task description.
  const { task } = await inquirer.prompt({
    type: "input",
    name: "task",
    message: "Enter the task description:",
  });

  // Collect all relevant rules for this prompt
  const relevantRules = [];
  
  // Add all standard rules
  relevantRules.push(...data.standardRules.map(rule => rule.id));
  
  // Add category-specific rules
  const categoryRules = data.rules.filter(rule => rule.category === category);
  relevantRules.push(...categoryRules.map(rule => rule.id));

  // Build the prompt text
  const allRules = [...data.standardRules, ...data.rules];
  const ruleDescriptions = relevantRules.map(ruleId => {
    const rule = allRules.find(r => r.id === ruleId);
    return rule ? `- ${rule.description}` : '';
  }).filter(desc => desc !== '');

  const promptText = `Task: ${task}\n\nRules:\n${ruleDescriptions.join('\n')}`;

  // Create a new prompt object
  const newPrompt = {
    id: uuid(),
    category,
    task,
    createdAt: new Date().toISOString(),
    rules: relevantRules,
    promptText,
  };

  // Add the new prompt to the data
  data.prompts.push(newPrompt);

  // Write the updated data back to the ctx.json file
  await fs.writeJson(file, data, { spaces: 2 });

  console.log(`✅ Prompt created for category "${category}".`);
  console.log(`\n📝 Generated Prompt:\n${promptText}`);
}