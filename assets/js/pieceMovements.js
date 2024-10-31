function pawnPossibleMovesGenerator(squareNotaion, kingPosition) {
    const currentPosition = relatedNotations[squareNotaion];
    const possibleMoves = [];
    let pawnTakesPositions = []
    let possibleMovesNotation = [];
    let kingInitialPosition = ''
    let previousPiecePosition = ''
    
    if (kingPosition) {
        for (const piecePosition in chessPiecePostions) {
            if (chessPiecePostions[piecePosition] === `${turn}king`) {
                kingInitialPosition = piecePosition
                
            }
        }
        if (Object.hasOwn(chessPiecePostions, kingPosition)) {
            previousPiecePosition = chessPiecePostions[kingPosition]
        }
        chessPiecePostions[kingPosition] = `${turn}king`
        if (turn === 'white') {
            turn = 'black'
        } else {
            turn = 'white'
        }
        delete chessPiecePostions[kingInitialPosition]
    }

    if (turn === 'white') {
        if (whiteInitialPosition.includes(squareNotaion)) {
            for (let i = 1; i <= 2; i++) {
                const forwardSquare = tabularToNotation([{'row': currentPosition['row']-i, 'column': currentPosition['column']}])[0]
                if (Object.hasOwn(chessPiecePostions, forwardSquare)) {
                    break
                }
                possibleMoves.push({'row': currentPosition['row']-i, 'column': currentPosition['column']})
            }
            
        } else {
            for (let i = 1; i <= 1; i++) {
                const forwardSquare = tabularToNotation([{'row': currentPosition['row']-i, 'column': currentPosition['column']}])[0]
                if (Object.hasOwn(chessPiecePostions, forwardSquare)) {
                    break
                }
                possibleMoves.push({'row': currentPosition['row']-i, 'column': currentPosition['column']})
            }
        }
        possibleMovesNotation = tabularToNotation(possibleMoves)
        for (i = possibleMovesNotation.length-1; i >= 0; i--) {
            if (Object.hasOwn(chessPiecePostions, possibleMovesNotation[i])) {
                possibleMovesNotation.splice(i, 1)
            } 
        }
        pawnTakesPositions = tabularToNotation([
            {'column': currentPosition['column']+1, 'row': currentPosition['row']-1},
            {'column': currentPosition['column']-1, 'row': currentPosition['row']-1}
        ])
        for (const pawnTakesPosition of pawnTakesPositions) {
            if (Object.hasOwn(chessPiecePostions, pawnTakesPosition) && chessPiecePostions[pawnTakesPosition].includes('black')) {
                possibleMovesNotation.push(pawnTakesPosition)
            }
            
        }
    } else {
        if (blackInitialPosition.includes(squareNotaion)) {
            for (let i = 1; i <= 2; i++) {
                const forwardSquare = tabularToNotation([{'row': currentPosition['row']+i, 'column': currentPosition['column']}])[0]
                if (Object.hasOwn(chessPiecePostions, forwardSquare)) {
                    break
                }
                possibleMoves.push({'row': currentPosition['row']+i, 'column': currentPosition['column']})
            }
            
        } else {
            for (let i = 1; i <= 1; i++) {
                const forwardSquare = tabularToNotation([{'row': currentPosition['row']+i, 'column': currentPosition['column']}])[0]
                if (Object.hasOwn(chessPiecePostions, forwardSquare)) {
                    break
                }
                possibleMoves.push({'row': currentPosition['row']+i, 'column': currentPosition['column']})
            }
        }
        possibleMovesNotation = tabularToNotation(possibleMoves)
        pawnTakesPositions = tabularToNotation([
            {'column': currentPosition['column']+1, 'row': currentPosition['row']+1},
            {'column': currentPosition['column']-1, 'row': currentPosition['row']+1}
        ])
        for (const pawnTakesPosition of pawnTakesPositions) {
            if (Object.hasOwn(chessPiecePostions, pawnTakesPosition) && chessPiecePostions[pawnTakesPosition].includes('white')) {
                possibleMovesNotation.push(pawnTakesPosition)
            }
            
        }

    }

    if (kingPosition) {
        if (turn === 'white') {
            turn = 'black'
        } else {
            turn = 'white'
        }
        chessPiecePostions[kingInitialPosition] = `${turn}king`
        if (previousPiecePosition !== '') {
            chessPiecePostions[kingPosition] = previousPiecePosition
        } else {
            delete chessPiecePostions[kingPosition]
        }
        return pawnTakesPositions
    }
    
    return possibleMovesNotation
}

