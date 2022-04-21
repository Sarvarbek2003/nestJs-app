let backendApi = 'http://localhost:3000'

async function req (path, method, body) {
    let response = await fetch(backendApi+path,{
        method,
        headers: {
            "Content-Type":"Application/json"
        },
        body:(body instanceof FormData) ? body : JSON.stringify(body)
    })
    if(response){
        return await response.json();
    }
    return response
}

function createElements(...array) {
    return array.map(el => document.createElement(el))
}