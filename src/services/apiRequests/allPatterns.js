const requestAllPatterns = async () => {
    try{
        const duplicateAndAssignTense = (tense_en, tense_he, pattern) => {
            let obj = Object.assign({}, pattern);
            obj.tense_en=tense_en;
            obj.tense_he=tense_he;
            return obj;
        }
        const response = await fetch(`https://hebroots-api.herokuapp.com/api/patterns`)
        const response_1 = await response.json()
        const patterns = await response_1.map(resp=> JSON.stringify(resp)).map(str=>JSON.parse(str))
        let patternsWTenses = [];
        [{en: 'Past', he: 'עבר'}, {en: 'Present', he: 'הווה'}, {en: 'Future', he:'עתיד'}]
        .map((tense) => {
                patterns.forEach((pattern, index)=>{
                    let a = duplicateAndAssignTense(tense.en, tense.he, pattern);
                    patternsWTenses.push(a)
                })
            }
        )
        return patternsWTenses;
    }catch (error) {
        console.error("Pattern request error: ", error)
    }
}

export default requestAllPatterns;