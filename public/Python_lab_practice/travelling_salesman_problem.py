# Brute-force TSP (exact) - works when n <= ~9-10
import itertools

def tsp_bruteforce(dist):
    n = len(dist)
    cities = list(range(1, n))                # fix start at 0
    best_cost = float('inf')
    best_path = None
    for perm in itertools.permutations(cities):
        path = (0,) + perm + (0,)
        cost = sum(dist[path[i]][path[i+1]] for i in range(n))
        if cost < best_cost:
            best_cost = cost
            best_path = path
    return list(best_path), best_cost

# example usage
if __name__ == "__main__":
    dist = [
        [0, 10, 15, 20],
        [10, 0, 35, 25],
        [15, 35, 0, 30],
        [20, 25, 30, 0]
    ]
    path, cost = tsp_bruteforce(dist)
    print("Brute-force optimal path:", path, "Cost:", cost)
