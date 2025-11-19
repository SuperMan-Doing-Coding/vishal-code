# Monkey-Banana Problem (Simple Python Program)

i = 0   # step counter

def Monkey_go_box(monkey, box):
    global i
    i += 1
    print("Step:", i, "- Monkey goes from", monkey, "to", box)

def Monkey_move_box(box, banana):
    global i
    i += 1
    print("Step:", i, "- Monkey moves the box from", box, "to", banana)

def Monkey_on_box():
    global i
    i += 1
    print("Step:", i, "- Monkey climbs on the box")

def Monkey_get_banana():
    global i
    i += 1
    print("Step:", i, "- Monkey picks the banana")

# --- Main Program ---
monkey = input("Enter monkey location: ")
banana = input("Enter banana location: ")
box = input("Enter box location: ")

print("\nThe steps are as follows:\n")

Monkey_go_box(monkey, box)
Monkey_move_box(box, banana)
Monkey_on_box()
Monkey_get_banana()