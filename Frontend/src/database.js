import { doc, addDoc, updateDoc, arrayUnion, collection, deleteDoc, arrayRemove, getDoc } from "firebase/firestore";
import { userRef, user } from "./authentication";
import { firestore } from "./firebase-config";
import { storage } from "./firebase-config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

/**
 * Takes in garden paramaters and creates a garden
 * @param {String} name
 * @param {Boolean} isIndoor 
 * @param {Number} length 
 * @param {Number} width 
 * @param {Number} region (numbers 0 through 7 indicating what region the user is in) 
 * @returns the id of the newly created garden
 */
const createGarden = async (name, isIndoor, length, width, region, imageAssets) => {
    // create garden in database
    let url = "";
    if (imageAssets) {
        url = await uploadImage(imageAssets[0].uri)
    }
    const gardenRef = await addDoc(collection(firestore, "gardens"), {
        isIndoor: isIndoor,
        length: length,
        width: width,
        region: region,
        plants: [],
        name: name,
        timestamp: Date.now(),
        picture: url
    })

    // update user's gardens field with the id of newly created garden
    await updateDoc(userRef, {
        gardens: arrayUnion(gardenRef.id)
    })
    return gardenRef.id
}

/**
 * Deletes a garden from the database, takes in the id of the garden to delete
 * @param {String} gardenId the id of the garden being deleted
 */
const deleteGarden = async (gardenId) => {

    // delete garden document
    const gardenRef = doc(firestore, "gardens", gardenId);
    await deleteDoc(gardenRef);

    // delete garden id reference in user's gardens field
    await updateDoc(userRef, {
        gardens: arrayRemove(gardenId)
    })
}

/**
 * Overwrites previously saved plants in this garden and replaces it with the new plants
 * array. Ideally this will be called when the user presses a save button or something on the 
 * frontend. Don't call this every time the user updates the garden by dragging and dropping
 * plants, as it'll cause lots of redundant operations
 * @param {Object{}} plants a dictionary of plant objects, each plant object must have the following
 * format: id: {x: x_value, y: y_value}
 * @param {String} gardenId the id of the garden that plants are being added to
 */
const savePlantsToGarden = async (gardenId, plants, width, height) => {
    const gardenRef = doc(firestore, "gardens", gardenId);

    // delete previously saved plants and clear the plants field in the garden object
    const prevPlants = await (await getDoc(gardenRef)).data().plants
    if (prevPlants.length > 0) {
        await updateDoc(gardenRef, {
            plants: []
        })
    }

    // save the new plants into the database
    for (const [id, value] of Object.entries(plants)) {
        const plantObj = {
            plant_id: id,
            x_value: value.x,
            y_value: value.y
        }
        await updateDoc(gardenRef, {
            plants: arrayUnion(plantObj),
            width: width,
            length: height
        })
    }
}

/**
 * Gets and returns an array of all the user's gardens
 * @returns an array of the user's gardens with each item in the array being an object 
 */
const getUserGardens = async () => {
    const gardenIds = await (await getDoc(userRef)).data().gardens
    let gardens = []
    for (const gardenId of gardenIds) {
        const gardenData = (await getDoc(doc(firestore, "gardens", gardenId))).data()
        gardens.push({...gardenData, id: gardenId})
    }
    return gardens;
}

/**
 * Gets the data for the garden specified by the gardenId
 * @param {String} gardenId 
 * @returns an object that contains all the data for one specific garden
 */
const getGarden = async (gardenId) => {
    return {...(await getDoc(doc(firestore, "gardens", gardenId))).data(), id: gardenId}
}

const uploadImage = async (filePath, email) => {
    const response = await fetch(filePath);
    const blobFile = await response.blob();

    const reference = ref(storage, "profiles/" + email);
    const result = await uploadBytes(reference, blobFile)
    const url = await getDownloadURL(result.ref)
    return url;
}

export { uploadImage, createGarden, deleteGarden, savePlantsToGarden, getUserGardens, getGarden }