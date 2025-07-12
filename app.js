const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("./db");
const app = express(); 
const cors = require('cors');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Enable CORS for all origins (for development)
app.use(cors({
  origin: 'http://localhost:5173', // your frontend origin
  credentials: true
}));

app.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
console.log(username, email, password);
    if (!username || !email || !password) {
        return res.json({ message: "All fields are required!" });
    }

    // Check if email already exists
    const checkEmailQuery = "SELECT * FROM users WHERE email = ?";
    db.query(checkEmailQuery, [email], async (err, results) => {
        if (err) {
            console.error("❌ MySQL Error:", err);
            return res.json({ message: "Database error. Try again later." });
        }

        if (results.length > 0) {
            return res.json({ message: "❌ Email already registered! Use another email." });
        }

        // ✅ Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10); // 10 = salt rounds

        // ✅ Insert new user with hashed password
        const insertQuery = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
        db.query(insertQuery, [username, email, hashedPassword], (err, result) => {
            if (err) {
                console.error("❌ MySQL Insert Error:", err);
                return res.json({ message: "Error registering user" });
            }
            res.json({ message: "✅ Registration successful! You can now log in." });
        });
    });
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ message: "All fields are required!" });
    }

    // ✅ Check if the user exists
    const checkUserQuery = "SELECT * FROM users WHERE email = ?";
    db.query(checkUserQuery, [email], async (err, results) => {
        if (err) {
            console.error("❌ MySQL Error:", err);
            // return res.json({ message: "Database error. Try again later." });
           return res.status(203).json({ message: "Database error. Try again later." });
        }

        if (results.length === 0) {
            // return res.json({ message: "❌ don't have an account!" });
            return res.status(203).json({ message: "don't have an account!" });
        }

        const user = results[0];

        // ✅ Compare hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            // return res.json({ message: "❌ Invalid credentials!" });
            return res.status(203).json({ message: "Invalid credentials!" });
        }

        // ✅ Login successful
        // res.json({ message: "✅ Login successful!", user: { id: user.id, username: user.name } });
        res.status(200).json({ message: "Login successful", user: { id: user.id, username: user.name } });
    });
});

app.post("/question", (req, res) => {
    const { id, title, description, tags } = req.body;
    const query = "INSERT INTO questions (user_id, title, description, tags) VALUES (?,?, ?, ?)";
    db.query(query, [id,title, description, tags], (err, result) => {
        if (err) {
            console.error("❌ MySQL Error:", err);
            return res.json({ message: "Database error. Try again later." });
        }
        res.json({ message: "✅ Question added successfully!" });
    });
})
app.get("/displayQ", (req, res) => {
    const query = "SELECT * FROM questions";
    db.query(query, (err, results) => {
        if (err) {
            console.error("❌ MySQL Error:", err);
    
            // return res.json({ message: "Database error. Try again later." });
            return res.status(500).json({ message: "Database error. Try again later." });

        }
        res.json(results);
    });
});





app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
})