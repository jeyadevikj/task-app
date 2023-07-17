const taskRouter = require("express").Router();
const Task = require("../models/TaskModel");


taskRouter.post("/tasks", async (req, res) => {
  const task = new Task(req.body);
  try {
    const insertedTask = await task.save();

    return res
      .status(201)
      .send({ message: "Inserted successfully", task: insertedTask });
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
});

taskRouter.get("/tasks", async (req, res) => {
  try {
    const allTasks = await Task.find({});

    return res.status(200).json(allTasks);
  } catch (error) {
    console.error(error.message);
    return res.status(404).json({ message: error.message });
  }
});

taskRouter.get("/tasks/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const tasks = await Task.findById(id);

    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

taskRouter.patch("/tasks/:id", async (req, res) => {
  const id = req.params.id;
  const updates = req.body;
  const updatesPassed = Object.keys(updates);
  const allowedUpdates = ["description", "completed", "email"];
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
    const task = await Task.findById(id);

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

taskRouter.delete("/tasks/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deletedUser = await Task.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).send({ message: "No user found" });
    }

    return res.status(200).json(deletedUser);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

module.exports = taskRouter;
