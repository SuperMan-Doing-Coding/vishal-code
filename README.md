# Python Code Showcase

A React.js website to showcase Python code and experiments, built with TypeScript and Tailwind CSS.

## Features

- **File Upload**: Upload and view Python code files with syntax highlighting
- **Static File Viewer**: Browse and view Python lab practice files
- **Drag & Drop**: Intuitive drag-and-drop file upload interface
- **Syntax Highlighting**: Code displayed with proper syntax highlighting
- **Copy to Clipboard**: Easy code copying functionality
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Python Lab Practice Files

The application includes a collection of Python algorithm implementations and problem solutions:

- **8-Puzzle Problem** - BFS solution for the classic 8-puzzle game
- **BFS with Heap** - Priority queue-based BFS implementation
- **BFS/DFS with Fringe Lists** - Open and closed list implementations
- **Monkey Banana Problem** - Classic AI problem-solving example
- **Testing Utilities** - Python testing and performance measurement tools
- **Tic-Tac-Toe** - Interactive game with AI opponent
- **Traveling Salesman Problem** - TSP solutions using brute force and nearest neighbor
- **Water Jug Problem** - Classic state-space search problem

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

Start the development server:
```bash
npm start
```

The app will be available at http://localhost:3000

## Building for Production

Create an optimized production build:
```bash
npm run build
```

## Adding New Python Files

To add new Python files to the static viewer:

1. Place your Python files in the `public/Python_lab_practice` directory, or
2. Run the copy script to sync from your lab folder:
   ```bash
   python copy_python_files.py
   ```

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS post-processing

## Project Structure

```
src/
├── components/
│   ├── FileUploader.tsx      # File upload and display component
│   └── StaticFileViewer.tsx  # Static Python file browser
├── App.tsx                   # Main application component
├── index.css                 # Global styles and Tailwind imports
└── index.tsx                 # Application entry point

public/
└── Python_lab_practice/      # Static Python files for display
```

## Deployment

Deploy the contents of the `build` folder to your preferred hosting service.
