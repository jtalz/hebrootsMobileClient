const validateToken = async (token) => {
    try{
        const response = await fetch("https://hebroots-api.herokuapp.com/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization' : `token ${token}`
            },
        });
        const userCredentials = await response.json()
        return userCredentials._id ? token : undefined;
    }catch(err){
        console.error(error)
    }
}

export default validateToken;