const router = require("express").Router();
const projectController = require("../controllers/projectController");
const projectAnalytics = require("../middlewares/projectAnalytics");
router.get("/projects", projectController.allProjects);
router.get("/projects/:id", projectAnalytics, projectController.getProject);

module.exports = router;
