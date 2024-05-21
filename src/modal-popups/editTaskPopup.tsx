import { Box, Slider, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

interface EditTaskPopupProps {
    modal: any;
    toggle: any;
    updateTask: any;
    taskObject: any;
}

const EditTaskPopup: React.FC<EditTaskPopupProps> = ({ modal, toggle, updateTask, taskObject }) => {
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [taskStatus, setTaskStatus] = useState<number>(0); // Change to number

    const handleChange = (event: React.ChangeEvent<any>) => {
        const { name, value } = event.target;
        if (name === 'taskName') {
            setTaskName(value);
        } else if (name === 'description') {
            setDescription(value);
        }
    };
    const handleSliderChange = (event: Event, value: number | number[]) => {
        if (typeof value === 'number') {
            setTaskStatus(value);
        }
    };

    const handleUpdate = () => {
        const updatedTaskObject = { ...taskObject, taskName, description, taskStatus };
        updateTask(updatedTaskObject);
    };

    useEffect(() => {
        setTaskName(taskObject.taskName);
        setDescription(taskObject.description);
        setTaskStatus(taskObject.taskStatus);
    }, [taskObject]);

    return (
        <Modal isOpen={modal} toggle={toggle} centered>
            <ModalHeader toggle={toggle}>Edit Task</ModalHeader>
            <ModalBody>
                <form>
                    <div className="form-group">
                        <label>Task Name</label>
                        <input type="text" className="form-control" placeholder="Enter Task Name" value={taskName} onChange={handleChange} name="taskName" />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea className="form-control" id="description" rows={3} value={description} onChange={handleChange} name="description" />
                    </div>
                    <Box sx={{ m: 3 }} />
                    <Typography gutterBottom>Task Status</Typography>
                    <Slider valueLabelDisplay="auto" aria-label="task-status-slider" value={taskStatus} onChange={handleSliderChange} name="taskStatus" />
                </form>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={toggle}>
                    Cancel
                </Button>
                <Button color="primary" onClick={handleUpdate}>
                    Update
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default EditTaskPopup;
