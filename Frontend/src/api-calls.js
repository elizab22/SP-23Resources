

const init = async () => {
    await fetch(`http://127.0.0.1:5001/init`);
}

const getPlant = async (id, region) => {
    const results = await fetch(`http://127.0.0.1:5001/get-plant?id=${id}&region=${region}`)
    return await results.json();
}

const searchPlants = async (searchParams) => {
    const results = await fetch('http://127.0.0.1:5001/search', {
        method: "POST",
        body: JSON.stringify(searchParams),
        headers: {
            "Content-Type": "application/json"
        }
    })
    return await results.json();
}

export {
    getPlant, init, searchPlants
}