# Simple Tic Tac Toe Game

board = [' ']*9   # 1D list for 3x3 board
player = 'X'

def print_board():
    print(board[0], "|", board[1], "|", board[2])
    print("--+---+--")
    print(board[3], "|", board[4], "|", board[5])
    print("--+---+--")
    print(board[6], "|", board[7], "|", board[8])

def check_winner(p):
    wins = [(0,1,2),(3,4,5),(6,7,8),(0,3,6),(1,4,7),(2,5,8),(0,4,8),(2,4,6)]
    return any(board[a]==board[b]==board[c]==p for a,b,c in wins)

for turn in range(9):
    print_board()
    pos = int(input(f"Player {player}, enter (1-9): ")) - 1
    if board[pos] == ' ':
        board[pos] = player
        if check_winner(player):
            print_board()
            print("Player", player, "wins!")
            break
        player = 'O' if player == 'X' else 'X'
    else:
        print("Invalid! Try again.")
else:
    print_board()
    print("It's a draw!")




