const express = require("express");
const { connectDB } = require("./db");
const cors = require("cors");
const { ObjectId } = require("mongodb");
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
app.use(express.json());

//GET
app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.get("/agents", async (req, res) => {
	try {
		const data = await db.collection("valorantData").findOne();
		const agents = data.agents.map((agent) => {
			return {
				name: agent.name,
				role: agent.role,
				agent_card: agent.agent_card,
			};
		});
		res.json(agents);
	} catch (error) {
		res.status(500).json({ error: "Database error", details: error.message });
	}
});

app.get("/maps", async (req, res) => {
	try {
		const data = await db.collection("valorantData").findOne();
		const maps = data.maps.map((map) => {
			return {
				name: map.name,
				map_image: map.map_image,
			};
		});
		res.json(maps);
	} catch (error) {
		res.status(500).json({ error: "Database error", details: error.message });
	}
});

// old example from gemini
// all api
app.get("/all", async (req, res) => {
	try {
		const users = await db.collection("valorantData").find().toArray();
		res.json(users);
	} catch (error) {
		res.status(500).json({ error: "Database error" });
	}
});

//TEAM MAKER - GET
app.get("/teams", async (req, res) => {
	try {
		const data = await db.collection("valorantData").findOne();
		const teams = data.teams.map((team) => {
			return {
				composition_id: team.composition_id,
				map_name: team.map_name,
				agent_composition: team.agent_composition,
			};
		});
		res.json(teams);
	} catch (error) {
		res.status(500).json({ error: "Database error", details: error.message });
	}
});

//TEAM MAKER - POST (from Gemini (I just guided him when there was some errors))
app.post("/teams", async (req, res) => {
	try {
		const newTeam = {
			composition_id: Date.now(),
			map_name: req.body.map_name,
			agent_composition: req.body.agent_composition,
		};
		const result = await db
			.collection("valorantData")
			.updateOne(
				{ _id: new ObjectId("69506110938f544b80a93556") },
				{ $push: { teams: newTeam } }
			);
		if (result.modifiedCount === 0) {
			return res
				.status(404)
				.json({ error: "Document not found or no changes made 😥" });
		}
		res.status(201).json({ message: "Team added successfully! 🎉", newTeam });
	} catch (error) {
		res.status(500).json({ error: "Update failed 💀", details: error.message });
	}
});

//TEAM MAKER - DELETE (mix gemini mix myself (with the old version he gave me, I was almost going to delete my whole API 🤣))
app.delete("/teams/comp:id", async (req, res) => {
	try {
		const compositionId = parseInt(req.params.id);

		const result = await db
			.collection("valorantData")
			.updateOne(
				{ _id: new ObjectId("69506110938f544b80a93556") },
				{ $pull: { teams: { composition_id: compositionId } } }
			);

		if (result.modifiedCount === 0) {
			return res.status(404).json({ error: "Team not found 😥" });
		}

		res.json({ message: "Team deleted successfully! 🎉" });
	} catch (error) {
		res.status(500).json({ error: "Delete failed 💀", details: error.message });
	}
});

app.listen(port, () => {
	console.log(`Welcome to ValoHub BACK END 🫠 | Port: ${port}`);
});
