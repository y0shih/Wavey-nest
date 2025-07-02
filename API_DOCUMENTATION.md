# Songs API Documentation

## Base URL
`http://localhost:3000`

## Endpoints

### 1. Create Song
**POST** `/songs`

Creates a new song with validation.

**Required Headers:**
- `Content-Type: application/json`

**Request Body:**
```json
{
  "title": "string (required)",
  "artist": ["string[]"] (required),
  "album": "string (required)", 
  "genre": "string (optional)",
  "releaseDate": "YYYY-MM-DD (required)",
  "duration": "HH:MM (required, military time format)"
}
```

**Validation Rules:**
- `title`: Non-empty string
- `artist`: Non-empty array of strings
- `album`: Non-empty string
- `genre`: Optional string
- `releaseDate`: Valid ISO date string
- `duration`: Military time format (HH:MM)

**Response:** `201 Created`
```json
{
  "id": 1,
  "title": "Song Title",
  "artist": ["Artist Name"],
  "album": "Album Name",
  "genre": "Rock",
  "releaseDate": "2023-10-01T00:00:00.000Z",
  "duration": "03:34"
}
```

### 2. Get All Songs
**GET** `/songs`

Retrieves all songs.

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "title": "Song Title",
    "artist": ["Artist Name"],
    "album": "Album Name", 
    "genre": "Rock",
    "releaseDate": "2023-10-01T00:00:00.000Z",
    "duration": "03:34"
  }
]
```

### 3. Get Song by ID
**GET** `/songs/:id`

**Parameters:**
- `id`: Song ID (integer)

**Response:** `200 OK` or `404 Not Found`

### 4. Update Song (Full Update)
**PUT** `/songs/:id`

**Parameters:**
- `id`: Song ID (integer)

**Request Body:** Same as Create Song (all fields required)

### 5. Update Song (Partial Update)
**PATCH** `/songs/:id`

**Parameters:**
- `id`: Song ID (integer)

**Request Body:** Partial song object (any combination of fields)

### 6. Delete Song
**DELETE** `/songs/:id`

**Parameters:**
- `id`: Song ID (integer)

**Response:** `200 OK`
```json
{
  "message": "Song with ID 1 has been deleted"
}
```

### 7. Search Songs
**GET** `/songs/search?q={query}`

**Query Parameters:**
- `q`: Search query (required)

### 8. Get Songs by Genre
**GET** `/songs/genre/:genre`

**Parameters:**
- `genre`: Genre name (string)

### 9. Get Songs by Artist
**GET** `/songs/artist/:artist`

**Parameters:**
- `artist`: Artist name (string, partial match)

### 10. Get Songs by Album
**GET** `/songs/album/:album`

**Parameters:**
- `album`: Album name (string, partial match)

### 11. Special Endpoints (Placeholders)
- **GET** `/songs/popular` - Popular songs
- **GET** `/songs/recent` - Recent songs  
- **GET** `/songs/top` - Top songs

## Error Responses

**400 Bad Request** - Validation errors
```json
{
  "message": ["title should not be empty", "duration must be a valid representation of military time"],
  "error": "Bad Request",
  "statusCode": 400
}
```

**404 Not Found** - Song not found
```json
{
  "message": "Song with ID 999 not found",
  "error": "Not Found", 
  "statusCode": 404
}
```

**500 Internal Server Error** - Server errors
```json
{
  "message": "Server error",
  "statusCode": 500
}
```
