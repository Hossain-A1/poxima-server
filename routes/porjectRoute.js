const express = require("express");

const {
  postProject,
  getAllProjects,
  getSingleProject,
  deleteProject,
  updateProject,
} = require("../controllers/projectController");


const requireAuth = require("../middleware/requireAuth");

// router
const router = express.Router();
router.use(requireAuth)
// get all project
router.get("/", getAllProjects);

//  get a single project

router.get("/:id", getSingleProject);

// post a new project
router.post("/", postProject);
// delete a projet
router.delete("/:id", deleteProject);

// update a project
router.patch("/:id", updateProject);

module.exports = router;
