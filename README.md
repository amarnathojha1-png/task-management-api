# Task Management REST API

A REST API built using Node.js, Express 5, and Joi. It supports creating, viewing, updating, and deleting tasks.

## Requirements

- Node.js
- npm

## Installation

Clone the repository and enter the project directory.

```bash
npm install
```

Create a local `.env` file using `.env.example` as a reference.

Configure the environment variables:

```dotenv
PORT=3000
NODE_ENV=development
```

## Start the application

```bash
npm start
```

For development, use:

```bash
npm run dev
```

The API will run at `http://localhost:3000`.

## Run automated tests

```bash
npm test
```

## API Endpoints

Base URL: `/api/v1/tasks`

| Method | Endpoint | Description | Success status |
|---|---|---|---|
| POST | `/api/v1/tasks` | Create a task | 201 |
| GET | `/api/v1/tasks` | Get all tasks | 200 |
| GET | `/api/v1/tasks/:id` | Get a task by ID | 200 |
| PATCH | `/api/v1/tasks/:id` | Update a task | 200 |
| DELETE | `/api/v1/tasks/:id` | Delete a task | 204 |

## Task fields

- `id`: Generated string identifier.
- `title`: Required non-empty string.
- `description`: Optional string.
- `status`: `pending`, `in_progress`, or `completed`.
- `priority`: `low`, `medium`, or `high`.
- `createdAt`: Creation timestamp.
- `updatedAt`: Last update timestamp.

Default status is `pending`, and default priority is `medium`.

## Example: Create a task

```bash
curl -i -X POST http://localhost:3000/api/v1/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Learn Express","priority":"high"}'
```

## Example: Get all tasks

```bash
curl -i http://localhost:3000/api/v1/tasks
```

## Example: Update a task

```bash
curl -i -X PATCH http://localhost:3000/api/v1/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"status":"completed"}'
```

## Example: Delete a task

```bash
curl -i -X DELETE http://localhost:3000/api/v1/tasks/1
```

## Architecture

- **Routes:** Map HTTP methods and URLs to controllers.
- **Controllers:** Handle request data and HTTP responses.
- **Services:** Apply task-related business rules.
- **Repositories:** Manage in-memory task data.
- **Middleware:** Log requests, assign request IDs, validate inputs, and handle errors.
- **Validators:** Define Joi schemas.
- **Configuration:** Load and validate environment variables.

## Storage

Tasks are stored in an in-memory array. Data is lost when the server restarts. A database is not required for this assignment.

## Error handling

The API returns structured JSON errors for invalid input, missing resources, unknown routes, malformed JSON, and unexpected server errors.

## Security and configuration

The local `.env` file must not be committed to Git. The `.env.example` file documents the required environment variables.
