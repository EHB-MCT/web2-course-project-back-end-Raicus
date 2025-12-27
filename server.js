const express = require("express");
const { connectDB } = require("./db");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;
let db;

connectDB()
	.then((database) => {
		db = database;
		console.log("Database ready to use!");
	})
	.catch((err) => {
		console.error("Failed to connect to database", err);
	});

app.use(cors());

app.get("/", (req, res) => {
	res.send("Hello World!");
});

// example (will be deleted later)
app.get("/api/test", async (req, res) => {
	try {
		const users = await db.collection("users").find().toArray(); // testing find() for filter later (very interesting)
		res.json(users);
	} catch (error) {
		res.status(500).json({ error: "Database error" });
	}
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
