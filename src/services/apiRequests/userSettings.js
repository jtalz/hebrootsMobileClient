const requestUserSettings = async (token, signOut) => {
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

export default requestUserSettings;