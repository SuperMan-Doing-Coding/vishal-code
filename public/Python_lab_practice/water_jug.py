from collections import deque

def water_jug_problem(m, n, d):
    visited = set()
    queue = deque()
    queue.append((0, 0))

    while queue:
        a, b = queue.popleft()
        print(f"({a}, {b})")

        # goal check
        if a == d or b == d:
            print("\nGoal Reached!")
            return True

        if (a, b) in visited:
            continue
        visited.add((a, b))

        # all possible next states
        possible_states = [
            (m, b),  # fill jug A
            (a, n),  # fill jug B
            (0, b),  # empty A
            (a, 0),  # empty B
            (a - min(a, n-b), b + min(a, n-b)),  # A → B
            (a + min(b, m-a), b - min(b, m-a))   # B → A
        ]

        for state in possible_states:
            if state not in visited:
                queue.append(state)

    print("\nNo solution possible")
    return False



#calling the function
water_jug_problem(4, 3, 2)