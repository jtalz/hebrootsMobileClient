const getSeperatedConjugationsAndPossessions = ( originalVerbData ) => {
    var dataLength = originalVerbData.length;
    var seperatedData = [];
    originalVerbData.forEach((verb, index) => {
            seperatedData.push({
                _id: index+dataLength,
                name: verb.conjugation, 
                pair: index, 
                visible: true, 
                selected: false,
                justSubmitted: false
            },
            {
                _id: index+(dataLength*2),
                name: verb.possessionInfo.possession, 
                pair: index, 
                visible: true, 
                selected: false,
                justSubmitted: false
            })
        
    });
    return seperatedData;
};

export default getSeperatedConjugationsAndPossessions;
