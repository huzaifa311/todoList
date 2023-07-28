import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBDKqn64ZCViCW2wwC-39qSSpwNx3NRwhk",
    authDomain: "todo-app-c551b.firebaseapp.com",
    projectId: "todo-app-c551b",
    storageBucket: "todo-app-c551b.appspot.com",
    messagingSenderId: "670237277297",
    appId: "1:670237277297:web:aec41b689c238fcb8e6fd0"
};

// // Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

const signupBtn = document.querySelector("#signUpBtn")
signupBtn.addEventListener("click", signUp)

async function signUp(e) {
    try {
        const fullName = document.getElementById("fullName").value;
        const email = document.getElementById("signupEmail").value;
        const password = document.getElementById("signupPassword").value;

        const userAuth = await createUserWithEmailAndPassword(auth, email, password)
        console.log(userAuth.user.uid);
        const uid = userAuth.user.uid
        const userObj = {
            fullName,
            email: email,
            accountActivate: true,
            uid
        }
        const userRef = doc(db, "users", uid);
        const userDB = await setDoc(userRef, userObj)
        console.log("userDB", userDB);
        console.log("userObj", userObj);

        window.location.assign("/todoApp.html")
    }
    catch (error) {
        console.log("error", error.message);
    }

}

const loginBtn = document.querySelector("#loginBtn")
loginBtn.addEventListener("click" , login)
async function login(e) {
    try {
        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;
        console.log("email", email , "password", password);
        const userLogin = await signInWithEmailAndPassword(auth, email , password)
        console.log(userLogin);
        localStorage.setItem("userUid", userLogin.user.uid)
        window.location.replace("/todoApp.html")

    }
    catch (error) {
        console.log("error", error.message);
    }

}