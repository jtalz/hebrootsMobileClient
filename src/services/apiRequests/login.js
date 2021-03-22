const requestLogin = async ({email, password}) => {
    try{
        const response = await fetch("https://hebroots-api.herokuapp.com/login", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        });
        const userCredentials = await response.json()
        return userCredentials
    }catch(err){
        console.error("Error signing up: ", err)
    }
}

export default requestLogin;