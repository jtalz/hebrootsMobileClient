//change url links to /api/link after next node deployment
export const requestRandomVerbOfPattern = async (pattern_id) => {
    try {
        const response = await fetch(`https://hebroots-api.herokuapp.com/api/random?pattern=${pattern_id}`);
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

export const requestInfinitiveTranslation = async (infinitive) => {
    try {
        const response = await fetch(`https://hebroots-api.herokuapp.com/api/translate?infinitive=${infinitive}`);
        const response_1 = await response.json();
        if (response_1 == "") {
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
        const response = await fetch(`https://hebroots-api.herokuapp.com/api/search?v=${value}`)
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
        const response = await fetch(`https://hebroots-api.herokuapp.com/api/patterns`)
        const response_1 = await response.json()
        const patterns = await response_1.map(resp=> JSON.stringify(resp)).map(str=>JSON.parse(str))
        return patterns;
    }catch (error) {
        console.error("Pattern request error: ", error)
    }
}

export const requestExampleVerb = async (pattern_id) => {
    try{
        const response = await fetch(`https://hebroots-api.herokuapp.com/api/example?pattern=${pattern_id}`)
        const exampleVerb = await response.json()
        return exampleVerb;
    }catch(err){
        console.error("Example Verb request error: ", error)
    }
}

export const requestRegister = async ({email, password, confirmPassword, firstName}) => {
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
        /* const userCredentials = await response.json()
        return userCredentials.token ? token :  */
    }catch(err){
        console.error("Error signing up: ", err)
    }
}

export const requestLogin = async ({email, password}) => {
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

export const validateToken = async (token) => {
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

export const requestUserSettings = async (token, signOut) => {
    const userSettings = await fetch("https://hebroots-api.herokuapp.com/api/user/profile", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization' : `token ${token}`
        }
    })
        .then(res => res.json())
        .then(res => {
            const profileInfo = res.profileInfo;
            return {
                firstName: profileInfo.firstName,
                email: profileInfo.email,
                options: {
                    name: 'My Account',
                    items: [
                    {
                      name: "account type",
                      status: profileInfo.settings.accountType,
                      type: "read-only"
                    },
                    {
                      name: "daily reminder",
                      status: profileInfo.settings.dailyReminder,
                      type: "toggle"
                    },
                    {
                      name: "teaching language",
                      status: profileInfo.settings.lang,
                      type: "read-only"
                    },
                    {
                        name: "date joined",
                        status: profileInfo.joined,
                        type: "read-only"
                      },
                    {
                        name: "change password",
                        type: "pressable",
                        onPress: "navigate to changepasswordScreen"
                    },
                    {
                        name: "logout",
                        type: "pressable",
                        onPress: ()=>signOut()
                    }
                  ]}
                }
        })
        .catch((err) => {console.log(err);return []})
    return userSettings;
}