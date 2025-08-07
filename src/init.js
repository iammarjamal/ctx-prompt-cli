// src/init.js
import fs from "fs-extra";

/**
 * Initializes the 'ctx.json' configuration file.
 * This function creates the file with a default structure and
 * a set of predefined standard rules if the file doesn't already exist.
 * It also ensures 'ctx.json' is added to '.gitignore' to avoid
 * committing it to version control.
 */
export async function handleInit() {
  const fileName = "ctx.json";
  const gitignoreFile = ".gitignore";

  // Check if the configuration file already exists.
  // If it does, log a warning and exit to prevent overwriting.
  if (await fs.pathExists(fileName)) {
    console.log("⚠️  ctx.json already exists.");
    return;
  }

  // Define the initial structure and default content for the JSON file.
  const defaultContent = {
    // An array of standard rules that will apply to all prompts.
    standardRules: [
      {
        id: "standard-1",
        description:
          "After completing the task, use the CLI command `new change` to log a description of what you did, limited to 144 characters.",
      },
      {
        id: "standard-2",
        description:
          "Make sure you fully understand the task requirements, then summarize them briefly to confirm your comprehension, limited to 512 characters.",
      },
      {
        id: "standard-3",
        description:
          "Review the last two entries in the 'changes' log within ctx.json to avoid repeating the same action. If you find repetition, verify it was done correctly; if not, correct it properly or ask for help.",
      },
    ],
    // A list of predefined project categories.
    categories: ["General", "UI", "Logic", "Testing"],

    // Empty arrays to be populated later.
    rules: [],
    prompts: [],
    changes: [],
  };

  try {
    // Write the default content to the 'ctx.json' file.
    // The `spaces: 2` option ensures the file is neatly formatted.
    await fs.writeJson(fileName, defaultContent, { spaces: 2 });
    console.log("✅ ctx.json initialized with standard prompt rules.");

    // Add 'ctx.json' to .gitignore if not already there
    console.log("📄 Checking for .gitignore file...");
    if (await fs.pathExists(gitignoreFile)) {
      const gitignoreContent = await fs.readFile(gitignoreFile, "utf-8");
      console.log("🔍 Existing .gitignore contents:\n", gitignoreContent);
      if (!gitignoreContent.includes(fileName)) {
        await fs.appendFile(gitignoreFile, `\n${fileName}\n`);
        console.log("✅ Added ctx.json to .gitignore");
      } else {
        console.log("ℹ️ ctx.json already listed in .gitignore");
      }
    } else {
      await fs.writeFile(gitignoreFile, `${fileName}\n`);
      console.log("✅ Created .gitignore and added ctx.json");
    }    
  } catch (error) {
    // If an error occurs during file writing, log the error message.
    console.error(
      "❌  Failed to initialize ctx.json or update .gitignore:",
      error
    );
  }
}