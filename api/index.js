import express from 'express';
import serverless from 'serverless-http';
import cors from 'cors';
import { fetchTasks, createTask, updateTask, deleteTask } from './task.js';

const app = express();
const port = 3001;

app.use(express.json());

if(process.env.DEVELOPMENT) {
    app.use(cors);
}

app.get('/', (req,res) => {
    res.send('hello world');
})

app.get('/task', async (req, res) => {
    try {
        const tasks = await fetchTasks();
        res.send(tasks.Items);
    } catch (error) {
        res.status(400).send(`Error fetching tasks: ${error}`);
    }
})

app.post('/task', async (req, res) => {
    try {
        const task = req.body;
        const response = await createTask(task);
    } catch (error) {
        res.status(400).send(`Error creating task: ${error}`);
    }
})

app.put('/task', async (req, res) => {
    try {
       const task = req.body;
       const response = await updateTask(task); 
    } catch (error) {
        res.status(400).send(`Error updating task: ${error}`);
    }
})

app.delete('/task/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const response = await deleteTask(id);
    } catch (error) {
        res.status(400).send(`Error deleting task: ${error}`);
    }
})

if(process.env.DEVELOPMENT) {
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}
export const handler = serverless(app);