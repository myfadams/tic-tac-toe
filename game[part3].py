import random
import time

player="X"
comp="O"
choices=[0,1,2,3,4,5,6,7,8]
player_moves=[]
comp_moves=[]

winningChoices=[
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
]
def displayBoard():

    print(f"    {choices[0]}    |  {choices[1]}  |    {choices[2]} ")
    print("------------------------")
    print(f"    {choices[3]}    |  {choices[4]}  |    {choices[5]} ")
    print("------------------------")
    print(f"    {choices[6]}    |  {choices[7]}  |    {choices[8]} ")


def findWinner(wins, w):
    for i in wins:
        if all(item in w for item in i):
            return True
def empty(input):
    if (choices[input]==input):
        return True

def playerChoice(playr):
    chosen_cell=int(input("Pick a cell<< "))
    if  empty(chosen_cell)and choices[9]!=0:
        choices[chosen_cell]=playr
        choices[9]-=1
        player_moves.append(chosen_cell)
        displayBoard()
    elif chosen_cell > 8:
        print(f"There are only 9 cells why pick {chosen_cell}, choose again")
        playerChoice(playr)
    else:
        print("cell already occupied, Choose again")
        playerChoice(playr)

def compChoice(c):
    chosen_cell=random.randrange(0,9)
    if empty(chosen_cell) and choices[9]!=0:
        print("Computers Turn")
        choices[chosen_cell]=c
        choices[9]-=1
        comp_moves.append(chosen_cell)
        displayBoard()
    elif choices[9]==0:
        return 0
    else:
       compChoice(c)
def main():
    displayBoard()
    while choices[9]!=0:
        playerChoice(player)
        compChoice(comp)
        
        if len(player_moves)>=3 and findWinner(winningChoices,player_moves):
            print("You win")
            choices[9]=0
        elif len(comp_moves)>=3 and findWinner(winningChoices,comp_moves):
            print("You lost")
            choices[9]=0
        elif choices[9]==0:
            print("its a draw")

if __name__=="__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n Game Closed")