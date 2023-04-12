const mongoose = require("mongoose");
const Project = require("../models/porjectModel");
// get all projects
const getAllProjects = async (req, res) => {
  const projects = await Project.find({}).sort({createdAt: -1});//descending

  res.status(200).json(projects);
};

// GET a single project

const getSingleProject = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid id" });
  }

  const project = await Project.findById(id);

  if (!project) {
    return res.status(404).json({ error: "No project found" });
  }
  res.status(200).json(project);
};

// post a new project
const postProject = async (req, res) => {
  const data = req.body;
  try {
    const project = await Project.create({
      ...data,
    });
    res.status(200).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
  res.json({ message: "post a new project" });
};
// Delete a project
const deleteProject = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid id" });
  }

  const project = await Project.findOneAndDelete({
    _id: id,
  });
  if (!project) {
    return res.status(400).json({ error: "No project found" });
  }
  res.status(200).json(project);
};
// Update a project
const updateProject = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid id" });
  }

  const project = await Project.findOneAndUpdate(
    {
      _id: id,
    },
    { ...red.body }
  );
  if (!project) {
    return res.status(400).json({ error: "No project found" });
  }
  res.status(200).json(project);
};

module.exports = {
  postProject,
  getAllProjects,
  getSingleProject,
  deleteProject,
  updateProject,
};
