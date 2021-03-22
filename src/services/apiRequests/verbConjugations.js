export const requestVerbConjugations = async (value) => {
    try{
        const response = await fetch(`https://hebroots-api.herokuapp.com/api/search?v=${value}`)
        const result = await response.json();
        return result.pattern == "" ? "InvalidResponse" : result
    } catch (error) {
        console.error("Error:", error);
    }
}

export default requestVerbConjugations;