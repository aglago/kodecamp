import express from "express";
import { v4 as uuid } from "uuid";

const app = express();

let tasks = [];

app.use(express.json());

// A get endpoint to get the home route
app.get("/", (req, res) => {
  res.send("this is the home route");
});

// A get endpoint to get a list of all tasks.
app.get("/tasks", (req, res) => {
  res.send(tasks);
});

// A post endpoint to add a new task.
app.post("/tasks", (req, res) => {
  const id = uuid();

  tasks.push({
    id,
    title: req.body.title,
    body: req.body.body,
    status: req.body.status,
  });

  res.send("Task added successfully");
});

// A get endpoint to get a task by it's ID
app.get("/tasks/:id", (req, res) => {
  const taskId = req.params.id;

  const task = tasks.find((task) => task.id == taskId);
  res.send(task);
});

// A put endpoint to change the title and body of a task
app.put("/tasks/:id", (req, res) => {
  const taskId = req.params.id;
  const task = tasks.find((task) => task.id == taskId);
  const { newTitle, newBody } = req.body;

  task.title = newTitle;
  task.body = newBody;

  res.send("Task updated successfully");
});

// A patch endpoint to change the status of a task
app.patch("/tasks/:id", (req, res) => {
  const taskId = req.params.id;
  const task = tasks.find((task) => task.id == taskId);
  const { newStatus } = req.body;

  task.status = newStatus;
  res.send("Task patched successfully");
});

// A delete endpoint to remove a task from the array of tasks.
app.delete("/tasks/:id", (req, res) => {
  const taskId = req.params.id;

  tasks = tasks.filter((task) => task.id !== taskId);
  res.send("Task deleted successfully");
});

// server to listen for request
app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
