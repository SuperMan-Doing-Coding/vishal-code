import React from 'react';
import FileUploader from './components/FileUploader';
import StaticFileViewer from './components/StaticFileViewer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Code Showcase</h1>
            </div>
            <div className="flex items-center space-x-4">
              <a href="#projects" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Projects</a>
              <a href="#about" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">About</a>
              <a href="#contact" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Python Experiments</span>
            <span className="block text-indigo-600">and Code Showcase</span>
          </h2>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            A collection of my Python projects, experiments, and code snippets.
          </p>
        </div>
      </div>

      {/* Projects Section */}
      <div id="projects" className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Code & Text Files
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Upload and view your code and text files
            </p>
          </div>
          
          
          
          {/* Static File Viewer */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Python Lab Practice Files</h3>
            <StaticFileViewer folderPath="Python_lab_practice" />
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {/* Project Card 1 */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <h3 className="text-lg font-medium text-gray-900">Project 1</h3>
                    <p className="mt-1 text-sm text-gray-500">A brief description of the project.</p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="bg-gray-100 p-4 rounded-md">
                    <pre className="text-sm text-gray-800 overflow-x-auto">
                      <code>{"# Your Python code here\nprint('Hello, World!') "}</code>
                    </pre>
                  </div>
                  <div className="mt-4">
                    <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                      View Project <span aria-hidden="true">→</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Add more project cards as needed */}
          </div>
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              About Me
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              I'm a Python developer passionate about creating efficient and elegant solutions.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer id="contact" className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
          <p className="text-center text-base text-gray-500">
            &copy; {new Date().getFullYear()} Your Name. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
