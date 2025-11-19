# Python Code Showcase - Project Summary

## Overview
A React.js website built to showcase Python code and experiments. The application allows users to upload their own code files and browse a collection of Python lab practice files.

## Key Features Implemented

### 1. File Uploader Component (`src/components/FileUploader.tsx`)
- Drag-and-drop file upload interface
- Support for multiple file uploads
- Syntax-highlighted code display
- Tab-based navigation for multiple files
- Copy to clipboard functionality
- File deletion capability

### 2. Static File Viewer (`src/components/StaticFileViewer.tsx`)
- Displays Python lab practice files from the `Python_lab_practice` folder
- File tree navigation structure
- Click to view file contents
- Fallback to hardcoded content if files are unavailable
- Copy to clipboard for each file

### 3. Main Application (`src/App.tsx`)
- Clean, modern UI with navigation
- Hero section with project description
- Integrated FileUploader and StaticFileViewer components
- Responsive design using Tailwind CSS

## Python Lab Files Included
The application showcases 8 Python algorithm implementations:

1. **8-puzzle_using_bfs.py** - BFS solution for the 8-puzzle game
2. **BFS_with_heap.py** - Priority queue-based BFS
3. **bfs_dfs_open_closed_fringe.py** - Open/closed list implementations
4. **monkey_babana.py** - Monkey Banana problem solver
5. **puring_test_python.py** - Testing utilities and performance tools
6. **tic-tac-toe.py** - Interactive Tic-Tac-Toe game
7. **travelling_salesman_problem.py** - TSP algorithm implementations
8. **water_jug.py** - Water jug problem solver

## Technical Implementation

### Frontend Stack
- **React 18** with TypeScript for type safety
- **Tailwind CSS** for styling
- **PostCSS** for CSS processing

### File Handling
- Static files served from `public/Python_lab_practice/`
- Client-side file processing for uploaded files
- No backend required - fully client-side solution

### Development Tools
- **copy_python_files.py** - Script to sync Python files from lab folder
- **build_and_deploy.py** - Automated build and deployment preparation
- **npm scripts** for easy command execution

## Deployment Instructions

### For Development
```bash
npm start
```

### For Production
```bash
# Option 1: Simple build
npm run build

# Option 2: Full deployment preparation
npm run deploy
```

The application builds to static files that can be hosted on any static hosting service (Netlify, Vercel, GitHub Pages, etc.).

## File Structure
```
c:\python_program_host\
├── src/
│   ├── components/
│   │   ├── FileUploader.tsx
│   │   └── StaticFileViewer.tsx
│   ├── App.tsx
│   ├── index.css
│   └── index.tsx
├── public/
│   └── Python_lab_practice/
│       ├── 8-puzzle_using_bfs.py
│       ├── BFS_with_heap.py
│       ├── bfs_dfs_open_closed_fringe.py
│       ├── monkey_babana.py
│       ├── puring_test_python.py
│       ├── tic-tac-toe.py
│       ├── travelling_salesman_problem.py
│       └── water_jug.py
├── copy_python_files.py
├── build_and_deploy.py
├── package.json
└── README.md
```

## Notes
- The application runs entirely client-side for privacy and simplicity
- Python files are copied to the public folder for static serving
- The StaticFileViewer includes fallback content for offline viewing
- All code is processed and displayed client-side without server uploads

## Future Enhancements
- Add syntax highlighting for more languages
- Implement file search functionality
- Add download capability for files
- Include code execution environment (optional)
- Add file organization features (folders, tags)
