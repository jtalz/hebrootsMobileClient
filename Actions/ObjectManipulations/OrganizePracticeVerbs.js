const organizeVerbsByType = (verbs) => {
    let organizedVerbs = {
        A: {
            name: "Pa'al",
            name_he: "פָּעַל",
            pattern: 'A',
            verbs: []
        },
        B: {
            name: "Nif'al",
            name_he: "נִפְעַל",
            pattern: 'B',
            verbs: []
        },
        C: {
            name: "Pi'el",
            name_he: "פִּיעֵל",
            pattern: 'C',
            verbs: []
        },
        E: {
            name: "Hitpa'el",
            name_he: "הִתְפַּעֵל",
            pattern: 'E',
            verbs: []
        },
        F: {
            name: "Hef'il",
            name_he: "הִפְעִיל",
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