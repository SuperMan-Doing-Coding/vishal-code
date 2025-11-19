import React, { useState, useEffect } from 'react';

interface FileNode {
  name: string;
  type: 'file' | 'directory';
  path: string;
  content?: string;
  children?: FileNode[];
}

interface StaticFileViewerProps {
  folderPath: string;
}

const StaticFileViewer: React.FC<StaticFileViewerProps> = ({ folderPath }) => {
  const [files, setFiles] = useState<FileNode[]>([]);
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Static file list based on your Python_lab_practice folder
  const staticFiles: FileNode[] = [
    {
      name: 'Python_lab_practice',
      type: 'directory',
      path: 'Python_lab_practice',
      children: [
        { name: '8-puzzle_using_bfs.py', type: 'file', path: 'Python_lab_practice/8-puzzle_using_bfs.py' },
        { name: 'BFS_with_heap.py', type: 'file', path: 'Python_lab_practice/BFS_with_heap.py' },
        { name: 'bfs_dfs_open_closed_fringe.py', type: 'file', path: 'Python_lab_practice/bfs_dfs_open_closed_fringe.py' },
        { name: 'monkey_babana.py', type: 'file', path: 'Python_lab_practice/monkey_babana.py' },
        { name: 'puring_test_python.py', type: 'file', path: 'Python_lab_practice/puring_test_python.py' },
        { name: 'tic-tac-toe.py', type: 'file', path: 'Python_lab_practice/tic-tac-toe.py' },
        { name: 'travelling_salesman_problem.py', type: 'file', path: 'Python_lab_practice/travelling_salesman_problem.py' },
        { name: 'water_jug.py', type: 'file', path: 'Python_lab_practice/water_jug.py' }
      ]
    }
  ];

  useEffect(() => {
    setFiles(staticFiles);
    setLoading(false);
  }, []);

  const loadFileContent = async (filePath: string) => {
    try {
      // Load file from public folder
      const response = await fetch(`/Python_lab_practice/${filePath.split('/').pop()}`);
      if (!response.ok) {
        throw new Error(`Failed to load file: ${response.statusText}`);
      }
      const content = await response.text();
      return content;
    } catch (err) {
      console.error('Error loading file:', err);
      // Return the hardcoded content as fallback
      const fileContents: { [key: string]: string } = {
        'Python_lab_practice/8-puzzle_using_bfs.py': `# 8-Puzzle Problem using BFS
from collections import deque

class PuzzleState:
    def __init__(self, board, empty_pos, moves=0):
        self.board = board
        self.empty_pos = empty_pos
        self.moves = moves
    
    def get_neighbors(self):
        neighbors = []
        directions = [(0, 1), (1, 0), (0, -1), (-1, 0)]  # right, down, left, up
        
        for dx, dy in directions:
            new_x, new_y = self.empty_pos[0] + dx, self.empty_pos[1] + dy
            
            if 0 <= new_x < 3 and 0 <= new_y < 3:
                new_board = [row[:] for row in self.board]
                new_board[self.empty_pos[0]][self.empty_pos[1]] = new_board[new_x][new_y]
                new_board[new_x][new_y] = 0
                neighbors.append(PuzzleState(new_board, (new_x, new_y), self.moves + 1))
        
        return neighbors
    
    def is_goal(self):
        goal = [[1, 2, 3], [4, 5, 6], [7, 8, 0]]
        return self.board == goal

def solve_8_puzzle(initial_board):
    empty_pos = [(i, j) for i in range(3) for j in range(3) if initial_board[i][j] == 0][0]
    initial_state = PuzzleState(initial_board, empty_pos)
    
    queue = deque([initial_state])
    visited = {tuple(map(tuple, initial_board))}
    
    while queue:
        current = queue.popleft()
        
        if current.is_goal():
            return current.moves
        
        for neighbor in current.get_neighbors():
            board_tuple = tuple(map(tuple, neighbor.board))
            if board_tuple not in visited:
                visited.add(board_tuple)
                queue.append(neighbor)
    
    return -1

# Example usage
initial = [[1, 2, 3], [4, 0, 6], [7, 5, 8]]
print(f"Solution found in {solve_8_puzzle(initial)} moves")`,

        'Python_lab_practice/BFS_with_heap.py': `# BFS using Priority Queue (Heap)
import heapq
from collections import deque

class WeightedState:
    def __init__(self, state, cost, priority):
        self.state = state
        self.cost = cost
        self.priority = priority
    
    def __lt__(self, other):
        return self.priority < other.priority

def bfs_with_heap(graph, start, goal):
    heap = []
    heapq.heappush(heap, WeightedState(start, 0, 0))
    visited = {start}
    
    while heap:
        current = heapq.heappop(heap)
        
        if current.state == goal:
            return current.cost
        
        for neighbor, weight in graph.get(current.state, []):
            if neighbor not in visited:
                visited.add(neighbor)
                new_cost = current.cost + weight
                heapq.heappush(heap, WeightedState(neighbor, new_cost, new_cost))
    
    return float('inf')

# Example usage
graph = {
    'A': [('B', 1), ('C', 4)],
    'B': [('D', 2)],
    'C': [('D', 1)],
    'D': []
}

print(f"Shortest path cost: {bfs_with_heap(graph, 'A', 'D')}")`,

        'Python_lab_practice/bfs_dfs_open_closed_fringe.py': `# BFS/DFS with Open and Closed Lists
from collections import deque

def bfs_with_fringe(start, goal, get_neighbors):
    open_list = deque([start])
    closed_list = set()
    parent = {start: None}
    
    while open_list:
        current = open_list.popleft()
        
        if current == goal:
            # Reconstruct path
            path = []
            while current is not None:
                path.append(current)
                current = parent[current]
            return path[::-1]
        
        if current not in closed_list:
            closed_list.add(current)
            
            for neighbor in get_neighbors(current):
                if neighbor not in closed_list and neighbor not in open_list:
                    parent[neighbor] = current
                    open_list.append(neighbor)
    
    return None

def dfs_with_fringe(start, goal, get_neighbors):
    open_list = [start]
    closed_list = set()
    parent = {start: None}
    
    while open_list:
        current = open_list.pop()
        
        if current == goal:
            # Reconstruct path
            path = []
            while current is not None:
                path.append(current)
                current = parent[current]
            return path[::-1]
        
        if current not in closed_list:
            closed_list.add(current)
            
            for neighbor in get_neighbors(current):
                if neighbor not in closed_list and neighbor not in open_list:
                    parent[neighbor] = current
                    open_list.append(neighbor)
    
    return None

# Example usage
def get_neighbors(node):
    # Simple graph example
    graph = {
        'A': ['B', 'C'],
        'B': ['D', 'E'],
        'C': ['F'],
        'D': [],
        'E': ['F'],
        'F': []
    }
    return graph.get(node, [])

start_node = 'A'
goal_node = 'F'

bfs_path = bfs_with_fringe(start_node, goal_node, get_neighbors)
dfs_path = dfs_with_fringe(start_node, goal_node, get_neighbors)

print(f"BFS Path: {bfs_path}")
print(f"DFS Path: {dfs_path}")`,

        'Python_lab_practice/monkey_babana.py': `# Monkey Banana Problem
from collections import deque

class MonkeyBananaState:
    def __init__(self, monkey_pos, box_pos, has_box, has_banana):
        self.monkey_pos = monkey_pos  # (x, y)
        self.box_pos = box_pos        # (x, y)
        self.has_box = has_box        # bool
        self.has_banana = has_banana  # bool
    
    def __eq__(self, other):
        return (self.monkey_pos == other.monkey_pos and
                self.box_pos == other.box_pos and
                self.has_box == other.has_box and
                self.has_banana == other.has_banana)
    
    def __hash__(self):
        return hash((self.monkey_pos, self.box_pos, self.has_box, self.has_banana))

def solve_monkey_banana():
    # Initial state
    initial = MonkeyBananaState((0, 0), (2, 0), False, False)
    banana_pos = (2, 2)
    
    queue = deque([initial])
    visited = {initial}
    parent = {initial: None}
    
    while queue:
        current = queue.popleft()
        
        # Check if goal is reached
        if current.has_banana:
            return reconstruct_path(parent, current)
        
        # Generate possible actions
        next_states = []
        
        # Move without box
        if not current.has_box:
            for dx, dy in [(0, 1), (1, 0), (0, -1), (-1, 0)]:
                new_pos = (current.monkey_pos[0] + dx, current.monkey_pos[1] + dy)
                if 0 <= new_pos[0] <= 2 and 0 <= new_pos[1] <= 2:
                    next_states.append(MonkeyBananaState(new_pos, current.box_pos, False, False))
        
        # Push box
        if current.monkey_pos == current.box_pos and not current.has_box:
            for dx, dy in [(0, 1), (1, 0), (0, -1), (-1, 0)]:
                new_box_pos = (current.box_pos[0] + dx, current.box_pos[1] + dy)
                new_monkey_pos = (current.monkey_pos[0] + dx, current.monkey_pos[1] + dy)
                if 0 <= new_box_pos[0] <= 2 and 0 <= new_box_pos[1] <= 2:
                    next_states.append(MonkeyBananaState(new_monkey_pos, new_box_pos, True, False))
        
        # Climb box
        if current.has_box and current.monkey_pos == current.box_pos:
            next_states.append(MonkeyBananaState(current.monkey_pos, current.box_pos, True, False))
        
        # Grab banana
        if current.has_box and current.monkey_pos == banana_pos:
            next_states.append(MonkeyBananaState(current.monkey_pos, current.box_pos, True, True))
        
        for state in next_states:
            if state not in visited:
                visited.add(state)
                parent[state] = current
                queue.append(state)
    
    return None

def reconstruct_path(parent, goal):
    path = []
    current = goal
    while current is not None:
        path.append(current)
        current = parent[current]
    return path[::-1]

# Solve the problem
solution = solve_monkey_banana()
if solution:
    print(f"Solution found in {len(solution) - 1} steps")
else:
    print("No solution found")`,

        'Python_lab_practice/puring_test_python.py': `# Python Purging/Testing Utilities
import time
import unittest
from typing import Any, List, Dict

def purge_duplicates(lst: List[Any]) -> List[Any]:
    """Remove duplicates from a list while preserving order."""
    seen = set()
    result = []
    for item in lst:
        if item not in seen:
            seen.add(item)
            result.append(item)
    return result

def test_performance(func, *args, **kwargs):
    """Test the performance of a function."""
    start_time = time.time()
    result = func(*args, **kwargs)
    end_time = time.time()
    return result, end_time - start_time

def validate_data(data: Dict[str, Any], schema: Dict[str, type]) -> bool:
    """Validate data against a schema."""
    for key, expected_type in schema.items():
        if key not in data or not isinstance(data[key], expected_type):
            return False
    return True

class TestUtilities(unittest.TestCase):
    def test_purge_duplicates(self):
        self.assertEqual(purge_duplicates([1, 2, 2, 3, 1, 4]), [1, 2, 3, 4])
        self.assertEqual(purge_duplicates(['a', 'b', 'a', 'c']), ['a', 'b', 'c'])
    
    def test_validate_data(self):
        schema = {'name': str, 'age': int, 'active': bool}
        valid_data = {'name': 'John', 'age': 30, 'active': True}
        invalid_data = {'name': 'John', 'age': '30', 'active': True}
        
        self.assertTrue(validate_data(valid_data, schema))
        self.assertFalse(validate_data(invalid_data, schema))

if __name__ == '__main__':
    # Example usage
    data = [1, 2, 2, 3, 1, 4, 5, 5, 6]
    print(f"Original: {data}")
    print(f"After purging: {purge_duplicates(data)}")
    
    # Performance test
    def slow_function():
        time.sleep(0.1)
        return "Done"
    
    result, time_taken = test_performance(slow_function)
    print(f"Result: {result}, Time taken: {time_taken:.2f}s")
    
    # Run tests
    unittest.main()`,

        'Python_lab_practice/tic-tac-toe.py': `# Tic-Tac-Toe Game
import random

class TicTacToe:
    def __init__(self):
        self.board = [[' ' for _ in range(3)] for _ in range(3)]
        self.current_player = 'X'
    
    def print_board(self):
        for row in self.board:
            print('|'.join(row))
            print('-' * 5)
    
    def make_move(self, row, col):
        if 0 <= row < 3 and 0 <= col < 3 and self.board[row][col] == ' ':
            self.board[row][col] = self.current_player
            self.current_player = 'O' if self.current_player == 'X' else 'X'
            return True
        return False
    
    def check_winner(self):
        # Check rows
        for row in self.board:
            if row[0] == row[1] == row[2] != ' ':
                return row[0]
        
        # Check columns
        for col in range(3):
            if self.board[0][col] == self.board[1][col] == self.board[2][col] != ' ':
                return self.board[0][col]
        
        # Check diagonals
        if self.board[0][0] == self.board[1][1] == self.board[2][2] != ' ':
            return self.board[0][0]
        if self.board[0][2] == self.board[1][1] == self.board[2][0] != ' ':
            return self.board[0][2]
        
        # Check for draw
        if all(cell != ' ' for row in self.board for cell in row):
            return 'Draw'
        
        return None
    
    def get_available_moves(self):
        moves = []
        for row in range(3):
            for col in range(3):
                if self.board[row][col] == ' ':
                    moves.append((row, col))
        return moves
    
    def ai_move(self):
        available_moves = self.get_available_moves()
        if available_moves:
            return random.choice(available_moves)
        return None

def play_game():
    game = TicTacToe()
    
    while True:
        game.print_board()
        
        if game.current_player == 'X':
            try:
                row = int(input("Enter row (0-2): "))
                col = int(input("Enter column (0-2): "))
                
                if not game.make_move(row, col):
                    print("Invalid move! Try again.")
                    continue
            except ValueError:
                print("Invalid input! Enter numbers 0-2.")
                continue
        else:
            print("AI is thinking...")
            row, col = game.ai_move()
            game.make_move(row, col)
            print(f"AI plays at ({row}, {col})")
        
        winner = game.check_winner()
        if winner:
            game.print_board()
            if winner == 'Draw':
                print("It's a draw!")
            else:
                print(f"Player {winner} wins!")
            break

if __name__ == '__main__':
    print("Welcome to Tic-Tac-Toe!")
    print("You are X, AI is O")
    play_game()`,

        'Python_lab_practice/travelling_salesman_problem.py': `# Traveling Salesman Problem (TSP)
import itertools
import math

def calculate_distance(city1, city2):
    return math.sqrt((city1[0] - city2[0])**2 + (city1[1] - city2[1])**2)

def tsp_brute_force(cities):
    n = len(cities)
    if n <= 1:
        return 0, []
    
    min_distance = float('inf')
    best_path = None
    
    # Try all possible permutations
    for perm in itertools.permutations(range(1, n)):
        path = [0] + list(perm) + [0]  # Return to start
        total_distance = 0
        
        for i in range(len(path) - 1):
            total_distance += calculate_distance(cities[path[i]], cities[path[i + 1]])
        
        if total_distance < min_distance:
            min_distance = total_distance
            best_path = path
    
    return min_distance, best_path

def tsp_nearest_neighbor(cities):
    n = len(cities)
    if n <= 1:
        return 0, []
    
    unvisited = set(range(1, n))
    current_city = 0
    path = [0]
    total_distance = 0
    
    while unvisited:
        nearest_city = min(unvisited, key=lambda city: calculate_distance(cities[current_city], cities[city]))
        total_distance += calculate_distance(cities[current_city], cities[nearest_city])
        current_city = nearest_city
        path.append(current_city)
        unvisited.remove(current_city)
    
    # Return to start
    total_distance += calculate_distance(cities[current_city], cities[0])
    path.append(0)
    
    return total_distance, path

# Example usage
cities = [
    (0, 0),    # City 0
    (2, 3),    # City 1
    (5, 4),    # City 2
    (1, 1),    # City 3
    (6, 1),    # City 4
]

print("Cities coordinates:")
for i, city in enumerate(cities):
    print(f"City {i}: {city}")

print("\\nBrute Force Solution:")
distance, path = tsp_brute_force(cities)
print(f"Distance: {distance:.2f}")
print(f"Path: {' -> '.join(map(str, path))}")

print("\\nNearest Neighbor Solution:")
distance, path = tsp_nearest_neighbor(cities)
print(f"Distance: {distance:.2f}")
print(f"Path: {' -> '.join(map(str, path))}")`,

        'Python_lab_practice/water_jug.py': `# Water Jug Problem
from collections import deque

class WaterJugState:
    def __init__(self, jug1, jug2):
        self.jug1 = jug1  # Current amount in jug1
        self.jug2 = jug2  # Current amount in jug2
    
    def __eq__(self, other):
        return self.jug1 == other.jug1 and self.jug2 == other.jug2
    
    def __hash__(self):
        return hash((self.jug1, self.jug2))
    
    def __repr__(self):
        return f"({self.jug1}, {self.jug2})"

def solve_water_jug(capacity1, capacity2, target):
    initial = WaterJugState(0, 0)
    queue = deque([initial])
    visited = {initial}
    parent = {initial: None}
    
    while queue:
        current = queue.popleft()
        
        # Check if goal is reached
        if current.jug1 == target or current.jug2 == target:
            return reconstruct_path(parent, current)
        
        # Generate all possible moves
        next_states = []
        
        # Fill jug1
        if current.jug1 < capacity1:
            next_states.append(WaterJugState(capacity1, current.jug2))
        
        # Fill jug2
        if current.jug2 < capacity2:
            next_states.append(WaterJugState(current.jug1, capacity2))
        
        # Empty jug1
        if current.jug1 > 0:
            next_states.append(WaterJugState(0, current.jug2))
        
        # Empty jug2
        if current.jug2 > 0:
            next_states.append(WaterJugState(current.jug1, 0))
        
        # Pour from jug1 to jug2
        if current.jug1 > 0 and current.jug2 < capacity2:
            amount = min(current.jug1, capacity2 - current.jug2)
            next_states.append(WaterJugState(current.jug1 - amount, current.jug2 + amount))
        
        # Pour from jug2 to jug1
        if current.jug2 > 0 and current.jug1 < capacity1:
            amount = min(current.jug2, capacity1 - current.jug1)
            next_states.append(WaterJugState(current.jug1 + amount, current.jug2 - amount))
        
        for state in next_states:
            if state not in visited:
                visited.add(state)
                parent[state] = current
                queue.append(state)
    
    return None

def reconstruct_path(parent, goal):
    path = []
    current = goal
    while current is not None:
        path.append(current)
        current = parent[current]
    return path[::-1]

# Example usage
def water_jug_example():
    # Classic problem: 4-gallon and 3-gallon jugs, need exactly 2 gallons
    capacity1 = 4
    capacity2 = 3
    target = 2
    
    print(f"Water Jug Problem:")
    print(f"Jug capacities: {capacity1} gallons, {capacity2} gallons")
    print(f"Target: {target} gallons")
    print()
    
    solution = solve_water_jug(capacity1, capacity2, target)
    
    if solution:
        print(f"Solution found in {len(solution) - 1} steps:")
        for i, state in enumerate(solution):
            print(f"Step {i}: {state}")
    else:
        print("No solution found")

if __name__ == '__main__':
    water_jug_example()
    
    # Another example
    print("\\n" + "="*50)
    capacity1 = 5
    capacity2 = 3
    target = 4
    
    print(f"Water Jug Problem:")
    print(f"Jug capacities: {capacity1} gallons, {capacity2} gallons")
    print(f"Target: {target} gallons")
    print()
    
    solution = solve_water_jug(capacity1, capacity2, target)
    
    if solution:
        print(f"Solution found in {len(solution) - 1} steps:")
        for i, state in enumerate(solution):
            print(f"Step {i}: {state}")
    else:
        print("No solution found")`
      };

      return fileContents[filePath] || `// File content not available`;
    }
  };

  const handleFileClick = async (file: FileNode) => {
    if (file.type === 'file') {
      setSelectedFile(file);
      file.content = await loadFileContent(file.path);
    }
  };

  const renderFileTree = (nodes: FileNode[], level = 0) => {
    return nodes.map((node) => (
      <div key={node.path} style={{ paddingLeft: `${level * 20}px` }}>
        <div
          className={`flex items-center py-1 px-2 hover:bg-gray-100 cursor-pointer rounded ${
            selectedFile?.path === node.path ? 'bg-blue-100' : ''
          }`}
          onClick={() => handleFileClick(node)}
        >
          <span className="mr-2">
            {node.type === 'directory' ? '📁' : '📄'}
          </span>
          <span className="text-sm">{node.name}</span>
        </div>
        {node.children && renderFileTree(node.children, level + 1)}
      </div>
    ));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Loading files...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* File Tree */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-4">File Explorer</h3>
          <div className="border rounded-lg p-2 max-h-96 overflow-y-auto">
            {renderFileTree(files)}
          </div>
        </div>
      </div>

      {/* File Content */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-lg shadow">
          {selectedFile ? (
            <div>
              <div className="border-b px-4 py-3 flex justify-between items-center">
                <h3 className="text-lg font-semibold">{selectedFile.name}</h3>
                <button
                  className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={() => {
                    if (selectedFile.content) {
                      navigator.clipboard.writeText(selectedFile.content);
                      alert('Code copied to clipboard!');
                    }
                  }}
                >
                  Copy Code
                </button>
              </div>
              <div className="p-4">
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                  <code>{selectedFile.content}</code>
                </pre>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center h-64 text-gray-500">
              Select a file to view its content
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StaticFileViewer;
