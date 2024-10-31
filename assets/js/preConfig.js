// BUILD THE BOARD
const wholeBoard = document.getElementById('whole-board')
const copyBoard = document.getElementById('copy-board')
let turn = 'white'

// GENERATE SQUARE NOTATIONS
const idLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
const idNumbers = ['8', '7', '6', '5', '4', '3', '2', '1']
const squareNotations = []

for (const idNumber of idNumbers) {
    for (const idLetter of idLetters) {
        squareNotations.push(idLetter + idNumber)
    } 
}

// GENERATE COLUMNS AND ROWS
const tabularSquareNotations = []
for (let i = 1; i <= 8; i++) {
    for (let j = 1; j <= 8; j++) {
        tabularSquareNotations.push({'row': i, 'column': j})
    }
}

// CREATE SQUARES WITH IDS OF SQUARENOTATIONS
let lightDark = 1
let firstSquareIsLight = true
let lightDarkSet = ''
for (const squareNotation of squareNotations) {
    if (firstSquareIsLight) {
        if (lightDark % 2 !== 0) {
            lightSquareSet = 'light'
        } else {
            lightSquareSet = 'dark'
        }
    } else {
        if (lightDark % 2 !== 0) {
            lightSquareSet = 'dark'
        } else {
            lightSquareSet = 'light'
        }
    }
    const newSquare = document.createElement('div')
    const showMoveCircle = document.createElement('div')
    const takesCircle = document.createElement('div')
    const checkCircle = document.createElement('div')

    newSquare.className = `square ${lightSquareSet}-square`
    newSquare.id = squareNotation

    showMoveCircle.className = 'possible-move'
    newSquare.append(showMoveCircle)

    takesCircle.className = 'takes-circle'
    newSquare.append(takesCircle)
    
    checkCircle.className = 'check-circle'
    newSquare.append(checkCircle)
    

    wholeBoard.append(newSquare)
    newSquare.onclick = () => {
        clickedSquareHandler(squareNotation)
    }
    if (lightDark % 8 === 0) {
        firstSquareIsLight = !firstSquareIsLight
    }
    lightDark += 1
}

// ASSIGN CHESS PIECES THEIR POSITIONS
// const chessPiecePostions = {
//     'a1': 'blackqueen',
//     'e1': 'whiteking',
//     'h1': 'whiterook',
//     // 'a7': 'blackdarkbishop',
//     // 'h5': 'blacklightbishop',
// }
const chessPiecePostions = {
    'a1': 'whiterook',
    'b1': 'whiteknight',
    'c1': 'whitedarkbishop',
    'd1': 'whitequeen',
    'e1': 'whiteking',
    'f1': 'whitelightbishop',
    'g1': 'whiteknight',
    'h1': 'whiterook',
    'a2': 'whitepawn',
    'b2': 'whitepawn',
    'c2': 'whitepawn',
    'd2': 'whitepawn',
    'e2': 'whitepawn',
    'f2': 'whitepawn',
    'g2': 'whitepawn',
    'h2': 'whitepawn',
    
    'a8': 'blackrook',
    'b8': 'blackknight',
    'c8': 'blackdarkbishop',
    'd8': 'blackqueen',
    'e8': 'blackking',
    'f8': 'blacklightbishop',
    'g8': 'blackknight',
    'h8': 'blackrook',
    'a7': 'blackpawn',
    'b7': 'blackpawn',
    'c7': 'blackpawn',
    'd7': 'blackpawn',
    'e7': 'blackpawn',
    'f7': 'blackpawn',
    'g7': 'blackpawn',
    'h7': 'blackpawn',
}
// DETERMINE PAWN INITIAL POSITIONS
const whiteInitialPosition = []
const blackInitialPosition = []
for (const piece in chessPiecePostions) {
    if (chessPiecePostions[piece].includes('whitepawn')) {
        whiteInitialPosition.push(piece)
    }
    if (chessPiecePostions[piece].includes('blackpawn')) {
        blackInitialPosition.push(piece)
    }
}

// PUT CHESSPIECES IN THEIR POSIOTIONS
for (const chessPiecePostion in chessPiecePostions) {
    const chessPieceSquare = document.getElementById(chessPiecePostion)
    chessPieceSquare.innerHTML += `<img class="chess-piece" src="assets/chessPieces/${chessPiecePostions[chessPiecePostion]}.png">`
}
copyBoard.innerHTML = wholeBoard.innerHTML

for (const square of copyBoard.children) {
    square.onclick = () => {
        clickedSquareHandler(square.id)
    }
}

// RELATE SQUARE NOTATIONS WITH THE TABULAR FORM
const relatedNotations = {}
for (let i = 0; i < 64; i++) {
    relatedNotations[squareNotations[i]] = tabularSquareNotations[i]
}   
