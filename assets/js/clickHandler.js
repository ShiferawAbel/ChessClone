let whiteFirstMove = true;
let blackFirstMove = true;
let pieceSelected = false;
let selectedPieceMoves = [];
let selectedPiece = '';
let whiteCastelQueen = true
let whiteCastelKing = true
let blackCastelQueen = true
let blackCastelKing = true
let castelNow = false
const whitePawnPromotion = ['a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8']
const blackPawnPromotion = ['a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1']

let pawnToPromote = ''
let promotePosition = ''

const signs = '<div class="possible-move"></div> <div class="takes-circle"></div> <div class="check-circle"></div>' 
function clickedSquareHandler(squareNotation) {
    if (pieceSelected) {
        if (selectedPieceMoves.includes(squareNotation)) {
            const clickedSquare = document.getElementById(squareNotation)
            const selectedPieceSquare = document.getElementById(selectedPiece)
            
            // CATSELING THE KING
            if (turn === 'white') {
                if (chessPiecePostions[selectedPiece].includes('whiteking')) {
                    if (whiteCastelKing && selectedPieceMoves.includes('g1') && squareNotation === 'g1') {
                        document.getElementById('f1').innerHTML = document.getElementById('h1').innerHTML
                        chessPiecePostions['f1'] = chessPiecePostions['h1']
                        delete chessPiecePostions['h1']
                        document.getElementById('h1').innerHTML = signs
                        
                    } else if (whiteCastelQueen && selectedPieceMoves.includes('c1') && squareNotation === 'c1') {
                        document.getElementById('d1').innerHTML = document.getElementById('a1').innerHTML
                        chessPiecePostions['d1'] = chessPiecePostions['a1']
                        delete chessPiecePostions['a1']
                        document.getElementById('a1').innerHTML = signs
                        
                    }
                    whiteCastelQueen = false
                    whiteCastelKing = false  
                } else if (chessPiecePostions[selectedPiece].includes('whiterook')) {
                    if (selectedPiece === 'a1') {
                        whiteCastelQueen = false     
                    } else if (selectedPiece === 'h1') {
                        whiteCastelKing = false
                    }
                } 
            } else {
                if (chessPiecePostions[selectedPiece].includes('blackking')) {
                    if (blackCastelKing && selectedPieceMoves.includes('g8') && squareNotation === 'g8') {
                        document.getElementById('f8').innerHTML = document.getElementById('h8').innerHTML
                        chessPiecePostions['f8'] = chessPiecePostions['h8']
                        delete chessPiecePostions['h8']
                        document.getElementById('h8').innerHTML = signs
                        
                    } else if (blackCastelQueen && selectedPieceMoves.includes('c8') && squareNotation === 'c8') {
                        document.getElementById('d8').innerHTML = document.getElementById('a8').innerHTML
                        chessPiecePostions['d8'] = chessPiecePostions['a8']
                        delete chessPiecePostions['a8']
                        document.getElementById('a8').innerHTML = signs
                        
                    }
                    blackCastelQueen = false
                    blackCastelKing = false  
                } else if (chessPiecePostions[selectedPiece].includes('blackrook')) {
                    if (selectedPiece === 'a8') {
                        blackCastelQueen = false     
                    } else if (selectedPiece === 'h8') {
                        blackCastelKing = false
                    }
                } 
            }
            
            // NECCESARY UPDATES
            // MAKE THE CHECK WARNING INVISIBLE SINCE THE KING IS SAFE AT THIS POINT
            if (document.getElementsByClassName('check-circle visible')) {
                for (const both of document.getElementsByClassName('check-circle visible')) {
                    both.classList.toggle('visible')
                }
            }
            // SHOW CAPTURED PIECES ON THE SIDE IF THERE IS ONE
            if (Object.hasOwn(chessPiecePostions, squareNotation) && !chessPiecePostions[squareNotation].includes('turn')) {
                if (turn === 'white') {
                    document.getElementById('black-taken').append(clickedSquare.lastChild)
                    document.getElementById('black-taken').lastChild.className = 'taken-piece'
                    
                } else {
                    document.getElementById('white-taken').append(clickedSquare.lastChild)
                    document.getElementById('white-taken').lastChild.className = 'taken-piece'
                    
                }
                const capture = document.getElementById('capture-sound')
                capture.play()
            } else {
                const moveSelf = document.getElementById('move-self')
                moveSelf.play()
            }
            // REMOVE THE SELECTED MOVE INDICATOR
            if (selectedPieceSquare.className.includes('selected-piece')) {
                selectedPieceSquare.classList.toggle('selected-piece')
                
            }
            
            // UPDATE THE SELECTED MOVE AND SELECTED PIECE SQUARE INNERHTML
            clickedSquare.innerHTML = selectedPieceSquare.innerHTML
            selectedPieceSquare.innerHTML = signs 
            
            // TOGGLE POSSIBLEMOVE POINTERS TO MAKE THEM INVISIBLE
            for (const selectedPieceMove of selectedPieceMoves) {
                const wantedSquare = document.getElementById(selectedPieceMove)
                if (wantedSquare.children[0].className.includes('visible')) {
                    wantedSquare.children[0].classList.toggle('visible')
                }
                if (wantedSquare.children[1].className.includes('visible')) {
                    wantedSquare.children[1].classList.toggle('visible')
                } pawnPromotion
            }
            // CHECK FOR PROMOTION OR ELSE SWITCH TURN
            if (chessPiecePostions[selectedPiece].includes('whitepawn') && whitePawnPromotion.includes(squareNotation)) {
                document.getElementById('white-promote-to').style.display = 'flex'
                document.getElementById('dimmer').style.display = 'block'
                pawnToPromote = selectedPiece
                promotePosition = squareNotation
            } else if (chessPiecePostions[selectedPiece].includes('blackpawn') && blackPawnPromotion.includes(squareNotation)) {
                document.getElementById('black-promote-to').style.display = 'flex'
                document.getElementById('dimmer').style.display = 'block'
                pawnToPromote = selectedPiece
                promotePosition = squareNotation
            } else {
                
                if (turn === 'white') {
                    turn = 'black'
                    document.getElementById('turn').innerText = `Black's Turn`
                } else {
                    turn = 'white'
                    document.getElementById('turn').innerText = `White's Turn`
                }
            }
            // UPDATE THE chessPiecePostions OBJECT BASED ON THE NEW MOVE
            chessPiecePostions[squareNotation] = chessPiecePostions[selectedPiece]
            delete chessPiecePostions[selectedPiece]
            // RESET VALUES
            pieceSelected = false
            selectedPiece = ''
            selectedPieceMoves = []
            
            // COPY THE BOARD FOR THE BLACK PLAYER
            copyBoard.innerHTML = wholeBoard.innerHTML
            for (const square of copyBoard.children) {
                square.onclick = () => {
                    clickedSquareHandler(square.id)
                }
            }
            // CHECK FOR CHECK AND MATE
            let kingPosition = ''
            for (const piece in chessPiecePostions) {
                if (chessPiecePostions[piece].includes(`${turn}king`)) {
                    kingPosition = piece
                    break
                }
            }
            
            if (!kingIsSafe(kingPosition)) {
                const kingSquare = document.getElementById(kingPosition)
                if (kingPossibleMovesGenerator(kingPosition).length === 0) {
                    if (checkMate(kingPosition)) {
                        const checkmate = document.getElementById('checkmate-sound')
                        checkmate.play()
                        setTimeout(() => {
                            if (turn === 'white') {
                                document.getElementById('black-won').style.display = 'flex'
                            } else {
                                document.getElementById('white-won').style.display = 'flex'
                                
                            }
                            document.getElementById('dimmer').style.display = 'block'
                            
                        }, 500)
                    }
                }
                kingSquare.children[2].classList.toggle('visible')
            }
        } else if (Object.hasOwn(chessPiecePostions, squareNotation)) {
            document.getElementById(selectedPiece).classList.toggle('selected-piece')
            for (const selectedPieceMove of selectedPieceMoves) {
                const wantedSquare = document.getElementById(selectedPieceMove)
                if (wantedSquare.children[0].className.includes('visible')) {
                    wantedSquare.children[0].classList.toggle('visible')
                }
                if (wantedSquare.children[1].className.includes('visible')) {
                    wantedSquare.children[1].classList.toggle('visible')
                }
            }
            pieceSelected = false
            selectedPiece = ''
            selectedPieceMoves = []
            clickedSquareHandler(squareNotation)
        }
    } else {
        if (Object.hasOwn(chessPiecePostions, squareNotation)&& chessPiecePostions[squareNotation].includes(turn) ) {
            selectedPiece = document.getElementById(squareNotation)
            if (chessPiecePostions[squareNotation].includes('pawn')) {
                showPossibleMoves(pawnPossibleMovesGenerator(squareNotation), squareNotation, turn)
            } else if (chessPiecePostions[squareNotation].includes('bishop')) {
                showPossibleMoves(bishopPossibleMovesGenerator(squareNotation), squareNotation)
            } else if (chessPiecePostions[squareNotation].includes('rook')) {
                showPossibleMoves(rookPossibleMovesGenerator(squareNotation), squareNotation)
            } else if (chessPiecePostions[squareNotation].includes('knight')) {
                showPossibleMoves(knightPossibleMovesGenerator(squareNotation), squareNotation)
            } else if (chessPiecePostions[squareNotation].includes('queen')) {
                showPossibleMoves(queenPossibleMovesGenerator(squareNotation), squareNotation)
            } else if (chessPiecePostions[squareNotation].includes('king')) {
                showPossibleMoves(kingPossibleMovesGenerator(squareNotation), squareNotation)
            }
        }
        
    }
}

