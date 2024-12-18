import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AddTaskForm } from './components/AddTaskForm';
import { Task } from './components/Task';
import axios from 'axios';
import { API_URL } from './utils';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function App() {
  // this useState is to keep track of the tasks we are going to fetch from the api
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {

      // we have to pass in the api route for the homepage as a parameter in our axios.get() call, which will be the value of 'data'
      const { data } = await axios.get(API_URL);
      
      setTasks(data);

    } catch (error) {

      console.log(error);

    }
  }

  useEffect(() => {
    fetchTasks();
  }, []);
  // map thru tasks, call each task a task of type Task object and pass the correct amount of parameters and map the key to id.
  // also call fetchTasks function 
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AddTaskForm fetchTasks={fetchTasks}/>
      {tasks.map((task) => <Task task={task} key={task.id} fetchTasks={fetchTasks}/>)}
    </ThemeProvider>
  );
}