function bishopPossibleMovesGenerator(squareNotation, kingPosition = undefined) {
    const possibleMoves = []
    const squareTabularNotation = relatedNotations[squareNotation]
    let kingInitialPosition = ''
    let previousPiecePosition = ''
    
    for (const piecePosition in chessPiecePostions) {
        if (chessPiecePostions[piecePosition] === `${turn}king`) {
            kingInitialPosition = piecePosition
            
        }
    }
    if (kingPosition) {
        // console.log(kingPosition)
        if (Object.hasOwn(chessPiecePostions, kingPosition)) {
            // console.log('previousPiecePosition')
            previousPiecePosition = chessPiecePostions[kingPosition]
        }
        chessPiecePostions[kingPosition] = `${turn}king`
        if (turn === 'white') {
            turn = 'black'
        } else {
            turn = 'white'
        }
        delete chessPiecePostions[kingInitialPosition]
    }
    for (let i = 1; i < 8; i++) {
        let endHere = false
        const diagonalSquare = {'column': squareTabularNotation['column'] + i, 'row': squareTabularNotation['row'] - i}
        for (const tabularSquareNotation of tabularSquareNotations) {
            if (shallowEqual(tabularSquareNotation, diagonalSquare)) {
                let diagonalSquareNotation = tabularToNotation([diagonalSquare])[0]
                if (Object.hasOwn(chessPiecePostions,diagonalSquareNotation)) {
                    if (chessPiecePostions[diagonalSquareNotation].includes(turn)) {
                        endHere = true
                    } else {
                        possibleMoves.push(diagonalSquare)
                        endHere = true
                    }
                } else {
                    possibleMoves.push(diagonalSquare)

                }                        
                 
            }
            if (endHere) {
                break
            }
        }
        
        if (endHere) {
            break
        }
    }
    for (let i = 1; i < 8; i++) {
        let endHere = false
        const diagonalSquare = {'column': squareTabularNotation['column'] + i, 'row': squareTabularNotation['row'] + i}
        for (const tabularSquareNotation of tabularSquareNotations) {
            if (shallowEqual(tabularSquareNotation, diagonalSquare)) {
                let diagonalSquareNotation = tabularToNotation([diagonalSquare])[0]
                if (Object.hasOwn(chessPiecePostions,diagonalSquareNotation)) {
                    if (chessPiecePostions[diagonalSquareNotation].includes(turn)) {
                        endHere = true
                    } else {
                        possibleMoves.push(diagonalSquare)
                        endHere = true
                    }
                } else {
                    possibleMoves.push(diagonalSquare)

                }                        
                 
            }
            if (endHere) {
                break
            }
        }
        
        if (endHere) {
            break
        }
    }

    for (let i = 1; i < 8; i++) {
        let endHere = false
        const diagonalSquare = {'column': squareTabularNotation['column'] - i, 'row': squareTabularNotation['row'] - i}
        for (const tabularSquareNotation of tabularSquareNotations) {
            if (shallowEqual(tabularSquareNotation, diagonalSquare)) {
                let diagonalSquareNotation = tabularToNotation([diagonalSquare])[0]
                if (Object.hasOwn(chessPiecePostions,diagonalSquareNotation)) {
                    if (chessPiecePostions[diagonalSquareNotation].includes(turn)) {
                        endHere = true
                    } else {
                        possibleMoves.push(diagonalSquare)
                        endHere = true
                    }
                } else {
                    possibleMoves.push(diagonalSquare)

                }                        
                 
            }
            if (endHere) {
                break
            }
        }
        
        if (endHere) {
            break
        }
    }

    for (let i = 1; i < 8; i++) {
        let endHere = false
        const diagonalSquare = {'column': squareTabularNotation['column'] - i, 'row': squareTabularNotation['row'] + i}
        for (const tabularSquareNotation of tabularSquareNotations) {
            if (shallowEqual(tabularSquareNotation, diagonalSquare)) {
                let diagonalSquareNotation = tabularToNotation([diagonalSquare])[0]
                if (Object.hasOwn(chessPiecePostions,diagonalSquareNotation)) {
                    if (chessPiecePostions[diagonalSquareNotation].includes(turn)) {
                        endHere = true
                    } else {
                        possibleMoves.push(diagonalSquare)
                        endHere = true
                    }
                } else {
                    possibleMoves.push(diagonalSquare)

                }                        
                 
            }
            if (endHere) {
                break
            }
        }
        
        if (endHere) {
            break
        }
    }
    if (kingPosition) {
        if (turn === 'white') {
            turn = 'black'
        } else {
            turn = 'white'
        }
        chessPiecePostions[kingInitialPosition] = `${turn}king`
        if (previousPiecePosition !== '') {
            chessPiecePostions[kingPosition] = previousPiecePosition
        } else {
            delete chessPiecePostions[kingPosition]
        }
    }

    const possibleMovesNotation = tabularToNotation(possibleMoves)

    return possibleMovesNotation
}

