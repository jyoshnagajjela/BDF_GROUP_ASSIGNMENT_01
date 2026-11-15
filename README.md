# FitNest Gym – Locker Room Management System

## 1. Project Description

FitNest Gym – Locker Room Management System is a REST API-based application developed to manage gym members, lockers and locker allotments.

The backend is developed using Node.js and Express.js, with SQLite as the database. The application provides APIs for managing member records, locker information, locker searching, locker availability and allotment operations.

## 2. Technologies Used

- Node.js
- Express.js
- SQLite
- better-sqlite3
- Postman
- JavaScript

## 3. Database Details

The application uses an SQLite database to store and manage information.

**Database File:** `fitnest.db`

The database contains the following tables:

1. **Members** – Stores gym member information.
2. **Lockers** – Stores locker details, including locker IDs, names, floor numbers and status.
3. **Allotments** – Stores locker allotment information and date ranges.

## 4. API Endpoints

### 4.1 Members API

| HTTP Method | Endpoint | Description |
|---|---|---|
| GET | `/members` | Retrieve all members |
| GET | `/members/:id` | Retrieve a member by ID |
| POST | `/members` | Create a new member |
| PUT | `/members/:id` | Update member details |
| DELETE | `/members/:id` | Delete a member |

### 4.2 Lockers API

| HTTP Method | Endpoint | Description |
|---|---|---|
| GET | `/lockers` | Retrieve all lockers |
| GET | `/lockers/:id` | Retrieve a locker by ID |
| GET | `/lockers/search?floor=1` | Search lockers by floor |
| GET | `/lockers/available?date=2026-11-11` | Check locker availability by date |
| POST | `/lockers` | Create a locker |
| PUT | `/lockers/:id` | Update locker details |
| DELETE | `/lockers/:id` | Delete a locker |

### 4.3 Allotments API

| HTTP Method | Endpoint | Description |
|---|---|---|
| GET | `/allotments` | Retrieve all allotments |
| GET | `/allotments/:id` | Retrieve an allotment by ID |
| GET | `/allotments/join` | Retrieve joined member and locker details |
| POST | `/allotments` | Create a new allotment |
| PUT | `/allotments/:id` | Update an allotment |
| DELETE | `/allotments/:id` | Delete an allotment |

## 5. Special Features

- Required-field validation.
- Date format and calendar date validation.
- Prevention of invalid allotment date ranges.
- Floor-based locker searching.
- Date-based locker availability checking.
- SQL JOIN operations for retrieving member and locker details.
- Appropriate HTTP error responses for unsuccessful requests.

## 6. Installation and Setup

Follow these steps to run the project locally.

**Step 1: Clone the repository**

```bash
git clone https://github.com/jyoshnagajjela/BDF_GROUP_ASSIGNMENT_01.git
```

**Step 2: Navigate to the project folder**

```bash
cd BDF_GROUP_ASSIGNMENT_01
```

**Step 3: Install dependencies**

```bash
npm install
```

**Step 4: Start the development server**

```bash
npm run dev
```

**Step 5: Access the server**

```text
http://localhost:3000
```

## 7. API Testing Using Postman

Postman is used to test the REST API endpoints and verify their responses.

The following requests were tested:

| Test | Request | Actual Result |
|---|---|---|
| Server Health Check | GET `/` | 200 OK |
| Get All Members | GET `/members` | 200 OK |
| Get All Lockers | GET `/lockers` | 200 OK |
| Invalid Member ID | GET `/members/999999` | 404 Not Found |

### Sample API Responses

**Successful Server Health Check**

```json
{
  "project": "FitNest Gym",
  "message": "Locker Room Management API",
  "status": "Server is running successfully"
}
```

**Unsuccessful Request – Invalid Member ID**

```json
{
  "error": "Record not found"
}
```

These tests verify that the server responds successfully to valid requests and returns an appropriate error response when a requested member record does not exist.

## 8. Screenshots and Testing Evidence

The `screenshots` folder contains API testing evidence captured using Postman.

The screenshots demonstrate:

- Server health check.
- Successful Members API response.
- Successful Lockers API response.
- Unsuccessful request with an invalid member ID.

Additional project screenshots demonstrate locker searching, locker availability, allotment operations and date validation.

## 9. Conclusion

The FitNest Gym – Locker Room Management System provides REST APIs for managing gym members, lockers and locker allotments.

The application uses Node.js, Express.js and SQLite to handle backend operations. API testing using Postman helps verify successful requests, unsuccessful requests and the correctness of server responses.

The project demonstrates backend development concepts, database integration, API validation, error handling and REST API testing.