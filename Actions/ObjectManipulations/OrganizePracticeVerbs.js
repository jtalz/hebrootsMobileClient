const organizeVerbsByType = (verbs) => {
    let organizedVerbs = {
        A: {
            name: "Pa'al",
            pattern: 'A',
            verbs: []
        },
        B: {
            name: "Nif'al",
            pattern: 'B',
            verbs: []
        },
        C: {
            name: "Pi'el",
            pattern: 'C',
            verbs: []
        },
        E: {
            name: "Hitpa'el",
            pattern: 'E',
            verbs: []
        },
        F: {
            name: "Hef'il",
            pattern: 'F',
            verbs: []
        }
    }
    verbs.forEach((verb, index)=>{
        organizedVerbs[verb.pattern.pattern].verbs.push(verb)
    })
    return organizedVerbs
}

export default organizeVerbsByType;