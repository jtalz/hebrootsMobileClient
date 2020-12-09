import shuffleArray from '../ShuffleArray'

const sortByPronoun = (verbFamily) =>
{
            let sortedSubData = verbFamily.slice(0).sort(function(a,b) {
                return pronounOrder.indexOf(a.possession.morphology) - pronounOrder.indexOf(b.possession.morphology);
            })
            return sortedSubData
}

const pronounOrder = [
    'FIRST+MF+SINGULAR', 
    'FIRST+M+SINGULAR', 
    'FIRST+F+SINGULAR', 
    'SECOND+M+SINGULAR', 
    'SECOND+F+SINGULAR',
    'THIRD+M+SINGULAR',
    'THIRD+F+SINGULAR',
    'FIRST+MF+PLURAL',
    'FIRST+M+PLURAL',
    'FIRST+F+PLURAL',
    'THIRD+M+PLURAL',
    'THIRD+F+PLURAL',
    'SECOND+M+PLURAL',
    'SECOND+F+PLURAL'
];

const getVerbFamilyStyle = (gameStyle, verbFamily) => {
    let tense;
    if(gameStyle == 'EASY_SINGLE_TENSE_PRACTICE'){
        tense = verbFamily[0].tense.he;
        const sorted = sortByPronoun(
            verbFamily[0].data); 
        let returnedArray = sorted.map((verb, i)=>{
            return { 
                tense, 
                possessionInfo: {
                    possession: verb.possession.possession,
                    morphology: verb.possession.morphology
                },
                conjugation: verb.conjugation,
                consonantCodes : verb.consonantCodes
            }
        })
        //console.log(returnedArray)
        return returnedArray;
    }else if(gameStyle == 'MEDIUM_SINGLE_TENSE_PRACTICE' || gameStyle == 'HARD_SINGLE_TENSE_PRACTICE'){
        tense = verbFamily[0].tense.he;
        let newVerbFamily = verbFamily[0].data.map((verb, i)=>{
            return { 
                tense, 
                possessionInfo: {
                    possession: verb.possession.possession,
                    morphology: verb.possession.morphology
                },
                conjugation: verb.conjugation,
                consonantCodes : verb.consonantCodes
            }
        });
        return shuffleArray(newVerbFamily);
    }else if(gameStyle == 'EASY_MULTIPLE_TENSE_PRACTICE'){
        let newVerbFamily = [];
        verbFamily.forEach((subFamily, nSubFamily) => {
            tense = subFamily.tense.he;
            subFamily.data.forEach((verb, i)=>{
                newVerbFamily.push({
                    tense, 
                    possessionInfo: {
                        possession: verb.possession.possession,
                        morphology: verb.possession.morphology
                    },
                    conjugation: verb.conjugation,
                    consonantCodes : verb.consonantCodes
                })
            })
        })
        return newVerbFamily;
    }else if(gameStyle == 'MEDIUM_MULTIPLE_TENSE_PRACTICE'){
        let newVerbFamily = [];
        verbFamily.forEach((subFamily, nSubFamily) => {
            tense = subFamily.tense.he;
            shuffleArray(subFamily.data).forEach((verb, i)=>{
                newVerbFamily.push({
                    tense, 
                    possessionInfo: {
                        possession: verb.possession.possession,
                        morphology: verb.possession.morphology
                    },
                    conjugation: verb.conjugation,
                    consonantCodes : verb.consonantCodes
                })
            })
        })
        return newVerbFamily;
    }else if(gameStyle=='HARD_MULTIPLE_TENSE_PRACTICE'){
        let newVerbFamily = [];
        shuffleArray(verbFamily).forEach((subFamily, nSubFamily) => {
            tense = subFamily.tense.he;
            shuffleArray(subFamily.data).forEach((verb, i)=>{
                newVerbFamily.push({
                    tense, 
                    possessionInfo: {
                        possession: verb.possession.possession,
                        morphology: verb.possession.morphology
                    },
                    conjugation: verb.conjugation,
                    consonantCodes : verb.consonantCodes
                })
            })
        })
        return newVerbFamily;
    }
};

export default getVerbFamilyStyle;

/*
building a reducer which must deal with the following state
    1) checkPlease: Boolean
    2) Conjugation : { nTense: number,  nPossession: number, name: String } 
    3) selectedChoice : String 
    4) allChoices : Array[String]
    5) questionStatus : String , options: ['unanswered', 'correct', incorrect']

    responsible for the following actions 
    1) selectChoice
    2) submitChoice
    3) moveToNextQuestion

    what i need to do is organize/shuffle the family array in such a way where i dont need to deal
    with tense or possession 
    I can even write a few algorithms to shuffle of the array based on how the gameplay is selected
    gameplay should be a parameter 
    lets start with this: 
    1) Easy Single Tense Practice
        Gameplay is conducted in order 
    2) Medium Single Tense Practice 
        Gameplay is shuffled 
    3) Hard Single Tense Practice Timed
        Gameplay is shuffled and timed - 
        7 seconds to answer or you lose a life
    4) Easy Multiple Tense Practice 
        Gameplay is conducted in order of possessions and tenses
    5) Medium Multiple Tense Practice 
        Gameplay is conducted in order of tenses, though possessions are shuffled 
    6) Hard Multiple Tense Practice Timed
        Gameplay is tense+possession shuffled and timed - 7 seconds to answer


    */