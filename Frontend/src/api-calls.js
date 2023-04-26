
// call init to initialize the api 
// needs to be called before any other calls can be made
const init = async () => {
    await fetch(`http://127.0.0.1:5001/init`);
}

// get a plant based on id and region
const getPlant = async (id, region) => {
    const results = await fetch(`http://127.0.0.1:5001/get-plant?id=${id}&region=${region}`)
    return await results.json();
}

// search plants with any combination of searchParams
const searchPlants = async (searchParams) => {
    const results = await fetch('http://127.0.0.1:5001/search', {
        method: "POST",
        body: JSON.stringify({ ...searchParams, region: 0}),
        headers: {
            "Content-Type": "application/json"
        }
    })
    return await results.json()
}

export {
    getPlant, init, searchPlants
}