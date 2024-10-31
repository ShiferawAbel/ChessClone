function pawnPromotion(promoteTo) {
    if (promoteTo === 'queen') {
        document.getElementById(promotePosition).innerHTML = signs + `<img class="chess-piece" src="assets/chessPieces/${turn}queen.png">`
        chessPiecePostions[promotePosition] = `${turn}queen`
        delete chessPiecePostions[pawnToPromote]
        document.getElementById(pawnToPromote).innerHTML = signs
        document.getElementById(pawnToPromote).innerHTML = signs
        document.getElementById(pawnToPromote).classList.remove('selected-piece') 
        document.getElementById(`${turn}-promote-to`).style.display = 'none'
        document.getElementById('dimmer').style.display = 'none'
        
        promotePosition = ''
        pawnToPromote = ''
        console.log(chessPiecePostions)
        if (turn === 'white') {
            turn = 'black'
            document.getElementById('turn').innerText = `Black's Turn`
        } else {
            turn = 'white'
            document.getElementById('turn').innerText = `White's Turn`
        }
    } else if(promoteTo === 'rook') {
        document.getElementById(promotePosition).innerHTML = signs + `<img class="chess-piece" src="assets/chessPieces/${turn}rook.png">`
        chessPiecePostions[promotePosition] = `${turn}rook`
        delete chessPiecePostions[pawnToPromote]
        document.getElementById(pawnToPromote).innerHTML = signs
        document.getElementById(pawnToPromote).innerHTML = signs
        document.getElementById(pawnToPromote).classList.remove('selected-piece') 
        document.getElementById(`${turn}-promote-to`).style.display = 'none'
        document.getElementById('dimmer').style.display = 'none'
        
        promotePosition = ''
        pawnToPromote = ''
        if (turn === 'white') {
            turn = 'black'
            document.getElementById('turn').innerText = `Black's Turn`
        } else {
            turn = 'white'
            document.getElementById('turn').innerText = `White's Turn`
        }
    } else if(promoteTo === 'knight') {
        document.getElementById(promotePosition).innerHTML = signs + `<img class="chess-piece" src="assets/chessPieces/${turn}knight.png">`
        chessPiecePostions[promotePosition] = `${turn}knight`
        delete chessPiecePostions[pawnToPromote]
        document.getElementById(pawnToPromote).innerHTML = signs
        document.getElementById(pawnToPromote).innerHTML = signs
        document.getElementById(pawnToPromote).classList.remove('selected-piece') 
        document.getElementById(`${turn}-promote-to`).style.display = 'none'
        document.getElementById('dimmer').style.display = 'none'
        
        promotePosition = ''
        pawnToPromote = ''
        if (turn === 'white') {
            turn = 'black'
            document.getElementById('turn').innerText = `Black's Turn`
        } else {
            turn = 'white'
            document.getElementById('turn').innerText = `White's Turn`
        }
    }
}