function rookPossibleMovesGenerator(squareNotation, kingPosition = undefined) {
    const possibleMoves = []
    const squareTabularNotation = relatedNotations[squareNotation]
    let kingInitialPosition = ''
    let previousPiecePosition = ''
    
    if (kingPosition) {
        for (const piecePosition in chessPiecePostions) {
            if (chessPiecePostions[piecePosition] === `${turn}king`) {
                kingInitialPosition = piecePosition
            }
        }
        if (Object.hasOwn(chessPiecePostions, kingPosition)) {
            // console.log('previousPiecePosition')
            previousPiecePosition = chessPiecePostions[kingPosition]
        }
        chessPiecePostions[kingPosition] = `${turn}king`
        if (turn === 'white') {
            turn = 'black'
        } else {
            turn = 'white'
        }
        delete chessPiecePostions[kingInitialPosition]
    }
    
   
    for (let i = 1; i < 8; i++) {
        let endHere = false
        const straightDiagonal = {'column': squareTabularNotation['column'] + i, 'row': squareTabularNotation['row']}
        for (const tabularSquareNotation of tabularSquareNotations) {
            if (shallowEqual(tabularSquareNotation, straightDiagonal)) {
                let straightDiagonalNotation = tabularToNotation([straightDiagonal])[0]
                if (Object.hasOwn(chessPiecePostions,straightDiagonalNotation)) {
                    if (chessPiecePostions[straightDiagonalNotation].includes(turn)) {
                        endHere = true
                    } else {
                        possibleMoves.push(straightDiagonal)
                        endHere = true
                    }
                } else {
                    possibleMoves.push(straightDiagonal)

                }                        
                 
            }
            if (endHere) {
                break
            }
        }
        
        if (endHere) {
            break
        }
    }

    for (let i = 1; i < 8; i++) {
        let endHere = false
        const straightDiagonal = {'column': squareTabularNotation['column'] - i, 'row': squareTabularNotation['row']}
        for (const tabularSquareNotation of tabularSquareNotations) {
            if (shallowEqual(tabularSquareNotation, straightDiagonal)) {
                let straightDiagonalNotation = tabularToNotation([straightDiagonal])[0]
                if (Object.hasOwn(chessPiecePostions,straightDiagonalNotation)) {
                    if (chessPiecePostions[straightDiagonalNotation].includes(turn)) {
                        endHere = true
                    } else {
                        possibleMoves.push(straightDiagonal)
                        endHere = true
                    }
                } else {
                    possibleMoves.push(straightDiagonal)

                }                        
                 
            }
            if (endHere) {
                break
            }
        }
        
        if (endHere) {
            break
        }
    }
    
    for (let i = 1; i < 8; i++) {
        let endHere = false
        const straightDiagonal = {'column': squareTabularNotation['column'], 'row': squareTabularNotation['row'] + i}
        for (const tabularSquareNotation of tabularSquareNotations) {
            if (shallowEqual(tabularSquareNotation, straightDiagonal)) {
                let straightDiagonalNotation = tabularToNotation([straightDiagonal])[0]
                if (Object.hasOwn(chessPiecePostions,straightDiagonalNotation)) {
                    if (chessPiecePostions[straightDiagonalNotation].includes(turn)) {
                        endHere = true
                    } else {
                        possibleMoves.push(straightDiagonal)
                        endHere = true
                    }
                } else {
                    possibleMoves.push(straightDiagonal)

                }                        
                 
            }
            if (endHere) {
                break
            }
        }
        
        if (endHere) {
            break
        }
    }
    
    for (let i = 1; i < 8; i++) {
        let endHere = false
        const straightDiagonal = {'column': squareTabularNotation['column'], 'row': squareTabularNotation['row'] - i}
        for (const tabularSquareNotation of tabularSquareNotations) {
            if (shallowEqual(tabularSquareNotation, straightDiagonal)) {
                let straightDiagonalNotation = tabularToNotation([straightDiagonal])[0]
                if (Object.hasOwn(chessPiecePostions,straightDiagonalNotation)) {
                    if (chessPiecePostions[straightDiagonalNotation].includes(turn)) {
                        endHere = true
                    } else {
                        possibleMoves.push(straightDiagonal)
                        endHere = true
                    }
                } else {
                    possibleMoves.push(straightDiagonal)

                }                        
                 
            }
            if (endHere) {
                break
            }
        }
        
        if (endHere) {
            break
        }
    }
    
    if (kingPosition) {
        if (turn === 'white') {
            turn = 'black'
        } else {
            turn = 'white'
        }
        chessPiecePostions[kingInitialPosition] = `${turn}king`
        if (previousPiecePosition !== '') {
            chessPiecePostions[kingPosition] = previousPiecePosition
        } else {
            delete chessPiecePostions[kingPosition]
        }
    }

    return tabularToNotation(possibleMoves)
}

