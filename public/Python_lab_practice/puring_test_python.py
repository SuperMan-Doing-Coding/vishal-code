# Alpha-Beta Pruning in Python

MAX = 1000
MIN = -1000

def minimax(depth, nodeIndex, maximizingPlayer, values, alpha, beta):
    # If we reach leaf node (depth = 3)
    if depth == 3:
        return values[nodeIndex]

    # Maximizer
    if maximizingPlayer:
        best = MIN

        # Left and Right children
        for i in range(2):
            val = minimax(depth + 1, nodeIndex * 2 + i,
                          False, values, alpha, beta)

            best = max(best, val)
            alpha = max(alpha, best)

            # Pruning
            if beta <= alpha:
                break

        return best

    # Minimizer
    else:
        best = MAX

        for i in range(2):
            val = minimax(depth + 1, nodeIndex * 2 + i,
                          True, values, alpha, beta)

            best = min(best, val)
            beta = min(beta, best)

            # Pruning
            if beta <= alpha:
                break

        return best


# Driver Code
values = [3, 5, 6, 9, 1, 2, 0, -1]
print("The optimal value is:", minimax(0, 0, True, values, MIN, MAX))
