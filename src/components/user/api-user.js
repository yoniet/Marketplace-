const address = 'http://localhost:3000/api/users/'

const arr = []

export const create = async (user) => {
    try {
        let response = await fetch('http://localhost:3000/api/users/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
    return arr;
}



export const list = async (signal) => {

    try {
        let response = await fetch('http://localhost:3000/api/users/', {
            method: 'GET',
            signal: signal,
        })

        return await response.json()
    } catch (err) {
        console.log(err)
    }
    return arr;
}

export const read = async (params, credentials, signal) => {
    
    try {
        let response = await fetch('http://localhost:3000/api/users/' + params.userId, {
            method: 'GET',
            signal: signal,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            }
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
    return arr;
}

export const update = async (params, credentials, user) => {
    try {
        let response = await fetch('http://localhost:3000/api/users/' + params.userId, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            },
            body: JSON.stringify(user)
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

export const remove = async (params, credentials) => {
    try {
        let response = await fetch('http://localhost:3000/api/users/' + params.userId, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            }
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}