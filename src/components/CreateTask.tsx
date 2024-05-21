import { Box, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Button } from 'reactstrap';
interface TaskObject {
    taskName: string;
    description: string;
    taskStatus: number;
}
const CreateTask = () => {
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [taskStatus, setTaskStatus] = useState(0);
    const [taskList, setTaskList] = useState<TaskObject[]>([]);
    useEffect(() => {
        let arr = localStorage.getItem("taskList");
        if (arr) {
            let obj = JSON.parse(arr);
            setTaskList(obj)
        }
    }, [])
    const saveTask = (taskObject: TaskObject) => {
        let tempList = taskList;
        taskList.push(taskObject);
        localStorage.setItem("taskList", JSON.stringify(tempList));
        setTaskList(tempList);
    }


    const handleChange = (event: any) => {
        const { name, value } = event.target;
        if (name === 'taskName') {
            setTaskName(value);
        }
        else if (name === 'description') {
            setDescription(value);
        }

    };
    const handleSave = () => {
        let taskObject = { taskName, description, taskStatus };
        taskObject["taskName"] = taskName;
        taskObject["description"] = description;
        taskObject["taskStatus"] = taskStatus;
        saveTask(taskObject);
        setTaskName('');
        setDescription('');
    }
    const handleReset = () => {
        setTaskName('');
        setDescription('');

    }

    return (

        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, },
                // display: 'flex',
                justifyContent: 'flex-end',
            }}
            noValidate
            autoComplete="off"
        >
            <TextField label="Task Name" color="secondary" focused value={taskName} onChange={handleChange} name='taskName' />
            <TextField label="Description" color="secondary" focused rows={3} value={description} onChange={handleChange} name='description' />

            <Button color="secondary" onClick={handleReset}>
                Reset
            </Button>
            <Button color="primary" onClick={handleSave}>
                Save
            </Button>
        </Box>
    );
};

export default CreateTask;