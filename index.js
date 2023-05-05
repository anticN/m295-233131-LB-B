import express from "express";

const app = express();
const port = 3000;

// Testdaten wurden mit ChatGPT generiert.
let tasks = [{
    id: "1",
    title: "Complete project proposal",
    creation_date: "2023-04-12",
    completion_date: "2023-04-22"
  },
  {
    id: "2",
    title: "Research new marketing strategies",
    creation_date: "2023-04-15",
    completion_date: null
  },
  {
    id: "3",
    title: "Prepare presentation for team meeting",
    creation_date: "2023-04-20",
    completion_date: "2023-04-23"
  },
  {
    id: "4",
    title: "Attend networking event",
    creation_date: "2023-04-28",
    completion_date: null
  },
  {
    id: "5",
    title: "Revise employee handbook",
    creation_date: "2023-05-01",
    completion_date: "2023-05-05"
  }]

app.get("/", (req, res) => {
    res.send("Here is the root")
});

app.get("/tasks", (req, res) => {
    res.json(tasks);
})

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});