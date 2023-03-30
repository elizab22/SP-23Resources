import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, 
    signInWithEmailAndPassword, signOut, updateEmail } from "firebase/auth";
import { auth, firestore } from "./firebase-config";
import { doc, setDoc } from "firebase/firestore";

// user is an object with user info and userRef is a DocumentReference to the user object
let user;
let userRef;

/**
 * Registers a user with the database using their email and password
 * @param {String} email 
 * @param {String} password 
 */
const register = async (email, password) => {
    // create user and update users collection with the new user
    await createUserWithEmailAndPassword(auth, email, password)
        .then(userCredentials => {
            user = userCredentials.user;
            userRef = doc(firestore, "users", user.uid);
            setDoc(userRef, {
                email: email,
                gardens: []
            })
            console.log(user.email)
        }).catch(error => {
            // alert user appropriately if there are errors
            let errorStr = error.code.split("/")[1].replaceAll("-", " ")
            alert("Error: " + errorStr)
        })
}

/**
 * Logs in the user using their email and password
 * @param {String} email 
 * @param {String} password 
 */
const login = async (email, password, onLogin) => {
    // logs in user using email and password
    await signInWithEmailAndPassword(auth, email, password)
    .then(userCredentials => {
        user = userCredentials.user;
        userRef = doc(firestore, "users", user.uid);
        console.log(user.email)
        onLogin()
    }).catch(error => {
        // if there is an error alert the user
        alert("Incorrect email or password")
    })
}

/**
 * Returns an event listener that triggers when the auth state is changed and calls the
 * goToHome function when the auth state is changed and the user exists, which means
 * the user is logged in.
 * @param {Function} goToHome a function that is executed when the auth state change event
 * is triggered and the user is logged in. Will be used to redirect user to home page if they
 * are already logged in and don't need to log in again
 * @returns 
 */
const authEventListener = (goToHome) => onAuthStateChanged(auth, user => {
    if (user) {
        user = user
        userRef = doc(firestore, "users", user.uid)
        goToHome();
    }
})

/**
 * Sends password reset link to user to change their password. Firebase takes care of all
 * the logic of updating the dabatase and sending the email
 * @param {String} email 
 */
const changePassword = async (email) => {
    // sends password reset link to user's email
    await sendPasswordResetEmail(auth, email)
    .then(() => {
        alert("The reset link has been sent!")
    })
    .catch(error => {
        // if the email doesn't exist in the database alert the user
        if (error.code === "auth/missing-email") {
            alert("Email was not found")
        }
    })
}

/**
 * Logs out the user
 */
const logout = async () => {
    await signOut(auth)
}

/**
 * Takes in the user's new email and updates their account accordingly. This must be called
 * after the user is logged in
 * @param {String} newEmail 
 */
const changeEmail = async (newEmail) => {
    await updateEmail(user, newEmail)
}

export { register, login, authEventListener, changePassword, logout, changeEmail, user, userRef }