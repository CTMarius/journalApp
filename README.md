# Journal Application

A web-based journaling application with a Node.js backend and MongoDB database.

## Features

- Daily journal entries with date selection
- Secure access with basic authentication
- Persistent storage using MongoDB
- Simple and clean user interface
- REST API endpoints for journal operations

## Prerequisites

- Node.js (>=0.12)
- MongoDB (running on port 27017)
- npm

## Installation

1. Clone the repository
2. Install dependencies:
```sh
npm install
```
3. Make sure MongoDB is running locally
4. Start the application:
```sh
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

- `GET /entry` - Retrieve all journal entries
- `POST /entry` - Create a new journal entry
- `GET /entry/:id` - Get a specific entry by ID
- `PUT /entry/:id` - Update a specific entry

## Authentication

The application uses basic authentication:
- Default credentials:
  - Username: `admin`
  - Password: `admin`

## Technology Stack

- Backend:
  - Express.js
  - Mongoose
  - MongoDB
- Frontend:
  - HTML5
  - CSS3
  - Vanilla JavaScript

## Development

To run the application in development mode with auto-reload:
```sh
npm start
```

## Security

- Basic authentication for web interface
- CORS enabled
- Protected by Snyk for vulnerability monitoring

## License

ISC

## Author

MariusC