
document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ login.js loaded!");

    const loginForm = document.getElementById("loginform");

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password-input").value;

        console.log("🔍 Logging in with:", username, password);

        try {
            const response = await fetch("/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            console.log("🔍 Server Response:", data); // ✅ Debugging log

            if (response.ok && data.success) {
                alert(`✅ Login successful! Welcome, ${data.username}`);
                localStorage.setItem("username", data.username); // ✅ Store username for dashboard
                window.location.href = "/profile"; // ✅ Redirect to dashboard
            } else {
                alert(`❌ Error: ${data.message}`);
            }
        } catch (error) {
            console.error("❌ Login Error:", error);
            alert("❌ Failed to login. Please try again.");
        }
    });
    document.getElementById("show-password").addEventListener("click", () => {
        const passwordField = document.getElementById("password-input");  // Get password input
        const toggleIcon = document.getElementById("show-password"); // Get the eye icon
    
        if (passwordField.type === "password") {
            passwordField.type = "text";  // Show password
            toggleIcon.src = "./assets/eye.svg";  // Switch to open eye
        } else {
            passwordField.type = "password";  // Hide password
            toggleIcon.src = "./assets/eye-off.svg";  // Switch back to closed eye
        }
    });
    
});
