# taking the user input :
from collections import deque

n =  int(input("please enter the numbers of node "))
graph = { }

print("enter the nodes and theri neighbours")
for _ in range(n):
    line = input.split()
    node = line[0]
    padosi = line[1:]
    graph[node] = padosi


start = input("please enter the statring node ")

def bfs(start):
    open_fringe = deque[start]
    closed_fringe = set() #visited
    
    while open_fringe :
        node = open_fringe.popleft()

        if node not in closed_fringe:
            print(node, end = " ")
            closed_fringe.add(node)

            for padosi in graph.get(node, []):
                open_fringe.apped(padosi)





def dfs(start):
    open = deque[start]
    closed = set() #visited

    while open :
        node = open.pop()
        if node not in closed:
            print(node, end = " ")
            closed.add(node)


            # adding padosi in reverse so that left node is processed first :
            for padosi in reversed(graph.get(node, [])):
                open.append(padosi)



#now you can call both of these functions 


