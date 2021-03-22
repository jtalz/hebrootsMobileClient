const requestRandomVerb = async (pattern_id) => {
    try {
        const response = await fetch(`https://hebroots-api.herokuapp.com/api/random?pattern=${pattern_id}`);
        const result = await response.json();
        return result.pattern == "" ? "InvalidResponse" : result
    } catch (error) {
        return "InvalidResponse"
    }
}

export default requestRandomVerb;