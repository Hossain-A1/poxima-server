const mongoose = require("mongoose");
const ProjectModel = require("../models/porjectModel");

// get all projects
const getAllProjects = async (req, res) => {
  const user_id = req.user._id;

  const projects = await ProjectModel.find({ user_id }).sort({ createdAt: -1 }); // descending, newly added project on top

  res.status(200).json(projects);
};

// get a single project
const getSingleProject = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid id" });
  }

  const project = await ProjectModel.findById(id);

  if (!project) {
    return res.status(404).json({ error: "No project found" });
  }

  res.status(200).json(project);
};

// post a new project
const postProject = async (req, res) => {
  const { title, tech, budget, duration, manager, dev } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }

  if (!tech) {
    emptyFields.push("tech");
  }

  if (!budget) {
    emptyFields.push("budget");
  }

  if (!duration) {
    emptyFields.push("duration");
  }

  if (!manager) {
    emptyFields.push("manager");
  }

  if (!dev) {
    emptyFields.push("dev");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields });
  }

  try {
    const user_id = req.user._id;
    const project = await ProjectModel.create({
      ...req.body,
      user_id,
    });

    res.status(200).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// delete a project
const deleteProject = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid id" });
  }

  const project = await ProjectModel.findOneAndDelete({ _id: id });

  if (!project) {
    return res.status(400).json({ error: "No project found" });
  }

  res.status(200).json(project);
};

// update a project
const updateProject = async (req, res) => {
  const { id } = req.params;

  const { title, tech, budget, duration, manager, dev } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }

  if (!tech) {
    emptyFields.push("tech");
  }

  if (!budget) {
    emptyFields.push("budget");
  }

  if (!duration) {
    emptyFields.push("duration");
  }

  if (!manager) {
    emptyFields.push("manager");
  }

  if (!dev) {
    emptyFields.push("dev");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid id" });
  }

  const project = await ProjectModel.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true }
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
