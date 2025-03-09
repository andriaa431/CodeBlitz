
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const User = require("./models/user"); // ✅ Make sure this file exists!
const cors = require("cors")
const multer = require("multer");

const app = express();
const PORT = 3004;

// ✅ MongoDB Connection (Fix Timeout Issue)
const MONGO_URI = "mongodb://127.0.0.1:27017/mydatabase"; // 🔹 Replace with your DB name
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("✅ Connected to MongoDB!");
}).catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
});

// ✅ Middleware
app.use(express.json());
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// ✅ Login Route

app.get("/public/login", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/login.html"));
});
app.get("/profile", (req, res) => {
    res.sendFile(__dirname + "/public/profile.html");
});
app.get("/edit-profile", (req, res) => {
    res.sendFile(__dirname + "/public/edit-profile.html")
})


app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ username }); // ✅ Check if user exists
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        if (user.password !== password) { // ⚠️ Change this if using hashed passwords
            return res.status(400).json({ message: "Incorrect password" });
        }

        console.log("✅ Login successful:", username);
        return res.json({ success: true, message: "Login successful", username });
    } catch (error) {
        console.error("❌ Server Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Set up multer storage

// Set up multer storage to save files in the "uploads" folder
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");  // Make sure it's 'uploads', not 'assets'
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "_" + file.originalname); // Unique filename
    }
});

const upload = multer({ storage: storage });



// API to Upload Profile Picture
// app.post("/uploads-profile-pic/:username", upload.single("profilePic"), async (req, res) => {
//     if (!req.file) {
//         return res.status(400).json({ message: "No file uploaded!" });
//     }

//     const imageUrl = `/uploads/${req.file.filename}`;  // Fixed typo`
//     const { username } = req.params;

//     try {
//         // Update user's profile picture in the database
//         const user = await User.findOneAndUpdate(
//             { username },
//             { profilePic: imageUrl },
//             { new: true }
//         );

//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         res.json({ message: "Profile picture updated!", imageUrl });
//     } catch (error) {
//         res.status(500).json({ message: "Server error", error });
//     }
// });

// // API to Get User's Profile Picture
app.get("/get-profile-pic/:username", async (req, res) => {
    const { username } = req.params;
    
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ imageUrl: user.profilePic });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
// API to Upload Profile Picture
app.post("/uploads-profile-pic/:username", upload.single("profilePic"), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded!" });
    }

    const imageUrl = `/uploads/${req.file.filename}`;  // Fixed typo
    const { username } = req.params;

    try {
        // Update user's profile picture in the database
        const user = await User.findOneAndUpdate(
            { username },
            { profilePic: imageUrl },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "Profile picture updated!", imageUrl: `/uploads/${req.file.filename}` });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});



// ✅ Start the server
app.listen(PORT, () => console.log(`🔥 Server running on http://localhost:${PORT}`));
