[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=21928836)

# ValoHub - Back-end ✨

ValoHub is a Node.js + Express REST API that powers a Valorant team builder.
It provides agents, maps, and saved team compositions stored in MongoDB,
with full CRUD logic for team management.

Website url: [https://web2-course-project-back-end-raicus.onrender.com](ValoHub)

## All API routes:

### GET

- **GET/**  
  Returns a simple "Hello World" message (API health check).

- **GET/agents**  
  Returns a list of Valorant agents (name, role, agent card).

- **GET/maps**  
  Returns all Valorant maps with their images.

- **GET/teams**  
  Returns all saved team compositions.

- **GET/all**  
  Returns the full MongoDB collection.

---

### POST

- **POST/teams**  
  Adds a new team composition to the database.

---

### DELETE

- **DELETE/teams/comp:id**  
  Deletes a team using its `composition_id`.

---

## Sources 🗃️

- [ChatGPT.com - MongoDB](https://chatgpt.com/share/69501ead-5648-8011-9770-e641a4bb7cf6) used in:
  -- db.js
  -- server.js
- []
