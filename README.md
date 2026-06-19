

# 📸 Application Preview

<p align="center">
  <img src="https://github.com/user-attachments/assets/76e5ea15-22b8-4056-8376-d3e925f909ae" width="48%">
  <img src="https://github.com/user-attachments/assets/488f4305-516a-4799-ba47-261c9c9918a8" width="48%">
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/b9423e2f-a8f4-41c8-97c4-2b03296ccf44" width="48%">
  <img src="https://github.com/user-attachments/assets/049437bd-481e-4bb0-b9c3-9d91af095c61" width="48%">
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/304cd34e-6d8e-435e-8bf2-c10164c3de47" width="48%">
  <img src="https://github.com/user-attachments/assets/bf4a3eeb-7ed8-4590-a7b3-e6e6a7a65ea2" width="48%">
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/ddca4395-6209-43c3-9df1-38aaaa090a08" width="48%">
  <img src="https://github.com/user-attachments/assets/66bf1aa0-07ac-4486-8114-3316865f5532" width="48%">
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/8dc3b35b-2be7-4f4c-ad12-5644f8fd0b49" width="48%">
  <img src="https://github.com/user-attachments/assets/1e73db00-61b3-4312-9560-05210beff7cd" width="48%">
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/c853d05a-4221-402d-9f4d-6cd6e408617d" width="48%">
  <img src="https://github.com/user-attachments/assets/706f8da5-e71a-4a53-8dbc-b439c49c9862" width="48%">
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/00409aa1-79cf-4126-bd44-00345ba7d01f" width="48%">
  <img src="https://github.com/user-attachments/assets/87a37ed7-7688-4808-8cf4-a7238daeabda" width="48%">
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/35572ca3-9a1c-4cd5-ab65-11eff561a288" width="48%">
</p>


# Bookstore REST API + Basic UI (Express + MongoDB)

Full endpoint documentation lives in [API_DOCUMENTATION.md](API_DOCUMENTATION.md)

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
