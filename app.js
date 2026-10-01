// Your web app's Firebase configuration object structure
const firebaseConfig = {
  apiKey: "AIzaSyChh8tjwuJ1GMrbzXSl5hAEfxAgwcdeU7c",
  authDomain: "roblox-5937c.firebaseapp.com",
  databaseURL: "https://roblox-5937c-default-rtdb.firebaseio.com",
  projectId: "roblox-5937c",
  storageBucket: "roblox-5937c.firebasestorage.app",
  messagingSenderId: "724711333714",
  appId: "1:724711333714:web:b0f3a6b6212798c7a6e48b"
};

// Initialize Firebase Core Compat layer natively
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

let isSignUpMode = false;

document.addEventListener("DOMContentLoaded", () => {
    // Structural layout elements references hooks
    const sidebar = document.getElementById("sidebar");
    const sidebarToggle = document.getElementById("sidebar-toggle");
    
    // Auth interface interaction variables mapping
    const authModal = document.getElementById("auth-modal");
    const loginNavBtn = document.getElementById("nav-login-btn");
    const signupNavBtn = document.getElementById("nav-signup-btn");
    const closeModalBtn = document.getElementById("close-modal-btn");
    const authForm = document.getElementById("auth-form");
    const logoutBtn = document.getElementById("logout-btn");
    const switchAuthLink = document.getElementById("switch-auth-link");
    
    // UI Notification variables labels 
    const modalTitle = document.getElementById("modal-title");
    const submitAuthBtn = document.getElementById("submit-auth-btn");
    const switchAuthPrompt = document.getElementById("switch-auth-prompt");
    const authErrorMsg = document.getElementById("auth-error-msg");
    
    const authControls = document.getElementById("auth-controls");
    const loggedInProfile = document.getElementById("logged-in-profile");
    const usernameDisplay = document.getElementById("username-display");
    const welcomeMessage = document.getElementById("welcome-message");

    // Sidebar mechanics controller handler
    sidebarToggle.addEventListener("click", () => {
        sidebar.classList.toggle("hidden");
    });

    // --- Modal View State Managers ---
    function openModal(signUpStyle = false) {
        isSignUpMode = signUpStyle;
        authErrorMsg.style.display = "none";
        authModal.classList.remove("hidden");
        updateModalUI();
    }

    function closeModal() {
        authModal.classList.add("hidden");
        authForm.reset();
    }

    function updateModalUI() {
        if (isSignUpMode) {
            modalTitle.textContent = "Create an Account";
            submitAuthBtn.textContent = "Sign Up";
            switchAuthPrompt.textContent = "Already have an account?";
            switchAuthLink.textContent = "Log In";
        } else {
            modalTitle.textContent = "Log In to Roblox";
            submitAuthBtn.textContent = "Log In";
            switchAuthPrompt.textContent = "Don't have an account?";
            switchAuthLink.textContent = "Sign Up";
        }
    }

    // Assign modular interface open and close event listeners
    loginNavBtn.addEventListener("click", () => openModal(false));
    signupNavBtn.addEventListener("click", () => openModal(true));
    closeModalBtn.addEventListener("click", closeModal);
    
    switchAuthLink.addEventListener("click", (e) => {
        e.preventDefault();
        isSignUpMode = !isSignUpMode;
        authErrorMsg.style.display = "none";
        updateModalUI();
    });

    // --- Processing Authentication Events via Firebase Database Backend ---
    authForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const email = document.getElementById("auth-email").value;
        const password = document.getElementById("auth-password").value;
        
        authErrorMsg.style.display = "none";

        if (isSignUpMode) {
            // Firebase Action: Account Registration
            auth.createUserWithEmailAndPassword(email, password)
                .then(() => {
                    closeModal();
                })
                .catch((error) => {
                    authErrorMsg.textContent = error.message;
                    authErrorMsg.style.display = "block";
                });
        } else {
            // Firebase Action: User Log In validation execution
            auth.signInWithEmailAndPassword(email, password)
                .then(() => {
                    closeModal();
                })
                .catch((error) => {
                    authErrorMsg.textContent = error.message;
                    authErrorMsg.style.display = "block";
                });
        }
    });

    // Global Log out Action execution trigger handler
    logoutBtn.addEventListener("click", () => {
        auth.signOut();
    });

    // --- Firebase Live Authentication Observer Session Engine ---
    auth.onAuthStateChanged((user) => {
        if (user) {
            // State: User successfully logged into experience session framework
            usernameDisplay.textContent = user.email;
            welcomeMessage.innerHTML = `Welcome back, <strong>${user.email}</strong>!<br><small>Firebase UID: ${user.uid}</small>`;
            
            authControls.classList.add("hidden");
            loggedInProfile.classList.remove("hidden");
        } else {
            // State: Guest/Logged Out framework conditions parameters
            welcomeMessage.textContent = "Welcome to Roblox! Please log in or sign up using the panel.";
            authControls.classList.remove("hidden");
            loggedInProfile.classList.add("hidden");
        }
    });
});
