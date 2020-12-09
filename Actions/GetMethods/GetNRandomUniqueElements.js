const getNRandomUniqueElements = ({usedElements, data, nCardsRequested, type, caller}) => {
    if (data.length < nCardsRequested){
        return 'Please provide a larger set of data'
    }else{
        var allElements = [...usedElements];
        for (var i = usedElements.length ; i<nCardsRequested ; i++){
            let tempAllEls = [...allElements];
            if (type == 'conjugation'){
                allElements.push(spawnRandomElementWhichIsNotIn(tempAllEls, data));
            }else {
                allElements.push(spawnRandomElementWhichIsNotIn2(tempAllEls, data));
            }
        }
        return allElements;
    }
}

const spawnRandomElementWhichIsNotIn = (allElements, data) => {
    var randomElement = data[Math.floor(Math.random() * data.length)].conjugation;
    if(allElements.includes(randomElement)){
        return spawnRandomElementWhichIsNotIn(allElements, data);
    }else 
        return randomElement;
}
const spawnRandomElementWhichIsNotIn2 = (allElements, data) => {
    var randomElement = data[Math.floor(Math.random() * data.length)];
    if(checkIfConjugationAlreadyPicked(randomElement.conjugation, allElements)){
        return spawnRandomElementWhichIsNotIn2(allElements, data);
    }else 
        return randomElement;
}

const checkIfConjugationAlreadyPicked = (conjugation, allElements) => {
    var alreadyPicked = allElements.filter(el=> el.conjugation == conjugation).length > 0 ? true: false;
    return alreadyPicked;
}

export default getNRandomUniqueElements;