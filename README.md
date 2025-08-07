# CTX CLI - Context-Aware Prompt Generation Tool

A powerful command-line interface tool for managing context-aware prompts, rules, and change tracking in development projects. CTX CLI helps developers maintain consistent prompt structures with standardized rules and category-specific guidelines.

## 🚀 Core Functionality

- **Project Initialization**: Set up a new project with predefined standard rules and categories.
- **Rule Management**: Create and organize rules by categories for consistent prompt generation.
- **Prompt Generation**: Generate context-aware prompts that combine standard and category-specific rules.
- **Change Tracking**: Log and track changes made during development with prompt association.
- **History Management**: View and filter change history by categories.
- **History Clearing**: Reset change history while preserving configuration.

## 📋 Standard Rules

Every project comes with built-in standard rules:

1. **Change Logging**: Automatically reminds to log changes after task completion (144 char limit).
2. **Task Comprehension**: Ensures task requirements are understood and summarized (512 char limit).
3. **Change Review**: Reviews recent changes to avoid repetition and ensure correctness.

## 🏷️ Default Categories

- **General**: Universal tasks and guidelines.
- **UI**: User interface and frontend-related tasks.
- **Logic**: Backend logic and business rules.
- **Testing**: Testing strategies and implementation.

## Installation

### Global Installation

```bash
npm install -g ctx-cli
```

### Local Installation

```bash
npm install --save-dev ctx-cli
```

## Usage

### Initialize a New Project

```bash
ctx init
```

Creates a `ctx.json` configuration file with:

- Standard rules
- Default categories
- Empty arrays for custom rules, prompts, and changes

### Create New Rules

```bash
ctx new rules
```

Interactive prompts to:

- Enter rule description
- Select existing category or create new one
- Automatically prevents duplicate rules

### Generate New Prompts

```bash
ctx new prompt
```

Creates context-aware prompts by:

- Selecting a category
- Entering task description
- Automatically combining standard rules with category-specific rules
- Generating formatted prompt text

### Log Changes

```bash
ctx new change
```

Track development progress by:

- Selecting associated prompt
- Describing the change made
- Automatically timestamping and categorizing

### View Change History

```bash
# View all recent changes (last 5)
ctx history

# Filter by category
ctx history --UI
ctx history --Logic
ctx history --Testing
```

### Clear Change History

```bash
ctx history clear
```

Removes all change history while preserving:

- Standard rules
- Custom rules
- Categories
- Prompts

## Configuration File Structure

The `ctx.json` file structure:

```json
{
  "standardRules": [
    {
      "id": "standard-1",
      "description": "After completing the task, use the CLI command `new change` to log a description of what you did, limited to 144 characters."
    }
  ],
  "categories": ["General", "UI", "Logic", "Testing"],
  "rules": [
    {
      "id": "uuid",
      "description": "Custom rule description",
      "category": "UI"
    }
  ],
  "prompts": [
    {
      "id": "uuid",
      "category": "UI",
      "task": "Create responsive navbar",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "rules": ["standard-1", "standard-2", "ui-rule-1"],
      "promptText": "Task: Create responsive navbar\n\nRules:\n- Standard rule 1\n- UI specific rule"
    }
  ],
  "changes": [
    {
      "id": "uuid",
      "promptId": "prompt-uuid",
      "category": "UI",
      "timestamp": "2024-01-01T00:00:00.000Z",
      "description": "Implemented responsive navbar with mobile breakpoints"
    }
  ]
}
```

### Error Handling

The CLI provides clear error messages for common scenarios:

- **Missing ctx.json**: Prompts to run `ctx init` first.
- **No prompts available**: Suggests creating a prompt before logging changes.
- **Invalid categories**: Lists available categories
- **Duplicate rules**: Prevents creation of duplicate rule descriptions.
- **File operation errors**: Detailed error messages for debugging.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## support me

If you find this tool helpful, please consider supporting me:

- **Buy Me a Coffee**: [PayPal](https://paypal.me/3MMaR652)