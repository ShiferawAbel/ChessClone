// TABULAR TO NOTATION CONVERTER
function tabularToNotation(possibleMoves) {
    const generatedNotations = []
    for (const possibleMove of possibleMoves) {
        for (const allNotation in relatedNotations) {
            if (relatedNotations[allNotation]['row'] === possibleMove['row'] &&
            relatedNotations[allNotation]['column'] === possibleMove['column']
            ) { 
                generatedNotations.push(allNotation)
            }
        }
    }
    return generatedNotations
}


function shallowEqual(obj1, obj2) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
        return false;
    }

    for (const key of keys1) {
        if (obj1[key] !== obj2[key]) {
            return false;
        }
    }

    return true;
}