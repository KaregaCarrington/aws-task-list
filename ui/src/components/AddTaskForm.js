import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import axios from "axios";
import { API_URL } from "../utils";

export const AddTaskForm = ({fetchTasks}) => {
    const [newTask, setNewTask] = useState('');
    
    const addNewTask = async () => {
        try {
            await axios.post(API_URL, {
                name: newTask,
                completed: false
            })

            await fetchTasks();

            setNewTask('');
            
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <div>
            <Typography variant="h2" align="center" paddingTop={2} paddingBottom={2} >My Task List</Typography>
            <div className="addTaskForm">
                <TextField label="Task" variant="outlined" size="small" value={newTask} onChange={(e) => setNewTask(e.target.value)}></TextField>
                <Button variant="outlined" disabled={!newTask.length} onClick={addNewTask}><AddIcon /></Button>
            </div>
        </div>
        
    )
}