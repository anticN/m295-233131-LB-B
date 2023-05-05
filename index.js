import express, { response } from "express";
import bodyParser from "body-parser";
import session from "express-session";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// Dieser Code wurde von den Lernfolien kopiert
app.use(session({
    secret: "ultrasecret",
    resave: false,
    saveUninitialized: false,
    cookie: {}
}))

// Testdaten wurden mit ChatGPT generiert.
let tasks = [{
    id: "1",
    title: "Complete project proposal",
    creation_date: "2023-04-12",
    completion_date: "2023-04-22",
    author: "test@mail.com"
  },
  {
    id: "2",
    title: "Research new marketing strategies",
    creation_date: "2023-04-15",
    completion_date: null,
    author: "test@mail.com"
  },
  {
    id: "3",
    title: "Prepare presentation for team meeting",
    creation_date: "2023-04-20",
    completion_date: "2023-04-23",
    author: "test@gmail.com"
  },
  {
    id: "4",
    title: "Attend networking event",
    creation_date: "2023-04-28",
    completion_date: null,
    author: "test@gmail.com"
  },
  {
    id: "5",
    title: "Revise employee handbook",
    creation_date: "2023-05-01",
    completion_date: "2023-05-05",
    author: "test@ksh.ch"
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

// Dieser Code wurde von Lambotharan Logendran inspiriert
app.use("/tasks", (req, res, process) => {
    if(req.session.email == null) {
        res.status(403).json({error: "Not logged in! Log in to use /tasks!"})
    }else{
        process()
    }
})

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
        completion_date: null,
        author: req.session.email
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
            completion_date: taskByID(req.params.id).completion_date,
            author: req.session.email
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


// login Endpunkte
const loginPassword = {password: "m295"}

app.post("/login", (req, res) => {
    const {email, password} = req.body

    if(password === loginPassword.password){  //Dieser Code zum überprüfen des Passworts wurde von den Schulfolien inspiriert.
        req.session.email = email

        return res.status(200).json({response: "You logged in as", email: req.session.email})
    }else{
        return res.status(401).json({error: "Incorrect password"})
    }
})

app.get("/verify", (req, res) => {
    //Dieser Code wurde von den Schulfolien inspiriert
    if(req.session.email != null) {
        return res.status(200).json({message: "Logged in as", email: req.session.email})
    }else{
        return res.status(401).json({error: "Not logged in!"})
    }
})

app.delete("/logout", (req, res) => {
    //Dieser Code wurde von den Schulfolien inspiriert
    if(req.session.email != null) {
        req.session.email = undefined
        return res.sendStatus(204)
    }else{
        return res.status(401).json({error: "Not logged in!"})
    }
})

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});