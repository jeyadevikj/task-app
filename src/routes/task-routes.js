const taskRouter = require("express").Router();
const Task = require("../models/TaskModel");
const auth = require('../middleware/auth')


taskRouter.post("/tasks", auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id
  });

  try {
    const insertedTask = await task.save();

    return res
      .status(201)
      .send({ message: "Inserted successfully", task: insertedTask });
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
});

taskRouter.get("/tasks", auth, async (req, res) => {
  try {
    // const allTasks = await Task.find({owner: req.user._id});
    await req.user.populate('tasks')
    if(!req.user.tasks) {
      throw new Error('No tasks found for user')
    }
    return res.status(200).json(req.user.tasks);
  } catch (error) {
    // console.error(error.message);
    return res.status(404).json({ message: error.message });
  }
});

taskRouter.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findOne({ _id, owner: req.user._id })
    if (!task) {
      throw new Error('Passed wrong id or user may not have the task')
    }
    return res.status(200).json(task);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

taskRouter.patch("/tasks/:id", auth ,async (req, res) => {
  const _id = req.params.id;


  const updates = req.body;
  const updatesPassed = Object.keys(updates);
  const allowedUpdates = ["title", "description", "completed", "hasPriority", "colName"];
  const isUpdateValid = updatesPassed.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isUpdateValid) {
    return res.status(400).send({ message: "Invalid update of document" });
  }

  try {
    // const updatedDocument = await Task.findByIdAndUpdate(
    //     id,
    //     update,
    //     { new: true, runValidators: true }
    // )
    const task = await Task.findOne({_id, owner: req.user._id});

    if (!task) {
      return res.status(404).send({ message: "Document not found" });
    }
    updatesPassed.forEach((update) => (task[update] = updates[update]));
    const updatedTask = await task.save();
    if (!updatedTask) {
      return res.status(400).send({ message: "Could not update document" });
    }
    return res.status(200).json(updatedTask);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

taskRouter.delete("/tasks/:id", auth ,async (req, res) => {
  const _id = req.params.id;
  try {
    const deletedUser = await Task.findOneAndDelete({_id, owner: req.user._id});

    if (!deletedUser) {
      return res.status(404).send({ message: "No user found" });
    }

    return res.status(200).json(deletedUser);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

module.exports = taskRouter;
