
const db = require("./db");

console.log("\n========== DATABASE TESTING ==========\n");

// TEST 1: Check database connection
console.log("TEST 1: Database Connection");
console.log("Database connected successfully!");

// TEST 2: Check all three tables
console.log("\nTEST 2: Database Tables");

const tables = db.prepare(`
    SELECT name FROM sqlite_master
    WHERE type = 'table'
    AND name NOT LIKE 'sqlite_%'
`).all();

console.table(tables);

// TEST 3: Check stored records
console.log("\nTEST 3: Members Table");
console.table(db.prepare("SELECT * FROM members").all());

console.log("\nLockers Table");
console.table(db.prepare("SELECT * FROM lockers").all());

console.log("\nAllotments Table");
console.table(db.prepare("SELECT * FROM allotments").all());

// TEST 4: Check primary keys and columns
console.log("\nTEST 4: Members Table Structure");
console.table(db.prepare("PRAGMA table_info(members)").all());

console.log("\nTEST 5: Allotments Foreign Keys");
console.table(db.prepare("PRAGMA foreign_key_list(allotments)").all());

// TEST 6: Check database indexes
console.log("\nTEST 6: Database Indexes");

for (const table of ["members", "lockers", "allotments"]) {
    console.log(`Indexes on ${table}:`);
    console.table(
        db.prepare(`PRAGMA index_list(${table})`).all()
    );
}

// TEST 7: Check foreign key enforcement
console.log("\nTEST 7: Foreign Key Validation");

try {
    db.prepare(`
        INSERT INTO allotments
        (member_id, locker_id, start_date, end_date)
        VALUES (?, ?, ?, ?)
    `).run(-999, 12, "2026-11-15", "2026-11-16");

    console.log("FAILED: Invalid foreign key was accepted.");
} catch (error) {
    console.log("PASSED: Invalid foreign key rejected!");
    console.log(error.message);
}

// TEST 8: Database integrity
console.log("\nTEST 8: Database Integrity");
console.table(db.pragma("integrity_check"));

console.log("\n========== TESTING COMPLETED ==========");

db.close();
