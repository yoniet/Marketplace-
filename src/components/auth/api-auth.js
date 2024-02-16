const address = 'http://localhost:3000/auth'

const signin = async (user) => {
    try {
        let response = await fetch('http://localhost:3000/auth/signin/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(user)
        })

        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

const signout = async () => {
    try {
        let response = await fetch('http://localhost:3000/auth/signout/', {method: 'GET'})
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

export {signin, signout}