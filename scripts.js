let nextPlayer = 'X';

const label = document.getElementById("next-lbl");
label.innerText = nextPlayer;

createGameBoard()

function createGameBoard()
{
    for(let i = 1; i <= 9; i++){
        const cell = document.getElementById("c" + i); //iterate through every cell tag
        const btn = document.createElement("button"); //creates a button tag
        btn.innerText = "[ ]"; //adds the [ ] text in the button tag
        cell.appendChild(btn); //puts the button (and its text) inside the cell
    }

    let btns = document.querySelectorAll('button'); //selects all objects with button tag on the current page

    for (let i=0; i<btns.length; i++)
    {
       btns[i].addEventListener("click", takeCell); //since click is already listed as an event in the browser
                                                    //once an object with a button tag in it is clicked, it will call takeCell
                                                    //every button is given an instruction to wait until its clicked to call take cell
    }
}

function takeCell(event)
{
   const btn = event.target; //stores whatever was just clicked as btn
   const result = "[" + nextPlayer + "]"; 
   btn.innerText = result; //changes the text on the cell from "[ ]" to "[X]" or ["O"]
   btn.disabled = true; //disables the button and greys it out so it cant be clicked again
   nextPlayer = (nextPlayer === 'X') ? "O" : "X"; //if nextPLayer is x it gives true, and if true it changes nextPlayer to "O" and vice versa
   label.innerText = nextPlayer; //shows new value on the page

    const winner = checkWinner();
    if(winner){
        //show winner
        const gameOverLabel = document.getElementById('game-over-lbl')
        gameOverLabel.innerHTML = "<h1>" + winner + " wins!</h1>"
    }

    if (isGameOver())
    {
        //show Game over
        const gameOverLabel = document.getElementById('game-over-lbl');
        gameOverLabel.innerHTML = "<h1>Game Over</h1>";
    }
    
}

function isGameOver()
{
    // This function returns true if all the buttons are disabled and false otherwise 
    let btns = document.querySelectorAll('button');//selects all objects with tag 'buttons' on the page
        for(let i = 0; i < btns.length; i++){//for every button
            if(!btns[i].disabled){//if the button can still be clicked
                return false; //game is not over
            }
        }
        return true;//loop finished without finding an enabled button, so all buttons are disabled and the game is over
}

function checkWinner(){
    const winConditions = [
    [1,2,3],[4,5,6],[7,8,9], //rows
    [1,4,7],[2,5,8],[3,6,9], //columns
    [1,5,9],[3,5,7] //diagonals
    ];
    for(let i = 0; i < winConditions.length; i++){
        const line = winConditions[i]; //selects one winning line at a time
        //build the id of the first cell in this line
        //then read the text of the button inside it
        //repeat for the rest of the buttons in the winning line
        const textA = document.getElementById("c"+line[0]).innerText 
        const textB = document.getElementById("c"+line[1]).innerText
        const textC = document.getElementById("c"+line[2]).innerText 
        
        if (textA === textB && textB === textC && textA !== "[ ]"){//if the text in each line matches and they're not empty
        return textA; //return the text inside
        }
    }
    return null;//if no winner is found, return null
}   

