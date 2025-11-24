# ElevateLab-Task03
# Modern Books REST API

A modern, well-structured REST API for managing books with layered architecture.

##  Project Structure

```
modern-books-api/
├── server.js                    # Main entry point
├── package.json                 # Dependencies
├── .gitignore                   # Git ignore rules
├── controllers/
│   └── bookController.js        # HTTP request handlers
├── services/
│   └── bookService.js           # Business logic layer
├── models/
│   └── bookModel.js             # Data model and seed data
├── routes/
│   └── bookRoutes.js            # Route definitions
├── middleware/
│   ├── errorHandler.js          # Error handling middleware
│   ├── requestLogger.js         # Request logging
│   └── validators.js            # Input validation
└── utils/
    └── AppError.js              # Custom error class
```

##  Getting Started

### Prerequisites
- Node.js >= 18.0.0

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the server:
```bash
npm start
```

3. For development (with auto-reload):
```bash
npm run dev
```

The server will start on `http://localhost:3000`

## 📡 API Endpoints

### Base URL
```
http://localhost:3000/api/v1
```

### Endpoints

#### Health Check
```http
GET /health
```

#### Get All Books
```http
GET /api/v1/books
```

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": 1,
      "title": "The Alchemist",
      "author": "Paulo Coelho",
      "createdAt": "2024-11-24T10:00:00.000Z"
    }
  ]
}
```

#### Search Books
```http
GET /api/v1/books/search?title=Alchemist
GET /api/v1/books/search?author=Paulo
GET /api/v1/books/search?title=Atomic&author=Clear
```

**Response:**
```json
{
  "success": true,
  "count": 1,
  "data": [...]
}
```

#### Create Book
```http
POST /api/v1/books
Content-Type: application/json

{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Book created successfully",
  "data": {
    "id": 3,
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "createdAt": "2024-11-24T10:05:00.000Z"
  }
}
```

#### Update Book
```http
PUT /api/v1/books/1
Content-Type: application/json

{
  "title": "Updated Title",
  "author": "Updated Author"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Book updated successfully",
  "data": {
    "id": 1,
    "title": "Updated Title",
    "author": "Updated Author",
    "createdAt": "2024-11-24T10:00:00.000Z",
    "updatedAt": "2024-11-24T10:10:00.000Z"
  }
}
```

#### Delete Book
```http
DELETE /api/v1/books/1
```

**Response:**
```json
{
  "success": true,
  "message": "Book deleted successfully",
  "data": {
    "id": 1,
    "title": "The Alchemist",
    "author": "Paulo Coelho"
  }
}
```

##  Error Responses

All errors follow this format:

```json
{
  "success": false,
  "message": "Error message here"
}
```

### Common Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `404` - Not Found
- `409` - Conflict (duplicate book)
- `500` - Internal Server Error

##  Architecture

### Layered Architecture
- **Controllers**: Handle HTTP requests/responses
- **Services**: Contain business logic
- **Models**: Define data structure
- **Middleware**: Reusable request processing
- **Utils**: Helper functions and classes

### Benefits
-  Separation of concerns
-  Easy to test
-  Scalable structure
-  Clear dependencies
-  Maintainable code

##  Differences from Original

| Feature | Original | Modern |
|---------|----------|--------|
| Module System | CommonJS | ES6 Modules |
| Architecture | Monolithic | Layered MVC |
| File Structure | Single file | Multiple organized files |
| Error Handling | Basic | Custom AppError class |
| Validation | Inline | Middleware validators |
| Response Format | Mixed | Standardized JSON |
| API Versioning | No | `/api/v1` |
| Timestamps | No | `createdAt`, `updatedAt` |
| Health Check | No | Yes (`/health`) |
