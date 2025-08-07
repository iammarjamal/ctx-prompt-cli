import fs from "fs-extra";

/**
 * Clears all change history from the 'ctx.json' file.
 * This function is designed for a CLI tool to reset the change log without
 * affecting other configuration data.
 */
export async function handleClearHistory() {
  const fileName = "ctx.json";

  // Check if the configuration file exists. If not, log an error and exit.
  if (!(await fs.pathExists(fileName))) {
    console.log("❌ ctx.json not found. Please run `ctx init` first.");
    return;
  }

  try {
    // Read the contents of the 'ctx.json' file.
    const ctx = await fs.readJson(fileName);

    // Clear the change history by reassigning the 'changes' property to an empty array.
    ctx.changes = [];

    // Write the modified data back to the 'ctx.json' file with a 2-space indentation.
    await fs.writeJson(fileName, ctx, { spaces: 2 });

    console.log("✅ All change history has been cleared.");
  } catch (error) {
    // If an error occurs during file operations, log the error message.
    console.error("❌ Failed to clear history:", error);
  }
}