# Shorty - URL Shortener API

Shorty is a powerful URL shortener API written in Node.js that allows you to generate shortened URLs for your long and cumbersome links. It follows the SOLID principles, offering flexibility and extensibility with plug-and-play options for the hashing algorithm and database engine. Shorty features two endpoints for various operations and ensures centralized error handling throughout the codebase.

## Endpoints

### POST /v1/url

Generate a new shortened URL by providing the original URL.

**Request:**
```json
POST /v1/url
Content-Type: application/json

{
    "url": "https://www.google.com"
}
```

**Response:**
```json
HTTP/1.1 200 OK
Content-Type: application/json

{
    "status": "success",
    "short_url": "http://localhost:3025/v1/n5UYc",
    "original_url": "www.google.com"
}
```

### GET /v1/:shortUrl

Redirect to the original URL by providing the short URL.

**Request:**
```json
GET /v1/n5UYc
```

**Response:**
Redirects to `https://www.google.com`, which corresponds to the original URL.

### GET /v1/health

Check the health status of the database and API.

**Response:**
```json
HTTP/1.1 200 OK
Content-Type: application/json

{
    "status": "Healthy",
    "services": {
        "database": {
            "status": "Healthy",
            "reason": "NA"
        },
        "api": {
            "status": "Healthy",
            "reason": "NA"
        }
    }
}
```

## Features

- Utilizes MongoDB Atlas as the database service.
- Follows SOLID principles for better maintainability and extensibility.
- Implements a dedicated error handler for centralized error catching and handling.
- Adheres to the factory pattern for the database and hash function components.
- Employs manual thread pools to offload CPU-intensive tasks from the main thread.

## Code Snippet

The following code snippet showcases the usage of components within the service layers:

```javascript
const hashService: HashServiceInterface = new HashService();
const shortnerService: ShortenerServiceInterface = new ShortenerService();
const dbService: DbServiceInterface = dbEngineFactory(dbEngineType);

// Get hashedString from makeHashService
const hashedString: string = await hashService.makeHash(originalUrl, hashType);

// Call Shortener Service
const shortString: string = await shortnerService.shorten(hashedString, shortenerType);

// Call saveToDb Service
await dbService.saveRow(
    originalUrl,
    shortString,
    moment().toDate()
);
```

## Running the Application

To run the Shorty application, use the following Docker command:

```bash
MONGO_URI=<your-mongodb-connection-uri> HOST_NAME="http://localhost:3025" TTL=3600 docker run -p 3025:3025 utkarshraj/shorty
```

Feel free to explore Shorty and make your URLs more compact and shareable! Happy shortening! 🚀🔗