# VitalWatch Backend API

This is the backend API service for the VitalWatch application, providing endpoints to access vital sign data from Firebase Realtime Database.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Set up environment variables:

   - Create a `.env` file in the root directory
   - Copy the provided Firebase configuration

3. Start the server:
   - Development mode: `npm run dev`
   - Production mode: `npm start`

## API Endpoints

### Get Latest Vitals

- **URL**: `/vitals`
- **Method**: `GET`
- **Description**: Returns the latest 50 vital records
- **Response**: Array of vital records

### Get User Vitals

- **URL**: `/vitals/:userId`
- **Method**: `GET`
- **Description**: Returns all vital records for a specific user
- **Parameters**: `userId` - The ID of the user
- **Response**: Object containing user's vital records

### Health Check

- **URL**: `/health`
- **Method**: `GET`
- **Description**: Check if the API is running
- **Response**: Status and timestamp

## Authentication

All endpoints are protected with Firebase Authentication. The server automatically handles authentication using the provided email/password credentials.

## Error Handling

The API returns appropriate HTTP status codes:

- 200: Success
- 401: Unauthorized
- 500: Server Error

Error responses include a JSON object with an `error` message.
