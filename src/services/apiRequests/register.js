const requestRegister = async ({email, password, confirmPassword, firstName}) => {
    try{
       return await fetch("https://hebroots-api.herokuapp.com/register", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "email": email,
                "password": password,
                "confirmPassword": confirmPassword,
                "firstName": firstName
            })
        })
            .then(res => res.json())
            .then(res => res.token ? { token: res.token } : res)
    }catch(err){
        console.error("Error signing up: ", err)
    }
}

export default requestRegister;