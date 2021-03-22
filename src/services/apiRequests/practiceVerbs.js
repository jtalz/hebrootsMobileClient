const requestPracticeVerbs = async () => {
    try{
        const response = await fetch(`https://hebroots-api.herokuapp.com/api/practice`);
        return await response.json()
    }catch(err){
        console.log('err', err)
        return err;
    }
}

export default requestPracticeVerbs;