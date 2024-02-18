const address = "http://localhost:3000";

export const create = async (params, credentials, shop) => {
    try {
        let response  = await fetch('http://localhost:3000/api/shops/by/' + params.userId, {
            method: 'POST',
            headers: {
                'Accept' : 'application.json',
                'Authorization': 'Bearer ' + credentials.t
            },

            body: shop
        })
        return response.json()
    } catch (error) {
        console.log(error)
    }
};

export const list = async (signal) => {
  try {
    let response = await fetch('http://localhost:3000/api/shops', {
      method: "GET",
      signal: signal,
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
};
