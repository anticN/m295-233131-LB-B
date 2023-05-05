import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

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


//folgende 4 Funktionen wurde von meinen Unterlagen aus dem Modul 295 inspiriert und angepasst.
function taskByID(id) {
    return tasks.find((task) => task.id === id);
}

function newTask(task) {
    tasks = [...tasks, task];
}

function updateTask(task) {
    tasks = tasks.map((t) => t.id === task.id ? task : t)
}

function deleteTask(id) {
    tasks = tasks.filter((t) => t.id !== id);
}


// Endpunkte der API
app.get("/", (req, res) => {
    res.send("Here is the root")
});

app.get("/tasks", (req, res) => {
    res.send(tasks);
})

app.get("/tasks/:id", (req, res) => {
    if(taskByID(req.params.id) == null) {
        res.sendStatus(404);
    }else {
        res.send(taskByID(req.params.id))
    }
});

app.post("/tasks", bodyParser.json(), (req, res) => {
    const taskToInsert = {
        id: req.body.id,
        title: req.body.title,
        creation_date: new Date().toISOString().split('T')[0], // .split() wurde von https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd übernommen.
        completion_date: null
    }
    newTask(taskToInsert);
    res.status(201).send(taskToInsert);
})

app.put("/tasks/:id", (req, res) => {
    if(taskByID(req.params.id) != null) {
        const taskToUpdate = {
            id: req.params.id,
            title: req.body.title,
            creation_date: taskByID(req.params.id).creation_date,
            completion_date: taskByID(req.params.id).completion_date
        }
        updateTask(taskToUpdate);
        res.status(200).send(taskByID(req.params.id))
    }else {
        res.status(404).send("Id " + req.params.id + " not found");
    }
})

app.delete("/tasks/:id", (req, res) => {
    if(taskByID(req.params.id) != null) {
        const task = taskByID(req.params.id)
        deleteTask(req.params.id)
        res.send(task)
    }else{
        res.status(404).send("Id " + req.params.id + " not found.")
    }
})

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});