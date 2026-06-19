# API Documentation

This project exposes a bookstore REST API plus a few legacy demo endpoints that still ship in the codebase.

## Base Setup

- Runtime: Node.js + Express
- Database: MongoDB local or Atlas
- Required environment variable: `MONGODB_URI`
- Optional environment variable for legacy auth routes: `JWT_SECRET`

## Base URLs

- Bookstore API: `/books`
- Compatibility alias: `/api/books`
- Legacy demo APIs: `/api/auth`, `/api/items`, `/api/notes`, `/api/messages`

## Health Check

### GET `/health`

Returns a basic status response for the server.

#### Response

```json
{
  "ok": true
}
```

## Bookstore API

The bookstore routes do not require authentication.
Books are stored in the `api_testing` collection.

### Book Schema

- `title` string, required
- `author` string, required
- `price` number, required
- `isbn` string, required, unique
- `publishedDate` date, required

### POST `/books`

Create a new book.

#### Request Body

```json
{
  "title": "Atomic Habits",
  "author": "James Clear",
  "price": 20,
  "isbn": "1234567890",
  "publishedDate": "2018-10-16"
}
```

#### Success Response `201`

```json
{
  "data": {
    "_id": "65f0b0f1f1f1f1f1f1f1f1f1",
    "title": "Atomic Habits",
    "author": "James Clear",
    "price": 20,
    "isbn": "1234567890",
    "publishedDate": "2018-10-16T00:00:00.000Z",
    "createdAt": "2026-06-18T10:00:00.000Z",
    "updatedAt": "2026-06-18T10:00:00.000Z",
    "__v": 0
  }
}
```

#### Common Errors

- `400` when required fields are missing or invalid
- `409` when `isbn` already exists

### GET `/books`

Fetch all books.

#### Optional Query Parameters

- `search` search string used against `title`, `author`, and `isbn`
- `page` page number starting at 1
- `limit` number of records per page, from 1 to 100

#### Example

`GET /books?search=habit&page=1&limit=10`

#### Success Response `200`

```json
{
  "data": [],
  "meta": {
    "total": 0,
    "page": 1,
    "limit": 10,
    "totalPages": 0
  }
}
```

### GET `/books/:id`

Fetch one book by MongoDB ObjectId.

#### Success Response `200`

```json
{
  "data": {
    "_id": "65f0b0f1f1f1f1f1f1f1f1f1",
    "title": "Atomic Habits",
    "author": "James Clear",
    "price": 20,
    "isbn": "1234567890",
    "publishedDate": "2018-10-16T00:00:00.000Z",
    "createdAt": "2026-06-18T10:00:00.000Z",
    "updatedAt": "2026-06-18T10:00:00.000Z",
    "__v": 0
  }
}
```

#### Common Errors

- `400` when the id is not a valid ObjectId
- `404` when the book does not exist

### PUT `/books/:id`

Update an existing book. Any subset of fields can be sent.

#### Request Body Example

```json
{
  "price": 25,
  "publishedDate": "2018-10-16"
}
```

#### Success Response `200`

```json
{
  "data": {
    "_id": "65f0b0f1f1f1f1f1f1f1f1f1",
    "title": "Atomic Habits",
    "author": "James Clear",
    "price": 25,
    "isbn": "1234567890",
    "publishedDate": "2018-10-16T00:00:00.000Z",
    "createdAt": "2026-06-18T10:00:00.000Z",
    "updatedAt": "2026-06-18T10:05:00.000Z",
    "__v": 0
  }
}
```

#### Common Errors

- `400` when the id is invalid or a field value is invalid
- `404` when the book does not exist
- `409` when the updated `isbn` duplicates another record

### DELETE `/books/:id`

Delete a book by id.

#### Success Response `200`

```json
{
  "message": "Deleted"
}
```

#### Common Errors

- `400` when the id is invalid
- `404` when the book does not exist

## Legacy Auth API

These routes are still present in the repository and can be used for the older demo CRUD pages.

### POST `/api/auth/register`

Create a user account.

#### Request Body

```json
{
  "username": "demo",
  "password": "password123"
}
```

#### Success Response `201`

```json
{
  "id": "65f0b0f1f1f1f1f1f1f1f1f1",
  "username": "demo"
}
```

### POST `/api/auth/login`

Login with a registered user.

#### Request Body

```json
{
  "username": "demo",
  "password": "password123"
}
```

#### Success Response `200`

```json
{
  "token": "<jwt-token>"
}
```

## Legacy Protected CRUD API

These routes are public and do not require authentication.

### Shared Behavior

- `GET /api/items`
- `POST /api/items`
- `GET /api/items/:id`
- `PUT /api/items/:id`
- `DELETE /api/items/:id`

List routes accept optional `search`, `page`, and `limit` query parameters and return pagination metadata.

The same route pattern exists for:

- `/api/notes`
- `/api/messages`

### Item Model

- `title` string, required
- `description` string, optional

### Note Model

- `title` string, required
- `content` string, optional

### Message Model

- `text` string, required
- `toUserId` ObjectId reference to `User`, required

### Shared Success Responses

- `GET` list returns:

```json
{
  "data": []
}
```

- `POST`, `GET by id`, `PUT`, and `DELETE` return an object with a `data` field or a delete message.

### Common Errors

- `404` when the requested document does not exist

## Browser UI

### GET `/`

Serves the bookstore API tester page.

### GET `/crud.html`

Legacy demo page for the older authenticated CRUD resources.

Example usage:

- `/crud.html?resource=items`
- `/crud.html?resource=notes`
- `/crud.html?resource=messages`

## Notes

- `/books` and `/api/books` point to the same controller.
- The bookstore endpoints are the ones that match the internship task requirement.
- The legacy `/api/*` endpoints are kept only because they already exist in the repository.