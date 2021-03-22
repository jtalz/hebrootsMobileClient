const requestInfinitiveTranslation = async (infinitive) => {
    try {
        const response = await fetch(`https://hebroots-api.herokuapp.com/api/translate?infinitive=${infinitive}`);
        const result = await response.json();
        return result == "" ? "InvalidResponse" : result
    } catch (error) {
        return "InvalidResponse"
    }
}

export default requestInfinitiveTranslation;