function knightPossibleMovesGenerator(squareNotation, kingPosition = undefined) {
    const squareTabularNotation = relatedNotations[squareNotation]

    let kingInitialPosition = ''
    let previousPiecePosition = ''

    
    if (kingPosition) {
        // console.log(kingPosition)
        for (const piecePosition in chessPiecePostions) {
            if (chessPiecePostions[piecePosition] === `${turn}king`) {
                kingInitialPosition = piecePosition
                
            }
        }
        if (Object.hasOwn(chessPiecePostions, kingPosition)) {
            // console.log('previousPiecePosition')
            previousPiecePosition = chessPiecePostions[kingPosition]
        }
        chessPiecePostions[kingPosition] = `${turn}king`
        if (turn === 'white') {
            turn = 'black'
        } else {
            turn = 'white'
        }
        delete chessPiecePostions[kingInitialPosition]
    }
    const path1 = {'column': squareTabularNotation['column'] - 1, 'row': squareTabularNotation['row'] -2}
    const path2 = {'column': squareTabularNotation['column'] + 1, 'row': squareTabularNotation['row'] -2}
    const path3 = {'column': squareTabularNotation['column'] + 1, 'row': squareTabularNotation['row'] + 2}
    const path4 = {'column': squareTabularNotation['column'] - 1, 'row': squareTabularNotation['row'] + 2}
    const path5 = {'column': squareTabularNotation['column'] - 2, 'row': squareTabularNotation['row'] - 1}
    const path6 = {'column': squareTabularNotation['column'] -2, 'row': squareTabularNotation['row'] + 1}
    const path7 = {'column': squareTabularNotation['column'] + 2, 'row': squareTabularNotation['row'] - 1}
    const path8 = {'column': squareTabularNotation['column'] + 2, 'row': squareTabularNotation['row'] + 1}

    
    const possibleMoves = tabularToNotation([path1, path2, path3, path4, path5, path6, path7, path8])
    
    for (let i = possibleMoves.length-1; i >= 0; i--) {
        if (Object.hasOwn(chessPiecePostions, possibleMoves[i]) && 
        chessPiecePostions[possibleMoves[i]].includes(turn)) {
            possibleMoves.splice(i, 1)
        }
    }
    if (kingPosition) {
        if (turn === 'white') {
            turn = 'black'
        } else {
            turn = 'white'
        }
        chessPiecePostions[kingInitialPosition] = `${turn}king`
        if (previousPiecePosition !== '') {
            chessPiecePostions[kingPosition] = previousPiecePosition
        } else {
            delete chessPiecePostions[kingPosition]
        }
    }
    
    return possibleMoves
}

