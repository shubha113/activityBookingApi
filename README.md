# Activity Booking API

A REST API backend for a Basic Activity Booking App built with Node.js, Express.js, and MongoDB.

## Tech Stack

- Node.js with Express.js
- MongoDB (with Mongoose ODM)
- JWT for Authentication
- bcrypt for Password Hashing

## Features

- User Registration & Login
- Activity Listing
- Creating Activity
- Activity Booking
- User Bookings

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login user and get JWT token

### Activities
- `GET /api/v1/activities/createActivity` - Create activities
- `GET /api/v1/activities` - Get all activities
- `GET /api/v1/activities/:id` - Get a specific activity

### Bookings (Protected Routes)
- `POST /api/v1/bookings/book` - Book an activity
- `GET /api/v1/bookings/me` - Get current user's bookings

## Sample Data for MongoDB

You can use MongoDB Compass or Mongo Shell to insert some sample activities:

```javascript
db.activities.insertMany([
  {
    title: "Cricket Match",
    description: "T20 cricket match at city stadium",
    location: "City Stadium",
    dateTime: new Date("2023-09-20T14:00:00.000Z")
  },
  {
    title: "Movie Night",
    description: "Watch the latest blockbuster with friends",
    location: "PVR Cinemas",
    dateTime: new Date("2023-09-22T18:30:00.000Z")
  },
  {
    title: "Football Match",
    description: "Local football tournament finals",
    location: "Community Grounds",
    dateTime: new Date("2023-09-25T16:00:00.000Z")
  }
]);
```

## Project Structure

```
activity-booking-api/
├── config/
│   └── db.js
├── controllers/
│   ├── activityController.js
│   ├── authController.js
│   └── bookingController.js
├── middleware/
│   ├── authMiddleware.js
│   ├── catchAsyncError.js
│   └── errorMiddleware.js
├── models/
│   ├── Activity.js
│   ├── Booking.js
│   └── User.js
├── routes/
│   ├── activityRoutes.js
│   ├── authRoutes.js
│   └── bookingRoutes.js
├── utils/
│   └── errorHandler.js
├── .env
├── .gitignore
├── server.js
└── package.json
```
