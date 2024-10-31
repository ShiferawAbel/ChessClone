function checkMate(kingPosition) {
    for (const piecePosition in chessPiecePostions) {
        if (chessPiecePostions[piecePosition].includes(turn)) {
            if (chessPiecePostions[piecePosition].includes('rook')) {
                for (const possibleMove of rookPossibleMovesGenerator(piecePosition)) {
                    chessPiecePostions[possibleMove] = chessPiecePostions[piecePosition]
                    delete chessPiecePostions[piecePosition]
                    if (kingIsSafe(kingPosition)) {
                        chessPiecePostions[piecePosition] = chessPiecePostions[possibleMove]
                        delete chessPiecePostions[possibleMove]
                        return false
                    }
                    chessPiecePostions[piecePosition] = chessPiecePostions[possibleMove]
                    delete chessPiecePostions[possibleMove]

                }
            } else if (chessPiecePostions[piecePosition].includes('bishop')) {
                for (const possibleMove of bishopPossibleMovesGenerator(piecePosition)) {
                    chessPiecePostions[possibleMove] = chessPiecePostions[piecePosition]
                    delete chessPiecePostions[piecePosition]
                    if (kingIsSafe(kingPosition)) {
                        chessPiecePostions[piecePosition] = chessPiecePostions[possibleMove]
                        delete chessPiecePostions[possibleMove]
                        return false
                    }
                    chessPiecePostions[piecePosition] = chessPiecePostions[possibleMove]
                    delete chessPiecePostions[possibleMove]

                }
            } else if (chessPiecePostions[piecePosition].includes('queen')) {
                for (const possibleMove of queenPossibleMovesGenerator(piecePosition)) {
                    chessPiecePostions[possibleMove] = chessPiecePostions[piecePosition]
                    delete chessPiecePostions[piecePosition]
                    if (kingIsSafe(kingPosition)) {
                        chessPiecePostions[piecePosition] = chessPiecePostions[possibleMove]
                        delete chessPiecePostions[possibleMove]
                        return false
                    }
                    chessPiecePostions[piecePosition] = chessPiecePostions[possibleMove]
                    delete chessPiecePostions[possibleMove]

                }
            } else if (chessPiecePostions[piecePosition].includes('knight')) {
                for (const possibleMove of knightPossibleMovesGenerator(piecePosition)) {
                    chessPiecePostions[possibleMove] = chessPiecePostions[piecePosition]
                    delete chessPiecePostions[piecePosition]
                    if (kingIsSafe(kingPosition)) {
                        chessPiecePostions[piecePosition] = chessPiecePostions[possibleMove]
                        delete chessPiecePostions[possibleMove]
                        return false
                    }
                    chessPiecePostions[piecePosition] = chessPiecePostions[possibleMove]
                    delete chessPiecePostions[possibleMove]

                }
            } else if (chessPiecePostions[piecePosition].includes('pawn')) {
                for (const possibleMove of pawnPossibleMovesGenerator(piecePosition)) {
                    chessPiecePostions[possibleMove] = chessPiecePostions[piecePosition]
                    delete chessPiecePostions[piecePosition]
                    if (kingIsSafe(kingPosition)) {
                        chessPiecePostions[piecePosition] = chessPiecePostions[possibleMove]
                        delete chessPiecePostions[possibleMove]
                        return false
                    }
                    chessPiecePostions[piecePosition] = chessPiecePostions[possibleMove]
                    delete chessPiecePostions[possibleMove]

                }
            }
            
        } 
    }

    return true
}

