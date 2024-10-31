function kingIsSafe(kingPosition) {
    let opponentPossibleMoves = []
    for (const piecePosition in chessPiecePostions) {
        if (!chessPiecePostions[piecePosition].includes(turn)) {
            if (chessPiecePostions[piecePosition].includes('bishop')) {
                for (const eachMove of bishopPossibleMovesGenerator(piecePosition, kingPosition)) {
                    opponentPossibleMoves.push(eachMove)
                } 
            } else if (chessPiecePostions[piecePosition].includes('pawn')) {
                for (const eachMove of pawnPossibleMovesGenerator(piecePosition, kingPosition)) {
                    opponentPossibleMoves.push(eachMove)
                }
            } else if (chessPiecePostions[piecePosition].includes('rook')) {
                for (const eachMove of rookPossibleMovesGenerator(piecePosition, kingPosition)) {
                    opponentPossibleMoves.push(eachMove)
                }
            } else if (chessPiecePostions[piecePosition].includes('knight')) {
                for (const eachMove of knightPossibleMovesGenerator(piecePosition, kingPosition)) {
                    opponentPossibleMoves.push(eachMove)
                }
            } else if (chessPiecePostions[piecePosition].includes('queen')) {
                for (const eachMove of queenPossibleMovesGenerator(piecePosition, kingPosition)) {
                    opponentPossibleMoves.push(eachMove)
                }
            } 
            
        }
    }
    
    if (opponentPossibleMoves.includes(kingPosition)) {
        return false
    }
    return true
}
