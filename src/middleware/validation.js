


// Check required fields
function validateBody(requiredFields) {
    return (req, res, next) => {
        const missingFields = requiredFields.filter(
            field =>
                req.body[field] === undefined ||
                req.body[field] === null ||
                req.body[field] === ""
        );

        if (missingFields.length > 0) {
            return res.status(400).json({
                error: "Missing required fields",
                fields: missingFields
            });
        }

        next();
    };
}

// Validate allotment dates
function validateDates(req, res, next) {
    const { start_date, end_date } = req.body;

    if (!start_date || !end_date) {
        return res.status(400).json({
            error: "Start date and end date are required"
        });
    }

    const datePattern = /^\d{4}-\d{2}-\d{2}$/;

    if (!datePattern.test(start_date) ||
        !datePattern.test(end_date)) {
        return res.status(400).json({
            error: "Dates must use YYYY-MM-DD format"
        });
    }

    const start = new Date(start_date);
    const end = new Date(end_date);

    if (
        isNaN(start.getTime()) ||
        isNaN(end.getTime()) ||
        start.toISOString().slice(0, 10) !== start_date ||
        end.toISOString().slice(0, 10) !== end_date
    ) {
        return res.status(400).json({
            error: "Invalid calendar date"
        });
    }

    if (end < start) {
        return res.status(400).json({
            error: "End date cannot be before start date"
        });
    }

    next();
}

module.exports = {
    validateBody,
    validateDates
};
