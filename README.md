# fullStackRecipes

Welcome to **fullStackRecipes**, a full-stack recipe manager for browsing, searching, sorting, creating, updating, and deleting recipes. The project contains a React web client and an Express REST API backed by a JSON file. Docker Compose runs both services together.

| Part | Stack | Role |
| --- | --- | --- |
| `client` | React, Vite, Tailwind CSS | Recipe browsing and management interface |
| `api` | Node.js, Express | REST API and JSON-file storage |
| This repository | Docker Compose | Local development and container orchestration |

## 🎯 What the Application Does

- Browse recipes with their category, preparation time, ingredients, instructions, and serving suggestion.
- Search recipes by name and sort them by preparation time.
- Create recipes with a generated image and unique ID.
- View, edit, and delete individual recipes.
- Store recipe data in `api/data.json`.

## 🧰 Technologies Used

- **React 19** and **React Router** for the user interface and routing.
- **Vite** for frontend development and production builds.
- **Tailwind CSS** for styling.
- **TanStack Query** for fetching and managing server state.
- **Axios** for HTTP requests.
- **Node.js** and **Express 5** for the REST API.
- **Docker** and **Docker Compose** for containerized development.
- **Postman** for trying the API endpoints.

## 🚀 Setup & Installation

### Requirements

- Node.js 22 or later and npm for running the services locally.
- Docker Desktop or Docker Engine with the Docker Compose plugin for the containerized setup.

### Option 1 — Run the complete application with Docker

From the repository root, build and start the client and API:

```bash
docker compose up --build
```

Open the client at <http://localhost:8080>. The API is available at <http://localhost:4004>.

Recipe changes are written to `api/data.json` on the host, so they remain available after the containers stop or are rebuilt. Stop the services with `Ctrl+C`, or run `docker compose down` in another terminal. To rebuild after changing application code, run `docker compose up --build` again.

### Option 2 — Run the services locally

Start the API in one terminal:

```bash
cd api
npm install
npm start
```

The API listens on <http://localhost:4004>.

Start the client in a second terminal:

```bash
cd client
npm install
npm run dev
```

Open the Vite URL printed in the terminal (by default, <http://localhost:5173>). The client uses `http://localhost:4004` as its default API URL. To use a different API URL, set `VITE_API_URL` in a `client/.env` file before starting or building the client, for example:

```env
VITE_API_URL=http://localhost:4004
```

## 🐳 Docker Services

The root `docker-compose.yml` starts the following services:

| Service | Container port | Host URL / storage |
| --- | --- | --- |
| Client | `80` | <http://localhost:8080> |
| API | `4004` | <http://localhost:4004> |
| Recipe data | — | `api/data.json` mounted into the API container |

The client image builds the Vite app and serves the static files with Nginx. The API image runs the Express server. The Compose setup exposes the API to the browser because browser requests use the API URL configured at client build time.

## 📡 API Endpoints

All endpoints are prefixed with `/api/v1/recipes`.

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/v1/recipes` | Return all recipes; accepts optional `search` and `order` query parameters. |
| `POST` | `/api/v1/recipes` | Create a recipe. |
| `GET` | `/api/v1/recipes/:id` | Return a recipe by ID. |
| `PATCH` | `/api/v1/recipes/:id` | Update a recipe by ID. |
| `DELETE` | `/api/v1/recipes/:id` | Delete a recipe by ID. |

For the list endpoint, `search` matches recipe names without regard to case. Set `order=asc` to sort by preparation time in ascending order; other values use descending order.

### Example: Create a recipe

```http
POST http://localhost:4004/api/v1/recipes
Content-Type: application/json
```

```json
{
  "recipeName": "Vegetable Pasta",
  "category": "Main Course",
  "recipeTime": "30",
  "servingSuggestion": "Serve with fresh herbs.",
  "ingredients": ["pasta", "tomatoes", "olive oil"],
  "instructions": ["Boil the pasta.", "Prepare the sauce.", "Combine and serve."]
}
```

The API requires `recipeName`, `category`, `recipeTime`, `servingSuggestion`, `ingredients`, and `instructions` when creating a recipe. It generates the recipe ID and image URL.

## 📬 Trying the API with Postman

Import [`RecipesApi.postman_collection.json`](./RecipesApi.postman_collection.json) into Postman. Set the collection variable `BASE_URL` to `http://localhost:4004`, then run a request. The collection includes list, create, get-by-ID, update, and delete requests. Replace `ID` in the individual recipe requests with an existing recipe ID.

## 📁 Project Structure

```text
.
├── api/
│   ├── controllers/       # Recipe request handlers
│   ├── middleware/        # Recipe ID lookup
│   ├── model/             # JSON file read/write operations
│   ├── routes/             # Express API routes
│   ├── data.json           # Recipe data
│   ├── Dockerfile
│   └── server.js
├── client/
│   ├── src/
│   │   ├── api/            # Axios client
│   │   ├── components/     # Shared interface components
│   │   └── pages/          # Recipe pages
│   ├── Dockerfile
│   └── nginx.conf
├── docker-compose.yml
└── RecipesApi.postman_collection.json
```

## 📜 License

No license file is currently included in this repository.
