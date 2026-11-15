
const db = require("../database/db");

// ================= GET ALL RECORDS =================

function getAll(table) {
    return (req, res) => {
        try {
            const records = db.prepare(
                `SELECT * FROM ${table}`
            ).all();

            res.status(200).json(records);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
}

// ================= GET RECORD BY ID =================

function getById(table) {
    return (req, res) => {
        try {
            const record = db.prepare(
                `SELECT * FROM ${table} WHERE id = ?`
            ).get(req.params.id);

            if (!record) {
                return res.status(404).json({
                    error: "Record not found"
                });
            }

            res.status(200).json(record);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
}

// ================= CREATE RECORD =================

function create(table, fields) {
    return (req, res) => {
        try {
            const values = fields.map(field =>
                req.body[field] ??
                (field === "status" ? "available" : null)
            );

            const columns = fields.join(", ");
            const placeholders = fields.map(() => "?").join(", ");

            const result = db.prepare(`
                INSERT INTO ${table} (${columns})
                VALUES (${placeholders})
            `).run(...values);

            res.status(201).json({
                message: "Record added successfully",
                id: result.lastInsertRowid
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };
}

// ================= UPDATE RECORD =================

function update(table, fields) {
    return (req, res) => {
        try {
            const values = fields.map(field => req.body[field]);

            const assignments = fields
                .map(field => `${field} = ?`)
                .join(", ");

            const result = db.prepare(`
                UPDATE ${table}
                SET ${assignments}
                WHERE id = ?
            `).run(...values, req.params.id);

            if (!result.changes) {
                return res.status(404).json({
                    error: "Record not found"
                });
            }

            res.status(200).json({
                message: "Record updated successfully"
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };
}

// ================= DELETE RECORD =================

function remove(table) {
    return (req, res) => {
        try {
            const result = db.prepare(
                `DELETE FROM ${table} WHERE id = ?`
            ).run(req.params.id);

            if (!result.changes) {
                return res.status(404).json({
                    error: "Record not found"
                });
            }

            res.status(200).json({
                message: "Record deleted successfully"
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };
}

// ================= JOIN FUNCTIONALITY =================

function getAllotmentsWithNames(req, res) {
    try {
        const records = db.prepare(`
            SELECT
                a.id AS allotment_id,
                m.name AS member_name,
                l.name AS locker_name,
                a.start_date,
                a.end_date
            FROM allotments a
            INNER JOIN members m
                ON a.member_id = m.id
            INNER JOIN lockers l
                ON a.locker_id = l.id
        `).all();

        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// ================= LOCKER SEARCH =================

function searchLockers(req, res) {
    try {
        const { floor } = req.query;

        if (floor === undefined) {
            return res.status(400).json({
                error: "Floor query parameter is required"
            });
        }

        if (!/^\d+$/.test(floor)) {
            return res.status(400).json({
                error: "Floor must be a valid number"
            });
        }

        const records = db.prepare(
            "SELECT * FROM lockers WHERE floor = ?"
        ).all(Number(floor));

        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// ================= AVAILABLE LOCKERS =================

function availableLockers(req, res) {
    try {
        const { date } = req.query;

        if (!date) {
            return res.status(400).json({
                error: "Date query parameter is required"
            });
        }

        if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
            return res.status(400).json({
                error: "Date must use YYYY-MM-DD format"
            });
        }

        const parsed = new Date(date + "T00:00:00Z");

        if (
            Number.isNaN(parsed.getTime()) ||
            parsed.toISOString().slice(0, 10) !== date
        ) {
            return res.status(400).json({
                error: "Invalid calendar date"
            });
        }

        const records = db.prepare(`
            SELECT *
            FROM lockers l
            WHERE NOT EXISTS (
                SELECT 1
                FROM allotments a
                WHERE a.locker_id = l.id
                AND date(?) BETWEEN
                    date(a.start_date) AND date(a.end_date)
            )
        `).all(date);

        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// ================= EXPORT FUNCTIONS =================

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
    getAllotmentsWithNames,
    searchLockers,
    availableLockers
};
