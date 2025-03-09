document.addEventListener("DOMContentLoaded", () => {
    
    const username = localStorage.getItem("username");
    if (!username) {
        window.location.href = "/login"; // 🔥 Redirect if not logged in
    } else {
        document.getElementById("users-name").textContent = `${username}`;
        document.getElementById("user-name").textContent = `username: ${username}`;
        
    }
    

    // Logout button
    const logoutButton = document.getElementById('logout-btn');

    // Add an event listener to the button
    logoutButton.addEventListener('click', () => {
        // Clear the username from localStorage
        localStorage.removeItem('username');
        console.log("logged out succesfully✅")
    
        // Redirect to login page after logout
        window.location.href = '/login';
    });



    
    const darkModeToggle = document.getElementById('light-mode');
    const darkModeIcon = document.getElementById('light-mode');
    const body = document.body;

    // Check if dark mode is already enabled (saved in localStorage)
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');  // Apply dark mode
        darkModeIcon.src = './assets/moon.svg'; // Change icon to moon (dark mode)
    } else {
        body.classList.remove('dark-mode'); // Default to light mode
        darkModeIcon.src = './assets/sunny-outline.svg'; // Show sun icon (light mode)
    }

    // Toggle dark mode when the button/icon is clicked
    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');  // Toggle between dark and light mode
        
        // Update localStorage to save the preference
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
            darkModeIcon.src = './assets/moon.svg'; // Change to moon (dark mode)
        } else {
            localStorage.setItem('darkMode', 'disabled');
            darkModeIcon.src = './assets/sunny-outline.svg'; // Change to sun (light mode)
        }
    });
    // Get elements for settings icon and dropdown menu
const settingsIcon = document.getElementById('settings-icon');
const dropdownMenu = document.getElementById('dropdown-menu');

// Toggle dropdown visibility when settings icon is clicked
settingsIcon.addEventListener('click', function (event) {
  event.stopPropagation(); // Prevent event from bubbling up to document
  dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
});

// Close dropdown if clicking anywhere outside the settings icon or dropdown menu
window.addEventListener('click', function (event) {
  if (!settingsIcon.contains(event.target) && !dropdownMenu.contains(event.target)) {
    dropdownMenu.style.display = 'none';
  }
});
async function loadProfilePic() {
    const username = localStorage.getItem("username");  // Get the username from localStorage (assuming the user is logged in)

    if (!username) {
        console.log("No username found in localStorage");
        return;
    }

    try {
        const response = await fetch(`http://localhost:3004/get-profile-pic/${username}`);
        const data = await response.json();

        if (data.imageUrl) {
            // Get the image element and update the source
            const profilePic = document.getElementById("profilePic");
            
            // Cache-busting: Add a timestamp or a unique query string to the URL
            const timestamp = new Date().getTime(); // Get the current time in milliseconds
            profilePic.src = `http://localhost:3004${data.imageUrl}?t=${timestamp}`;  // Append timestamp to force reload
        }
    } catch (error) {
        console.error("Error loading profile picture:", error);
    }
}

// // Call the function when the page loads
loadProfilePic();
function setLanguage(lang) {
    localStorage.setItem("language", lang); // Save language preference

    document.getElementById("user-name").textContent = translations[lang].username + ": " + username;
    document.getElementById("logout-btn").textContent = translations[lang].logout;
    document.querySelector(".list-1 a").textContent = translations[lang].editProfile;
    document.querySelector(".list-2 a").textContent = translations[lang].accessibility;
    document.querySelector(".list-3 a").textContent = translations[lang].privacy;
    document.getElementById("users-name").textContent = translations[lang].welcome + username;
}
const translations = {
    en: {
        username: "Username",
        logout: "Logout",
        editProfile: "Edit Profile",
        accessibility: "Accessibility",
        privacy: "Privacy and Security",
        welcome: "Welcome, ",
    },
    ge: {
        username: "მომხმარებელი",
        logout: "გამოსვლა",
        editProfile: "პროფილის ჩასწორება",
        accessibility: "წვდომის შესაძლებლობა",
        privacy: "კონფიდენციალურობა და უსაფრთხოება",
        welcome: "მოგესალმებით, ",
    }
    
};
document.getElementById("usa").addEventListener("click", () => setLanguage("en"));
document.getElementById("georgia").addEventListener("click", () => setLanguage("ge"));




});