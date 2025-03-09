document.getElementById("editProfileForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const formData = new FormData();
    const fileInput = document.getElementById("profilePicInput").files[0];

    if (!fileInput) {
        alert("Please select an image first!");
        return;
    }

    formData.append("profilePic", fileInput);

    const username = localStorage.getItem("username"); // Get logged-in username

    try {
        const response = await fetch(`http://localhost:3004/uploads-profile-pic/${username}`, {
            method: "POST",
            body: formData
        });

        if (response.ok) {
            const result = await response.json();
            console.log(result.imageUrl);
            localStorage.setItem("profilePicUrl", result.imageUrl); // Store image URL in localStorage
            window.location.href = "/profile"; // Redirect to profile page
        } else {
            alert("Failed to upload image. Try again!");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
    }
    async function loadProfilePic() {
        const username = localStorage.getItem("username"); // Get logged-in username
        if (!username) return;
    
        try {
            const response = await fetch(`http://localhost:3004/get-profile-pic/${username}`);
            const data = await response.json();
            
            if (data.imageUrl) {
                const imgElement = document.getElementById("profilePic");
                imgElement.src = `http://localhost:3004${data.imageUrl}?t=${new Date().getTime()}`; // Add a timestamp to avoid caching
                console.log(data.imageUrl)
            }
        } catch (error) {
            console.error("Error loading profile picture:", error);
        }
    }
    
    loadProfilePic();
    
    document.getElementById("profilePicInput").addEventListener("change", function(event) {
    const file = event.target.files[0]; // Get the selected file

    if (file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            // Set the preview image source to the selected file's data URL
            document.getElementById("profilePicPreview").src = e.target.result;
        };

        // Read the file as a data URL (to display as preview)
        reader.readAsDataURL(file);
    } else {
        // If no file selected, reset to placeholder image
        document.getElementById("profilePicPreview").src = "./assets/Profile_avatar_placeholder_large.png";
    }
});

document.getElementById("editProfileForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const formData = new FormData();
    const fileInput = document.getElementById("profilePicInput").files[0];

    if (!fileInput) {
        alert("Please select an image first!");
        return;
    }

    formData.append("profilePic", fileInput);

    const username = localStorage.getItem("username"); // Get logged-in username

    try {
        const response = await fetch(`http://localhost:3004/uploads-profile-pic/${username}`, {
            method: "POST",
            body: formData
        });

        if (response.ok) {
            const result = await response.json();
            localStorage.setItem("profilePicUrl", result.imageUrl); // Store image URL in localStorage
            window.location.href = "/profile"; // Redirect to profile page
        } else {
            alert("Failed to upload image. Try again!");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
    }
});document.getElementById("profilePicInput").addEventListener("change", function(event) {
    const file = event.target.files[0]; // Get the selected file

    if (file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            // Set the preview image source to the selected file's data URL
            document.getElementById("profilePreview").src = e.target.result;
        };

        // Read the file as a data URL (to display as preview)
        reader.readAsDataURL(file);
    } else {
        // If no file selected, reset to placeholder image
        document.getElementById("profilePreview").src = "./assets/Profile_avatar_placeholder_large.png";
    }
});

document.getElementById("editProfileForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const formData = new FormData();
    const fileInput = document.getElementById("profilePicInput").files[0];

    if (!fileInput) {
        alert("Please select an image first!");
        return;
    }

    formData.append("profilePic", fileInput);

    const username = localStorage.getItem("username"); // Get logged-in username

    try {
        const response = await fetch(`http://localhost:3004/uploads-profile-pic/${username}`, {
            method: "POST",
            body: formData
        });

        if (response.ok) {
            const result = await response.json();
            localStorage.setItem("profilePicUrl", result.imageUrl); // Store image URL in localStorage
            window.location.href = "/profile"; // Redirect to profile page
        } else {
            alert("Failed to upload image. Try again!");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
    }
});

});


