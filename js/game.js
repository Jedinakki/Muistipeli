import { createBoard } from './board.js';

const nappi = document.getElementById("nappi")

function uudelleen(){
    document.getElementById("game-board").innerHTML = ""
    document.getElementById("yritykset").innerHTML = ""
    
    const cardCount = parseInt(prompt("Syötä korttien määrä (parillinen luku, max 32):"), 10);
    if (cardCount % 2 !== 0) {
        alert("Korttien määrän täytyy olla parillinen luku.");
        return;
    }
        createBoard(cardCount);
    
}



nappi.addEventListener("click", uudelleen)
