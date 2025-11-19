# user input :
from collections import deque

n = int(input("Please enter number of nodes"))
graph = {}
print("enter node and their negibhours")
for _ in range(n):
    line = input().split()
    node = line[0]
    neighbours= line[1:]
    graph[node] = neighbours

start = input("enter staring node : ")

def bfs(start):
    visited = set()
    fringe = deque([start])

    while fringe :
        node = fringe.popleft()
        if node not in visited:
            print(node, end = " ")
            visited.add(node)
            fringe.extend(graph.get(node, []))




def dfs(start):
    visited = set()
    fringe = [start]

    while fringe:
        node = fringe.pop()
        if node not in visited:
            print(node, end = " ")
            visited.add(node)
            fringe.extend(reversed(graph.get(node, [])))


print("\nbfs traversal")
bfs(start)



print("\ndfs traversal")
dfs(start)





# Simple graph (Adjacency List)
graph = {
    'A': ['B', 'C'],
    'B': ['D', 'E'],
    'C': ['F'],
    'D': [],
    'E': [],
    'F': []
}
