# Bookstore REST API + Basic UI (Express + MongoDB)

Full endpoint documentation lives in [API_DOCUMENTATION.md](API_DOCUMENTATION.md).

## What’s included
- Book CRUD endpoints:
  - `POST /books`
  - `GET /books`
  - `GET /books/:id`
  - `PUT /books/:id`
  - `DELETE /books/:id`
- Compatibility alias:
  - `/api/books` maps to the same CRUD handlers
- Local MongoDB default at `mongodb://127.0.0.1:27017/book_store`, with Atlas support through `MONGODB_URI`
- Books are stored in the `api_testing` collection
- Basic HTML UI to test the book endpoints at `http://localhost:4000/`
- Optional JWT auth and older demo CRUD routes remain in the project, but the bookstore API is the main submission target

## Setup
1) Install dependencies
```bash
npm install
```

2) Create `.env` from `.env.example`
```bash
cp .env.example .env
```

- `MONGODB_URI` = your local MongoDB URI or Atlas connection string
- `JWT_SECRET` = any strong secret

3) Run server
```bash
npm run dev
```

## API quick reference

Postman imports
- Collection: [postman/API.postman_collection.json](postman/API.postman_collection.json)
- Environment: [postman/API.local.postman_environment.json](postman/API.local.postman_environment.json)
- Import both into Postman, then run the book requests in order if you want to capture `bookId` for the by-id calls.

Books
- POST `/books`
- GET `/books`
- GET `/books/:id`
- PUT `/books/:id`
- DELETE `/books/:id`

Sample book payload
```json
{
  "title": "Atomic Habits",
  "author": "James Clear",
  "price": 20,
  "isbn": "1234567890",
  "publishedDate": "2018-10-16"
}
```

Auth and older demo routes
- POST `/api/auth/register` `{ username, password }`
- POST `/api/auth/login` `{ username, password }`
- GET/POST/PUT/DELETE `/api/items`, `/api/notes`, `/api/messages` require JWT auth
