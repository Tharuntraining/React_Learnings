import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent, CardActions, IconButton, Box, Slider, LinearProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EditTaskPopup from '../modal-popups/editTaskPopup';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

interface TaskCardProps {
    taskObject: {
        taskName: string;
        description: string;
        taskStatus: number;
    };
    index: number;
    deleteTask: any;
    updateTaskList: any;
}

const getRandomLightColor = () => {
    const letters = 'ABCDEF';
    let color = '#';
    const excludedColors = ['#FFFFFF', '#000000'];
    let isExcluded;
    do {
        isExcluded = false;
        for (let i = 0; i < 3; i++) {
            color += letters[Math.floor(Math.random() * letters.length)];
        }

        if (excludedColors.includes(color)) {
            isExcluded = true;
        }
    } while (isExcluded);
    return color;
};
const TaskCard: React.FC<TaskCardProps> = ({ taskObject, index, deleteTask, updateTaskList }) => {
    const [isEditHovered, setIsEditHovered] = React.useState(false);
    const [isDeleteHovered, setIsDeleteHovered] = React.useState(false);
    const [headerColor, setHeaderColor] = React.useState<string>(getRandomLightColor());
    const [modal, setModal] = React.useState(false);
    const toggle = () => setModal(!modal);

    const updateTask = (obj: any) => {
        updateTaskList(obj, index);
    };

    const handleDelete = () => {
        deleteTask(index);
    };

    // const handleSliderChange = (event: React.ChangeEvent<{}>, newValue: number | number[]) => {
    //     if (typeof newValue === 'number') {
    //         setTaskStatus(newValue);
    //     }
    // };

    return (

        <Card className="task-card">
            <p className="card-header" style={{ backgroundColor: headerColor, margin: '10px', borderRadius: '10px', textAlign: 'center' }}>
                {taskObject.taskName}
            </p>
            <CardContent className="card-body">
                <p className="card-text " style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'normal' }}>
                    <span title={taskObject.description}>{taskObject.description}</span>
                </p>
            </CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ width: '100%' }}>
                    {/* <Slider value={taskObject.taskStatus} aria-labelledby="continuous-slider" />
                     */}
                    <LinearProgress variant="determinate" value={taskObject.taskStatus} sx={{ width: '80%' }} />
                    <Typography className='task-status' variant="caption" component="div" color="textSecondary">
                        {`${Math.round(taskObject.taskStatus)}%`}
                    </Typography>
                </Box>

                <CardActions disableSpacing>
                    <IconButton onMouseEnter={() => setIsEditHovered(true)} onMouseLeave={() => setIsEditHovered(false)} color={isEditHovered ? 'primary' : 'default'}>
                        <EditIcon onClick={() => setModal(true)} />
                    </IconButton>
                    <IconButton onMouseEnter={() => setIsDeleteHovered(true)} onMouseLeave={() => setIsDeleteHovered(false)} color={isDeleteHovered ? 'error' : 'default'}>
                        <DeleteIcon onClick={handleDelete} />
                    </IconButton>
                </CardActions>
            </Box>
            <EditTaskPopup modal={modal} toggle={toggle} updateTask={updateTask} taskObject={taskObject} />
        </Card>
    );
};

export default TaskCard;