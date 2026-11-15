
const express = require("express");
const router = express.Router();

const controller = require("../controllers/gymController");
const { validateBody, validateDates } =
    require("../middleware/validation");

// ================= MEMBERS ROUTES =================

router.get("/members", controller.getAll("members"));
router.get("/members/:id", controller.getById("members"));

router.post("/members",
    validateBody(["name", "email"]),
    controller.create("members", ["name", "email", "phone"])
);

router.put("/members/:id",
    validateBody(["name", "email"]),
    controller.update("members", ["name", "email", "phone"])
);

router.delete("/members/:id", controller.remove("members"));


// ================= LOCKERS ROUTES =================

// Special routes BEFORE /:id
router.get("/lockers/available", controller.availableLockers);
router.get("/lockers/search", controller.searchLockers);

router.get("/lockers", controller.getAll("lockers"));
router.get("/lockers/:id", controller.getById("lockers"));

router.post("/lockers",
    validateBody(["name", "floor"]),
    controller.create("lockers", ["name", "floor", "status"])
);

router.put("/lockers/:id",
    validateBody(["name", "floor", "status"]),
    controller.update("lockers", ["name", "floor", "status"])
);

router.delete("/lockers/:id", controller.remove("lockers"));


// ================= ALLOTMENTS ROUTES =================

// JOIN before /:id
router.get("/allotments/join", controller.getAllotmentsWithNames);

router.get("/allotments", controller.getAll("allotments"));
router.get("/allotments/:id", controller.getById("allotments"));

router.post("/allotments",
    validateBody(["member_id", "locker_id", "start_date", "end_date"]),
    validateDates,
    controller.create("allotments", [
        "member_id", "locker_id", "start_date", "end_date"
    ])
);

router.put("/allotments/:id",
    validateBody(["member_id", "locker_id", "start_date", "end_date"]),
    validateDates,
    controller.update("allotments", [
        "member_id", "locker_id", "start_date", "end_date"
    ])
);

router.delete("/allotments/:id", controller.remove("allotments"));

module.exports = router;
