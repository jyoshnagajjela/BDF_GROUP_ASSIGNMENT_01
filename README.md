# FitNest Gym – Locker Room Management System

## Project Description
A REST API for managing gym members, lockers and locker allotments using Node.js, Express.js and SQLite.

## Technologies
- Node.js
- Express.js
- SQLite
- better-sqlite3
- Postman

## Database Tables
1. Members
2. Lockers
3. Allotments

## API Endpoints

### Members
- GET /members
- GET /members/:id
- POST /members
- PUT /members/:id
- DELETE /members/:id

### Lockers
- GET /lockers
- GET /lockers/:id
- GET /lockers/search?floor=1
- GET /lockers/available?date=2026-11-11
- POST /lockers
- PUT /lockers/:id
- DELETE /lockers/:id

### Allotments
- GET /allotments
- GET /allotments/:id
- GET /allotments/join
- POST /allotments
- PUT /allotments/:id
- DELETE /allotments/:id

## Special Features
- Date validation
- Locker availability checking
- Floor-based locker search
- SQL JOIN for member and locker details
- HTTP 400 for invalid date ranges

## Run Locally

```bash
npm install
npm run dev
```

Server: http://localhost:3000

## Testing
API endpoints tested using Postman.
