#!/usr/bin/env node

// This script serves as the main entry point for a command-line interface (CLI) tool.
// It parses command-line arguments to determine which action to perform.

// Use ESM (ECMAScript Modules) to import handler functions from other files.
// This approach is more modern and cleaner than using `require()`.
import { handleInit } from "./init.js";
import { handleNewRules } from "./newRules.js";
import { handleNewPrompt } from "./newPrompt.js";
import { handleNewChange } from "./newChange.js";
import { handleHistory } from "./history.js";
import { handleClearHistory } from "./clearHistory.js";

// process.argv contains the command-line arguments.
// We slice the first two elements ('node' executable path and script file path)
// to get only the arguments provided by the user.
const args = process.argv.slice(2);

// The first argument is the main command (e.g., 'init', 'new', 'history').
const command = args[0];
// The second argument is a subcommand, used by the 'new' command.
const subCommand = args[1];
// The third argument is an optional extra argument, like a filter for history.
const extraArg = args[2];

/**
 * An Immediately Invoked Function Expression (IIFE) is used here to create an
 * asynchronous context, allowing the use of `await` at the top level of the script.
 * This is a common pattern for modern Node.js CLI tools.
 */
(async () => {
  // A switch statement is used to route the command to the appropriate handler function.
  switch (command) {
    // Initializes the project by creating a configuration file.
    case "init":
      await handleInit();
      break;

    // Handles the creation of new items (rules, prompts, or changes).
    case "new":
      // Nested `if/else if` statements check for the specific subcommand.
      if (subCommand === "rules") {
        await handleNewRules();
      } else if (subCommand === "prompt") {
        await handleNewPrompt();
      } else if (subCommand === "change") {
        await handleNewChange();
      } else {
        // Log an error if the 'new' subcommand is not recognized.
        console.log("Unknown new subcommand");
      }
      break;

    // Displays the history of changes, optionally filtered by the extra argument.
    case "history":
      if (extraArg === "clear") {
        await handleClearHistory();
      } else {
        await handleHistory(extraArg);
      }
      break;

    // The default case handles any command that is not recognized.
    default:
      console.log("Unknown command");
      break;
  }
})();
