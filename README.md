# Recipe Finder

## Project Description

Recipe Finder is a web application that helps users organize and manage their personal recipe collection. Users can add their own recipes, search by title or ingredient, mark favorites, and plan meals for the week using a built-in calendar. All data is stored in the browser using localStorage, so recipes persist across sessions without requiring an account.

## Features

1. **Add Recipes** - Create recipes with title, ingredients, instructions, and cook time
2. **Edit Recipes** - Update any recipe details after creation
3. **Delete Recipes** - Remove recipes with confirmation prompt
4. **Search Recipes** - Filter recipes by title or ingredient in real-time
5. **Favorite Recipes** - Mark recipes as favorites and view them in a dedicated tab
6. **Meal Planner** - Weekly calendar view to plan meals and events
   - Add custom events with time and location
   - Attach favorite recipes to calendar events
   - Quick-add recipes directly to any day

## Technologies Used

- **React 19** - UI component library
- **Vite** - Build tool and development server
- **JavaScript (ES6+)** - Programming language
- **CSS3** - Custom styling with responsive design
- **localStorage** - Browser-based data persistence
- **Vercel** - Production deployment

## Setup Instructions

```bash
# Clone the repository
git clone https://github.com/xiarune/recipe-finder.git

# Navigate to the project directory
cd recipe-finder

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

To build for production:

```bash
npm run build
```

## Known Bugs or Limitations

- Data is stored in localStorage, which means recipes are only available on the device and browser where they were created
- The meal planner only displays the current week and does not support navigating to future or past weeks
- Clearing browser data will delete all saved recipes
- No data export or backup functionality

## What I Learned

- How to structure a React application with multiple components that share state
- Using localStorage for client-side data persistence with JSON serialization
- Creating a reusable form component that handles both adding and editing
- Implementing real-time search filtering across multiple fields
- Building a modal-based UI for the calendar event creation
- Managing multiple views in a single-page application without a router
- Writing clean, maintainable code with a utility module for storage operations
