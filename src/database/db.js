
const Database = require("better-sqlite3");

const db = new Database("fitnest.db");

// Enable foreign key relationships
db.pragma("foreign_keys = ON");

// Create Members table
db.exec(`
CREATE TABLE IF NOT EXISTS members (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT
);
`);

// Create Lockers table
db.exec(`
CREATE TABLE IF NOT EXISTS lockers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    floor INTEGER NOT NULL,
    status TEXT DEFAULT 'available'
);
`);

// Create Allotments table
db.exec(`
CREATE TABLE IF NOT EXISTS allotments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    member_id INTEGER NOT NULL,
    locker_id INTEGER NOT NULL,
    start_date TEXT NOT NULL,
    end_date TEXT NOT NULL,
    FOREIGN KEY (member_id) REFERENCES members(id),
    FOREIGN KEY (locker_id) REFERENCES lockers(id)
);
`);

// Create indexes for better database performance

db.exec(`
CREATE INDEX IF NOT EXISTS idx_members_email
ON members(email);
`);

db.exec(`
CREATE INDEX IF NOT EXISTS idx_lockers_status
ON lockers(status);
`);

db.exec(`
CREATE INDEX IF NOT EXISTS idx_allotments_member_id
ON allotments(member_id);
`);

db.exec(`
CREATE INDEX IF NOT EXISTS idx_allotments_locker_id
ON allotments(locker_id);
`);

console.log("Database indexes created successfully!");

console.log("SQLite database connected successfully!");

// Insert sample members
const insertMember = db.prepare(`
    INSERT OR IGNORE INTO members (id, name, email, phone)
    VALUES (?, ?, ?, ?)
`);

insertMember.run(1, "Rahul", "rahul@gmail.com", "9876543210");
insertMember.run(2, "Priya", "priya@gmail.com", "9876543211");

// Insert sample lockers
const insertLocker = db.prepare(`
    INSERT OR IGNORE INTO lockers (id, name, floor, status)
    VALUES (?, ?, ?, ?)
`);

insertLocker.run(12, "Locker 12", 1, "occupied");
insertLocker.run(13, "Locker 13", 1, "available");
insertLocker.run(14, "Locker 14", 2, "available");
insertLocker.run(15, "Locker 15", 2, "available");

// Insert sample allotment
const insertAllotment = db.prepare(`
    INSERT OR IGNORE INTO allotments
    (id, member_id, locker_id, start_date, end_date)
    VALUES (?, ?, ?, ?, ?)
`);

insertAllotment.run(
    1, 1, 12, "2026-11-10", "2026-11-12"
);

console.log("Sample data inserted successfully!");

module.exports = db;
