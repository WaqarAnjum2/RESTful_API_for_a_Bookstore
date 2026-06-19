

# 📸 Application Preview

<table>
<tr>
<td width="50%">
<img src="https://github.com/user-attachments/assets/24d1aae8-1774-4cf6-847b-1cc05f870cb5">
</td>
<td width="50%">
<img src="https://github.com/user-attachments/assets/2399874f-fae7-4751-a90d-a07e84231c3f">
</td>
</tr>



<tr>
<td width="50%">
<img src="https://github.com/user-attachments/assets/f0bcbffe-eae1-4e37-bdee-636b255d88cc">
</td>
<td width="50%">
<img src="https://github.com/user-attachments/assets/864a69ca-8991-4c71-ab31-7b75515dc733">
</td>
</tr>

<tr>
<td width="50%">
<img src="https://github.com/user-attachments/assets/355ac84e-f8ca-49a8-83ed-8cf8a14f9df0">
</td>
<td width="50%">
<img src="https://github.com/user-attachments/assets/6ede2650-f97b-4971-8017-35483e7853e2">
</td>
</tr>

<tr>
<td width="50%">
<img src="https://github.com/user-attachments/assets/eb2c6464-ab44-4221-8e10-f63c3539a858">
</td>
<td width="50%">
<img src="https://github.com/user-attachments/assets/a21eb0d6-8157-491a-bb6e-47c22a942d24">
</td>
</tr>

<tr>
<td width="50%">
<img src="https://github.com/user-attachments/assets/1cf5fe0a-3f67-49d7-9683-99e64d7b955d">
</td>
<td width="50%">
<img src="https://github.com/user-attachments/assets/d47c1f38-edc8-434c-a7f0-c7e6ff32edc350">
</td>
</tr>

<tr>
<td width="50%">
<img src="https://github.com/user-attachments/assets/d633ec43-ad84-438b-afa4-e47d565ecd9a">
</td>
<td width="50%">
<img src="https://github.com/user-attachments/assets/c1e733a6-c9dc-4ac7-85d2-f44922b514e9">
</td>
</tr>

<tr>
<td width="50%">
<img src="https://github.com/user-attachments/assets/0d714a5e-047b-4038-b57e-fc1197e2b934">
</td>
<td width="50%">
<img src="https://github.com/user-attachments/assets/a8161000-798e-42c7-9c68-8ba03bbe6833">
</td>
</tr>

<tr>
<td width="50%">
<img src="https://github.com/user-attachments/assets/06e23e20-1190-4d0a-998f-fc1f78e4cdc7">
</td>
<td width="50%">
<img src="https://github.com/user-attachments/assets/5f94913b-7b92-4a39-83d6-e5e19dd32783">
</td>
</tr>
</table>




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
