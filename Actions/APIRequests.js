export const requestRandomVerbOfPattern = async (pattern_id) => {
    try {
        const response = await fetch(`https://hebroots-api.herokuapp.com/search/random?pattern=${pattern_id}`);
        const response_1 = await response.json();
        if (response_1.pattern == "") {
            console.log('We didnt recieve a valid response');
            return "InvalidResponse";
        } else {
            return response_1;

        }
    } catch (error) {
        console.error("Error:", error);
    }
}

export const requestVerbFromValue = async (value) => {
    try{
        const response = await fetch(`https://hebroots-api.herokuapp.com/search?v=${value}`)
        const response_1  = await response.json();
        if (response_1.pattern == "") {
            console.log('We didnt recieve a valid response');
            return "InvalidResponse";
        } else {
            console.log('Valid response recieved');
            return response_1;
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

export const requestAllPatterns = async () => {
    try{
        const response = await fetch(`https://hebroots-api.herokuapp.com/search/patterns`)
        const response_1 = await response.json()
        const patterns = await response_1.map(resp=> JSON.stringify(resp)).map(str=>JSON.parse(str))
        return patterns;
    }catch (error) {
        console.error("Pattern request error: ", error)
    }
}

export const requestExampleVerb = async (pattern_id) => {
    try{
        const response = await fetch(`https://hebroots-api.herokuapp.com/search/exampleVerb?pattern=${pattern_id}`)
        const exampleVerb = await response.json()
        return exampleVerb;
    }catch(err){
        console.error("Example Verb request error: ", error)
    }
}