function showPossibleMoves(generatedPossibleMoves, squareNotation) {
    let kingPosition = '';
    for (const piece in chessPiecePostions) {
        if (chessPiecePostions[piece].includes(`${turn}king`)) {
            kingPosition = piece
        } 
    }
    if (!chessPiecePostions[squareNotation].includes('king')) { 
        for (let i = generatedPossibleMoves.length - 1; i >= 0 ; i--) {
            const previousPiecePosition = chessPiecePostions[squareNotation]; 
            let previousPiecePosition2 = ''; 
            if (Object.hasOwn(chessPiecePostions, generatedPossibleMoves[i])) {
                previousPiecePosition2 = chessPiecePostions[generatedPossibleMoves[i]]
            }
            chessPiecePostions[generatedPossibleMoves[i]] = previousPiecePosition 
            delete chessPiecePostions[squareNotation]
            if (!kingIsSafe(kingPosition)) { 
                chessPiecePostions[squareNotation] = previousPiecePosition
                if (previousPiecePosition2 !== '') {
                    chessPiecePostions[generatedPossibleMoves[i]] = previousPiecePosition2
                } else {
                    delete chessPiecePostions[generatedPossibleMoves[i]]
                }  
                generatedPossibleMoves.splice(i, 1)
            } else {
                chessPiecePostions[squareNotation] = previousPiecePosition
                if (previousPiecePosition2 !== '') {
                    chessPiecePostions[generatedPossibleMoves[i]] = previousPiecePosition2
                } else {
                    delete chessPiecePostions[generatedPossibleMoves[i]]
                }
            }
            
            
            
        }
    } else {
        if (generatedPossibleMoves.includes(`${turn}castelqueen`) && generatedPossibleMoves.includes(`${turn}castelking`)) {
            
            generatedPossibleMoves.pop()
            generatedPossibleMoves.pop()
            if (turn === 'white') {
                generatedPossibleMoves.push('c1')
                generatedPossibleMoves.push('g1')
                
            } else {
                generatedPossibleMoves.push('c8')
                generatedPossibleMoves.push('g8')
                
            }
            
        } else {
            
            if (generatedPossibleMoves.includes(`${turn}castelqueen`)) {
                generatedPossibleMoves.pop()
                if (turn === 'white') {
                    generatedPossibleMoves.push('c1')
                    
                } else {
                    generatedPossibleMoves.push('c8')
                    
                }
                
            } else if (generatedPossibleMoves.includes(`${turn}castelking`)) {
                generatedPossibleMoves.pop()
                if (turn === 'white') {
                    generatedPossibleMoves.push('g1')
                    
                } else {
                    generatedPossibleMoves.push('g8')
                    
                }
            } 
        }
    }
    for (const generatedPossibleMove of generatedPossibleMoves) {
        const possibleMoveSquare = document.getElementById(generatedPossibleMove)
        if (Object.hasOwn(chessPiecePostions, generatedPossibleMove)) {
            possibleMoveSquare.children[1].classList.toggle('visible')
        } else {
            possibleMoveSquare.children[0].classList.toggle('visible')
        }
    }
    
    // HIGHLIGHT SELECTED PIECE
    document.getElementById(squareNotation).classList.toggle('selected-piece')
    if (turn === 'black') {
        copyBoard.innerHTML = wholeBoard.innerHTML
        for (const square of copyBoard.children) {
            square.onclick = () => {
                clickedSquareHandler(square.id)
            }
        }
        
    } 
    pieceSelected  = true
    selectedPiece = squareNotation
    selectedPieceMoves = generatedPossibleMoves
}