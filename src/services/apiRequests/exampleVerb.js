const requestExampleVerb = async (pattern_id) => {
    try{
        const response = await fetch(`https://hebroots-api.herokuapp.com/api/example?pattern=${pattern_id}`)
        const exampleVerb = await response.json()
        return exampleVerb;
    }catch(err){
        console.error("Example Verb request error: ", error)
    }
}

export default requestExampleVerb;