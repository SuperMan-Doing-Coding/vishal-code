#this is the implementation of 8 puzzle problem using bfs :

# Simple 8-Puzzle Problem

goal = [[1,2,3],[4,5,6],[7,8,' ']]

# Initial state (you can change it)
puzzle = [[1,2,3],
          [4,' ',6],
          [7,5,8]]

def print_puzzle(p):
    for row in p:
        print(row)

def find_blank(p):
    for i in range(3):
        for j in range(3):
            if p[i][j] == ' ':
                return i, j

def move(p, direction):
    i, j = find_blank(p)
    if direction == "up" and i > 0:
        p[i][j], p[i-1][j] = p[i-1][j], p[i][j]
    elif direction == "down" and i < 2:
        p[i][j], p[i+1][j] = p[i+1][j], p[i][j]
    elif direction == "left" and j > 0:
        p[i][j], p[i][j-1] = p[i][j-1], p[i][j]
    elif direction == "right" and j < 2:
        p[i][j], p[i][j+1] = p[i][j+1], p[i][j]
    else:
        print("Invalid move!")

while puzzle != goal:
    print_puzzle(puzzle)
    d = input("Move (up/down/left/right): ")
    move(puzzle, d)

print_puzzle(puzzle)
print("Puzzle solved!")




# Initial Puzzle:
# [1, 2, 3]
# [4, 0, 6]
# [7, 5, 8]

# Enter move (up/down/left/right): right
# [1, 2, 3]
# [4, 6, 0]
# [7, 5, 8]

# Enter move (up/down/left/right): down
# [1, 2, 3]
# [4, 6, 8]
# [7, 5, 0]

# ...
# Puzzle Solved!