function queenPossibleMovesGenerator(squareNotation, kingPosition = undefined) {
    return bishopPossibleMovesGenerator(squareNotation, kingPosition).concat(rookPossibleMovesGenerator(squareNotation, kingPosition))
}

function kingPossibleMovesGenerator(squareNotation) {
    const squareTabularNotation = relatedNotations[squareNotation];

    const path1 = {'column': squareTabularNotation['column'], 'row': squareTabularNotation['row'] - 1}
    const path2 = {'column': squareTabularNotation['column'], 'row': squareTabularNotation['row'] + 1}
    const path3 = {'column': squareTabularNotation['column'] + 1, 'row': squareTabularNotation['row']}
    const path4 = {'column': squareTabularNotation['column'] - 1, 'row': squareTabularNotation['row']}
    const path5 = {'column': squareTabularNotation['column'] - 1, 'row': squareTabularNotation['row'] - 1}
    const path6 = {'column': squareTabularNotation['column'] + 1, 'row': squareTabularNotation['row'] - 1}
    const path7 = {'column': squareTabularNotation['column'] + 1, 'row': squareTabularNotation['row'] + 1}
    const path8 = {'column': squareTabularNotation['column'] - 1, 'row': squareTabularNotation['row'] + 1}

    const possibleMoves = tabularToNotation([path1, path2, path3, path4, path5, path6, path7, path8])

    
    for (let i = possibleMoves.length-1; i >= 0; i--) {
        if (Object.hasOwn(chessPiecePostions, possibleMoves[i]) && 
        chessPiecePostions[possibleMoves[i]].includes(turn)) {
            possibleMoves.splice(i, 1)
        }
    }
    
    for (let i = possibleMoves.length-1; i >= 0; i--) {
        if(!kingIsSafe(possibleMoves[i])) {
            possibleMoves.splice(i, 1)
        }
    }
    if (turn === 'white') {
        if (whiteCastelKing && kingIsSafe('h1') && kingIsSafe('g1')) {
            if (!chessPiecePostions['f1'] && !chessPiecePostions['g1']) {
                possibleMoves.push('whitecastelking')
            }
        }
        if (whiteCastelQueen && kingIsSafe('b1') && kingIsSafe('c1') && kingIsSafe('d1')) {
            if (!chessPiecePostions['b1'] && !chessPiecePostions['c1'] && !chessPiecePostions['d1']) {
                possibleMoves.push('whitecastelqueen')
            }
        }
        
    } else {
        if (blackCastelKing  && kingIsSafe('h8') && kingIsSafe('g8')) {
            if (!chessPiecePostions['f8'] && !chessPiecePostions['g8']) {
                possibleMoves.push('blackcastelking')
            }
        } 
        if (blackCastelQueen && kingIsSafe('b8') && kingIsSafe('c8') && kingIsSafe('d8')) {
            if (!chessPiecePostions['b8'] && !chessPiecePostions['c8'] && !chessPiecePostions['d8']) {
                possibleMoves.push('blackcastelqueen')
            }
        }
        
    }
    return possibleMoves
} 